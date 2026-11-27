import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(import.meta.url)
const rootDir = path.resolve(path.dirname(scriptPath), '..')
const wranglerPath = path.join(rootDir, 'wrangler.toml')
const siteUrl = (process.env.DOCS_SITE_URL || 'http://127.0.0.1:8787').replace(/\/+$/, '')
const allowedNextPrefixes = ['/entismax/v4/', '/entismax/v5/', '/entislng/v4/', '/entislng/v5/']

function fail(message) {
  console.error(`[auth-token] ${message}`)
  process.exit(1)
}

function usage() {
  console.log(`用法：
  node scripts/auth-token.mjs ticket <sub> [--typ user|batch] [--ttl 600] [--next <path>] [--local|--remote]
  node scripts/auth-token.mjs qr:create <label> [--batch <id>] [--next <path>] [--local|--remote]
  node scripts/auth-token.mjs qr:revoke <token|hash> [--local|--remote]
  node scripts/auth-token.mjs qr:list [--local|--remote]`)
}

function parseArgs(argv) {
  const positional = []
  const flags = { mode: 'local' }

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--local' || arg === '--remote') {
      flags.mode = arg.slice(2)
      continue
    }
    if (arg.startsWith('--')) {
      const key = arg.slice(2)
      const value = argv[index + 1]
      if (value === undefined || value.startsWith('--')) {
        flags[key] = true
      } else {
        flags[key] = value
        index += 1
      }
      continue
    }
    positional.push(arg)
  }

  return { positional, flags }
}

function sanitizeNext(raw) {
  if (typeof raw !== 'string' || !raw || raw === '/') return '/'

  const msysMatch = raw.match(/(entismax|entislng)[\\/]+v([45])(?:[\\/]|$)/i)
  if (msysMatch && !allowedNextPrefixes.some((prefix) => raw.startsWith(prefix))) {
    return `/${msysMatch[1].toLowerCase()}/v${msysMatch[2]}/`
  }

  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '/'

  let decoded
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    return '/'
  }

  if (decoded.includes('..') || /[\u0000-\u001F]/.test(decoded)) return '/'
  if (decoded !== '/' && !allowedNextPrefixes.some((prefix) => decoded.startsWith(prefix))) return '/'

  const pathname = decoded.split(/[?#]/, 1)[0]
  return pathname || '/'
}

function getKvId() {
  if (process.env.AUTH_STATE_KV_ID) return process.env.AUTH_STATE_KV_ID
  if (!fs.existsSync(wranglerPath)) fail(`找不到 ${wranglerPath}`)

  const source = fs.readFileSync(wranglerPath, 'utf8')
  const match = source.match(
    /\[\[kv_namespaces\]\][\s\S]*?binding\s*=\s*"AUTH_STATE"[\s\S]*?id\s*=\s*"([^"]+)"/
  )
  if (!match) fail('无法从 wrangler.toml 读取 AUTH_STATE 的 KV id，请设置 AUTH_STATE_KV_ID 环境变量。')
  return match[1]
}

function requireTicketSecret() {
  const secret = process.env.TICKET_SECRET
  if (!secret) fail('缺少 TICKET_SECRET 环境变量。')
  return secret
}

function runWrangler(args) {
  const command = process.platform === 'win32' ? 'cmd' : 'npx'
  const prefix = process.platform === 'win32' ? ['/c', 'npx'] : []
  const result = spawnSync(command, [...prefix, 'wrangler', ...args], {
    cwd: rootDir,
    stdio: 'inherit'
  })
  if (result.error) fail(`执行 Wrangler 失败：${result.error.message}`)
  if (result.status !== 0) process.exit(result.status || 1)
}

function remoteFlag(flags) {
  return flags.mode === 'remote' ? ['--remote'] : []
}

function kvPut(key, value, flags) {
  runWrangler([
    'kv',
    'key',
    'put',
    '--namespace-id',
    getKvId(),
    key,
    value,
    ...remoteFlag(flags)
  ])
}

function kvDelete(key, flags) {
  runWrangler([
    'kv',
    'key',
    'delete',
    '--namespace-id',
    getKvId(),
    key,
    ...remoteFlag(flags)
  ])
}

function kvList(flags) {
  runWrangler([
    'kv',
    'key',
    'list',
    '--namespace-id',
    getKvId(),
    '--prefix',
    'grant:q:',
    ...remoteFlag(flags)
  ])
}

function createTicket(sub, type, ttl, secret) {
  const issuedAt = Math.floor(Date.now() / 1000)
  const payload = {
    v: 1,
    iss: 'external-system',
    aud: 'entis-help',
    sub,
    typ: type,
    iat: issuedAt,
    exp: issuedAt + ttl,
    jti: crypto.randomUUID()
  }
  const payloadPart = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
  const signature = crypto.createHmac('sha256', secret).update(`v1.${payloadPart}`).digest('base64url')
  return `v1.${payloadPart}.${signature}`
}

function createTicketCommand(positional, flags) {
  const sub = positional[1]
  if (!sub) fail('ticket 命令缺少 <sub>。')

  const type = flags.typ || 'user'
  if (type !== 'user' && type !== 'batch') fail('--typ 只能是 user 或 batch。')

  const ttl = Number.parseInt(flags.ttl ?? '120', 10)
  if (!Number.isFinite(ttl) || ttl < 1 || ttl > 600) fail('--ttl 必须是 1 到 600 之间的整数。')

  const next = sanitizeNext(flags.next)
  const ticket = createTicket(sub, type, ttl, requireTicketSecret())
  const url = `${siteUrl}/auto-login?ticket=${encodeURIComponent(ticket)}&next=${encodeURIComponent(next)}`

  console.log('[auth-token] ticket 已生成：')
  console.log(ticket)
  console.log('[auth-token] 测试链接：')
  console.log(url)
  console.log(`[auth-token] 有效期：${ttl} 秒；类型：${type}；一次性使用。`)
}

function createQrCommand(positional, flags) {
  const label = positional[1]
  if (!label) fail('qr:create 命令缺少 <label>。')

  const token = crypto.randomBytes(32).toString('base64url')
  const tokenHash = crypto.createHash('sha256').update(token, 'utf8').digest('hex')
  const batch = flags.batch || `batch-${Date.now()}`
  const next = sanitizeNext(flags.next)
  const record = {
    v: 1,
    kind: 'qr-batch',
    batch,
    label,
    enabled: true,
    createdAt: new Date().toISOString(),
    lastUsedAt: null
  }

  kvPut(`grant:q:${tokenHash}`, JSON.stringify(record), flags)

  const url = `${siteUrl}/qr-login?k=${encodeURIComponent(token)}&next=${encodeURIComponent(next)}`
  console.log('[auth-token] 二维码批次 token 已写入 KV：')
  console.log(`[auth-token] batch: ${batch}`)
  console.log(`[auth-token] label: ${label}`)
  console.log(`[auth-token] hash: ${tokenHash}`)
  console.log('[auth-token] 二维码链接：')
  console.log(url)
  console.log(`[auth-token] KV 模式：${flags.mode}。长期有效，撤销命令：npm run auth:qr:revoke -- ${token}${flags.mode === 'remote' ? ' --remote' : ''}`)
}

function revokeQrCommand(positional, flags) {
  const input = positional[1]
  if (!input) fail('qr:revoke 命令缺少 <token|hash>。')

  let tokenHash
  if (/^[A-Za-z0-9_-]{43}$/.test(input)) {
    tokenHash = crypto.createHash('sha256').update(input, 'utf8').digest('hex')
  } else if (/^[0-9a-f]{64}$/i.test(input)) {
    tokenHash = input.toLowerCase()
  } else {
    fail('参数必须是二维码 token 或 64 位 sha256 哈希。')
  }

  kvDelete(`grant:q:${tokenHash}`, flags)
  console.log(`[auth-token] 已撤销批次 token：${tokenHash}`)
}

function listQrCommand(flags) {
  kvList(flags)
}

const { positional, flags } = parseArgs(process.argv.slice(2))
const command = positional[0]

if (!command || command === '--help' || command === '-h') {
  usage()
  process.exit(0)
}

if (command === 'ticket') {
  createTicketCommand(positional, flags)
} else if (command === 'qr:create') {
  createQrCommand(positional, flags)
} else if (command === 'qr:revoke') {
  revokeQrCommand(positional, flags)
} else if (command === 'qr:list') {
  listQrCommand(flags)
} else {
  fail(`未知命令：${command}`)
  usage()
}

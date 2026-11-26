import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = path.join(rootDir, 'docs')
const distDir = path.join(docsDir, '.vitepress', 'dist')
const vitepressBin = path.join(rootDir, 'node_modules', 'vitepress', 'bin', 'vitepress.js')
const portalScript = path.join(rootDir, 'scripts', 'portal.mjs')
const publicPort = Number.parseInt(process.env.DOCS_DEV_PORT ?? '5173', 10)
const skipInitialBuild = process.env.DOCS_DEV_SKIP_BUILD === '1'

const targets = [
  {
    key: 'max4',
    product: 'max',
    versionCode: '4',
    productName: 'EntisMax',
    versionLabel: '4',
    base: '/entismax/v4/'
  },
  {
    key: 'max5',
    product: 'max',
    versionCode: '5',
    productName: 'EntisMax',
    versionLabel: '5',
    base: '/entismax/v5/'
  },
  {
    key: 'lng4',
    product: 'lng',
    versionCode: '4',
    productName: 'EntisLNG',
    versionLabel: '4',
    base: '/entislng/v4/'
  },
  {
    key: 'lng5',
    product: 'lng',
    versionCode: '5',
    productName: 'EntisLNG',
    versionLabel: '5',
    base: '/entislng/v5/'
  }
]

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
}

let building = false
let rebuildTimer = null
let closing = false

function runCommand(script, env, label) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script, ...env.args], {
      cwd: rootDir,
      env: {
        ...process.env,
        ...env.vars
      },
      stdio: ['ignore', 'pipe', 'pipe']
    })

    let stderr = ''
    child.stdout.resume()
    child.stderr.setEncoding('utf-8')
    child.stderr.on('data', (chunk) => {
      stderr += chunk
    })
    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        const detail = stderr.trim()
        reject(new Error(`${label} 构建失败（code ${code}）${detail ? `\n${detail}` : ''}`))
      }
    })
  })
}

async function buildAll() {
  if (building) return
  building = true
  console.log('[dev] 正在构建四个目标站点和根入口页...')

  try {
    for (const target of targets) {
      await runCommand(
        vitepressBin,
        {
          args: ['build', 'docs'],
          vars: {
            DOCS_PRODUCT: target.product,
            DOCS_VERSION: target.versionCode
          }
        },
        `${target.productName} ${target.versionLabel}`
      )
    }

    await runCommand(portalScript, { args: [], vars: {} }, '根入口页')
    console.log('[dev] 构建完成。')
  } catch (error) {
    console.error(`[dev] ${error.message}`)
    throw error
  } finally {
    building = false
  }
}

function scheduleRebuild(filename) {
  if (!filename) return
  const source = String(filename)
  if (/(^|[\\/])node_modules([\\/]|$)/.test(source)) return
  if (/\.vitepress[\\/](dist|cache)([\\/]|$)/i.test(source)) return
  if (/\.vitepress[\\/]ids\.json$/i.test(source)) return
  if (!/\.(md|mts|ts|css|js|json)$/i.test(source)) return

  clearTimeout(rebuildTimer)
  rebuildTimer = setTimeout(() => {
    buildAll().catch(() => {})
  }, 1000)
}

function resolveRequestPath(rawUrl) {
  let pathname = rawUrl ?? '/'
  try {
    pathname = decodeURIComponent(new URL(rawUrl, 'http://localhost').pathname)
  } catch {
    pathname = decodeURIComponent((rawUrl ?? '/').split('?')[0])
  }

  const resolved = path.resolve(distDir, `.${pathname}`)
  if (resolved !== distDir && !resolved.startsWith(distDir + path.sep)) return null
  return resolved
}

function serveFile(filePath, res) {
  let targetPath = filePath

  try {
    const stat = fs.statSync(targetPath)
    if (stat.isDirectory()) {
      targetPath = path.join(targetPath, 'index.html')
    }
  } catch {
    if (fs.existsSync(`${targetPath}.html`)) {
      targetPath = `${targetPath}.html`
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Not Found')
      return
    }
  }

  try {
    const stat = fs.statSync(targetPath)
    if (!stat.isFile()) throw new Error('Not a file')

    res.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(targetPath).toLowerCase()] ?? 'application/octet-stream',
      'Cache-Control': 'no-store'
    })
    fs.createReadStream(targetPath).pipe(res)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Not Found')
  }
}

const server = http.createServer((req, res) => {
  const resolved = resolveRequestPath(req.url ?? '/')
  if (!resolved) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Forbidden')
    return
  }
  serveFile(resolved, res)
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`[dev] 端口 ${publicPort} 已被占用，可设置 DOCS_DEV_PORT 更换端口。`)
  } else {
    console.error(`[dev] 服务启动失败：${error.message}`)
  }
  process.exit(1)
})

function shutdown() {
  if (closing) return
  closing = true
  console.log('\n[dev] 正在关闭开发服务...')
  clearTimeout(rebuildTimer)
  server.close(() => process.exit(0))
  setTimeout(() => process.exit(0), 2000).unref()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

async function main() {
  if (skipInitialBuild) {
    console.log('[dev] 已设置 DOCS_DEV_SKIP_BUILD=1，使用现有 dist 目录。')
  } else {
    await buildAll()
  }

  fs.watch(docsDir, { recursive: true }, (_event, filename) => {
    scheduleRebuild(filename)
  })

  server.listen(publicPort, () => {
    console.log(`\n[dev] 单站点入口：http://localhost:${publicPort}/`)
    for (const target of targets) {
      console.log(
        `[dev] ${target.productName} ${target.versionLabel}: http://localhost:${publicPort}${target.base}`
      )
    }
    console.log('[dev] 修改 Markdown 或配置后会自动重新构建。')
    console.log('[dev] 按 Ctrl+C 关闭开发服务。\n')
  })
}

main().catch(() => process.exit(1))

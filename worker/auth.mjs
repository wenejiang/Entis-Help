const COOKIE_NAME = 'entis_session'
const TICKET_PREFIX = 'v1.'
const TICKET_ISSUER = 'external-system'
const TICKET_AUDIENCE = 'entis-help'
const TICKET_MAX_AGE_SECONDS = 600
const TICKET_CLOCK_SKEW_SECONDS = 30
const TICKET_REPLAY_TTL_SECONDS = 1200
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60
const MAX_FAILURES = 5
const LOCK_SECONDS = 15 * 60
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const PUBLIC_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.ico',
  '.avif',
  '.bmp',
  '.css',
  '.woff',
  '.woff2',
  '.ttf',
  '.otf'
])

const PUBLIC_FAVICONS = new Set([
  '/favicon.svg',
  '/favicon.ico',
  '/favicon.png'
])

const ALLOWED_NEXT_PREFIXES = [
  '/entismax/v4/',
  '/entismax/v5/',
  '/entislng/v4/',
  '/entislng/v5/'
]

function nowSeconds() {
  return Math.floor(Date.now() / 1000)
}

function bytesToBase64url(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlToBytes(value) {
  if (typeof value !== 'string' || !/^[A-Za-z0-9_-]*$/.test(value)) {
    throw new Error('invalid base64url')
  }
  const remainder = value.length % 4
  const padding = remainder === 0 ? '' : '='.repeat(4 - remainder)
  const binary = atob(value.replace(/-/g, '+').replace(/_/g, '/') + padding)
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

function encodeJson(value) {
  return bytesToBase64url(new TextEncoder().encode(JSON.stringify(value)))
}

function decodeJson(value) {
  return JSON.parse(new TextDecoder().decode(base64urlToBytes(value)))
}

async function importHmacKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

async function signHmac(secret, data) {
  const key = await importHmacKey(secret)
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return bytesToBase64url(new Uint8Array(signature))
}

async function verifyHmac(secret, data, signature) {
  try {
    const key = await importHmacKey(secret)
    return await crypto.subtle.verify('HMAC', key, base64urlToBytes(signature), new TextEncoder().encode(data))
  } catch {
    return false
  }
}

async function sha256Hex(text) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function readCookie(header, name) {
  if (!header) return null
  for (const part of header.split(';')) {
    const separator = part.indexOf('=')
    if (separator === -1) continue
    if (part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim()
    }
  }
  return null
}

function sanitizeNext(raw) {
  if (typeof raw !== 'string' || !raw || raw === '/') return '/'
  if (!raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\')) return '/'

  let decoded
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    return '/'
  }

  if (decoded.includes('..') || /[\u0000-\u001F]/.test(decoded)) return '/'
  if (decoded !== '/' && !ALLOWED_NEXT_PREFIXES.some((prefix) => decoded.startsWith(prefix))) return '/'

  const pathname = decoded.split(/[?#]/, 1)[0]
  return pathname || '/'
}

async function clientIpHash(request) {
  const fromCloudflare = request.headers.get('cf-connecting-ip')
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = fromCloudflare || (forwarded ? forwarded.split(',')[0].trim() : '') || 'unknown'
  return sha256Hex(ip)
}

function securityHeaders(headers = {}) {
  const result = new Headers(headers)
  if (!result.has('Referrer-Policy')) result.set('Referrer-Policy', 'no-referrer')
  return result
}

async function serveAsset(request, env) {
  const response = await env.ASSETS.fetch(request)
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: securityHeaders(response.headers)
  })
}

function deniedResponse(status = 401, message = '未授权访问，请通过有效链接进入。', extraHeaders = {}) {
  const html = `<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>未授权访问</title>
<style>
:root { color-scheme: dark; font-family: "Segoe UI", "Microsoft YaHei", sans-serif; background: #0b1020; color: #e8ecf8; }
body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at 20% 15%, rgba(92,129,255,.22), transparent 35%), #0b1020; }
main { max-width: 520px; padding: 32px; border: 1px solid rgba(255,255,255,.12); border-radius: 18px; background: rgba(255,255,255,.045); }
h1 { margin: 0 0 12px; font-size: 24px; }
p { margin: 0; color: #aeb8d4; line-height: 1.7; }
</style>
</head>
<body><main><h1>访问受限</h1><p>${message}</p></main></body>
</html>`

  const headers = securityHeaders({
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
    ...extraHeaders
  })

  return new Response(html, { status, headers })
}

function redirectResponse(location, extraHeaders = {}) {
  const headers = securityHeaders({
    Location: location,
    'Cache-Control': 'no-store',
    ...extraHeaders
  })
  return new Response(null, { status: 302, headers })
}

async function verifyTicket(ticket, secret) {
  if (typeof ticket !== 'string' || ticket.length > 4096 || !ticket.startsWith(TICKET_PREFIX)) return null

  const parts = ticket.split('.')
  if (parts.length !== 3 || parts[0] !== 'v1') return null

  const signedInput = `${parts[0]}.${parts[1]}`
  if (!(await verifyHmac(secret, signedInput, parts[2]))) return null

  let payload
  try {
    payload = decodeJson(parts[1])
  } catch {
    return null
  }

  if (!payload || typeof payload !== 'object') return null
  if (payload.v !== 1 || payload.iss !== TICKET_ISSUER || payload.aud !== TICKET_AUDIENCE) return null
  if (typeof payload.sub !== 'string' || !payload.sub) return null
  if (payload.typ !== 'user' && payload.typ !== 'batch') return null
  if (!Number.isInteger(payload.iat) || !Number.isInteger(payload.exp)) return null
  if (payload.exp <= payload.iat || payload.exp - payload.iat > TICKET_MAX_AGE_SECONDS) return null
  if (typeof payload.jti !== 'string' || !UUID_PATTERN.test(payload.jti)) return null

  const now = nowSeconds()
  if (now > payload.exp + TICKET_CLOCK_SKEW_SECONDS) return null
  if (now + TICKET_CLOCK_SKEW_SECONDS < payload.iat) return null

  return payload
}

async function verifySession(cookieHeader, secret) {
  const raw = readCookie(cookieHeader, COOKIE_NAME)
  if (!raw) return null

  const parts = raw.split('.')
  if (parts.length !== 2) return null
  if (!(await verifyHmac(secret, parts[0], parts[1]))) return null

  try {
    const payload = decodeJson(parts[0])
    if (!payload || payload.v !== 1) return null
    if (typeof payload.gid !== 'string' || !payload.gid) return null
    if (!Number.isInteger(payload.exp) || payload.exp <= nowSeconds()) return null
    return payload
  } catch {
    return null
  }
}

async function createSessionCookie(env, url, grantId, subject, type) {
  const expiry = nowSeconds() + SESSION_TTL_SECONDS
  const payload = encodeJson({
    v: 1,
    gid: grantId,
    sub: subject,
    typ: type,
    exp: expiry
  })
  const signature = await signHmac(env.SESSION_SECRET, payload)
  const secure = url.protocol === 'https:' ? 'Secure; ' : ''
  return `${COOKIE_NAME}=${payload}.${signature}; HttpOnly; ${secure}SameSite=Lax; Path=/; Max-Age=${SESSION_TTL_SECONDS}`
}

async function getFailure(env, ipHash) {
  const value = await env.AUTH_STATE.get(`fail:${ipHash}`, 'json')
  if (!value || typeof value !== 'object') return { count: 0, lockedUntil: 0 }
  return {
    count: Number.isFinite(value.count) ? value.count : 0,
    lockedUntil: Number.isFinite(value.lockedUntil) ? value.lockedUntil : 0
  }
}

async function isLockedIp(env, ipHash) {
  const state = await getFailure(env, ipHash)
  return state.lockedUntil > nowSeconds()
}

async function recordFailure(env, ipHash) {
  const state = await getFailure(env, ipHash)
  const now = nowSeconds()
  if (state.lockedUntil > now) return state

  const count = state.count + 1
  const lockedUntil = count >= MAX_FAILURES ? now + LOCK_SECONDS : 0
  await env.AUTH_STATE.put(
    `fail:${ipHash}`,
    JSON.stringify({ count, lockedUntil }),
    { expirationTtl: LOCK_SECONDS }
  )
  return { count, lockedUntil }
}

async function resetFailure(env, ipHash) {
  await env.AUTH_STATE.delete(`fail:${ipHash}`)
}

async function failAndRedirect(env, ipHash) {
  const state = await recordFailure(env, ipHash)
  if (state.lockedUntil > nowSeconds()) {
    return deniedResponse(429, '尝试次数过多，请 15 分钟后重试。', { 'Retry-After': String(LOCK_SECONDS) })
  }
  return redirectResponse('/unauthorized')
}

function isPublicAsset(request, url) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return false

  let pathname
  try {
    pathname = decodeURIComponent(url.pathname)
  } catch {
    return false
  }

  if (!pathname.startsWith('/') || pathname.includes('..') || /[\u0000-\u001F]/.test(pathname)) return false

  const lower = pathname.toLowerCase()
  if (PUBLIC_FAVICONS.has(lower)) return true

  const dotIndex = lower.lastIndexOf('.')
  if (dotIndex === -1) return false
  return PUBLIC_EXTENSIONS.has(lower.slice(dotIndex))
}

async function handleAutoLogin(request, env, url) {
  if (request.method !== 'GET') return deniedResponse(405, '仅支持 GET 请求。')

  const ipHash = await clientIpHash(request)
  if (await isLockedIp(env, ipHash)) {
    return deniedResponse(429, '尝试次数过多，请 15 分钟后重试。', { 'Retry-After': String(LOCK_SECONDS) })
  }

  const ticket = url.searchParams.get('ticket')
  const payload = await verifyTicket(ticket, env.TICKET_SECRET)
  if (!payload) return failAndRedirect(env, ipHash)

  const replayKey = `ticket:${payload.jti}`
  if (await env.AUTH_STATE.get(replayKey)) return failAndRedirect(env, ipHash)

  await env.AUTH_STATE.put(replayKey, '1', { expirationTtl: TICKET_REPLAY_TTL_SECONDS })

  const grantId = `t:${crypto.randomUUID()}`
  await env.AUTH_STATE.put(
    `grant:${grantId}`,
    JSON.stringify({
      v: 1,
      sub: payload.sub,
      typ: payload.typ,
      source: 'ticket',
      createdAt: new Date().toISOString()
    }),
    { expirationTtl: SESSION_TTL_SECONDS }
  )

  await resetFailure(env, ipHash)

  return redirectResponse(sanitizeNext(url.searchParams.get('next')), {
    'Set-Cookie': await createSessionCookie(env, url, grantId, payload.sub, payload.typ)
  })
}

async function handleQrLogin(request, env, url) {
  if (request.method !== 'GET') return deniedResponse(405, '仅支持 GET 请求。')

  const ipHash = await clientIpHash(request)
  if (await isLockedIp(env, ipHash)) {
    return deniedResponse(429, '尝试次数过多，请 15 分钟后重试。', { 'Retry-After': String(LOCK_SECONDS) })
  }

  const token = url.searchParams.get('k')
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return failAndRedirect(env, ipHash)

  const tokenHash = await sha256Hex(token)
  const grantKey = `grant:q:${tokenHash}`
  const grant = await env.AUTH_STATE.get(grantKey, 'json')
  if (!grant || grant.v !== 1 || grant.kind !== 'qr-batch' || grant.enabled === false) {
    return failAndRedirect(env, ipHash)
  }

  const now = Date.now()
  const lastUsed = Date.parse(grant.lastUsedAt || 0)
  if (!Number.isFinite(lastUsed) || now - lastUsed > 60_000) {
    await env.AUTH_STATE.put(grantKey, JSON.stringify({ ...grant, lastUsedAt: new Date(now).toISOString() }))
  }

  await resetFailure(env, ipHash)

  return redirectResponse(sanitizeNext(url.searchParams.get('next')), {
    'Set-Cookie': await createSessionCookie(env, url, `q:${tokenHash}`, grant.batch || 'batch', 'batch')
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const pathname = url.pathname

    if (isPublicAsset(request, url)) return serveAsset(request, env)

    if (pathname === '/unauthorized') return deniedResponse()

    if (pathname === '/logout') {
      const secure = url.protocol === 'https:' ? 'Secure; ' : ''
      return redirectResponse('/unauthorized', {
        'Set-Cookie': `${COOKIE_NAME}=; HttpOnly; ${secure}SameSite=Lax; Path=/; Max-Age=0`
      })
    }

    if (pathname === '/auto-login') return handleAutoLogin(request, env, url)
    if (pathname === '/qr-login') return handleQrLogin(request, env, url)

    const session = await verifySession(request.headers.get('cookie'), env.SESSION_SECRET)
    if (!session) return redirectResponse('/unauthorized')

    const grant = await env.AUTH_STATE.get(`grant:${session.gid}`, 'json')
    if (!grant || grant.v !== 1 || grant.enabled === false) return redirectResponse('/unauthorized')

    return serveAsset(request, env)
  }
}

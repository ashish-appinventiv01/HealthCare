// Mock API to simulate async auth flows

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

export async function login({ identifier, password }) {
  await delay(600)
  if (!identifier || !password) throw new Error('Missing credentials')
  return { ok: true, userId: 'u_123' }
}

export async function sendResetCode({ identifier, method }) {
  await delay(600)
  if (!identifier) throw new Error('Missing identifier')
  return { ok: true, destination: method === 'sms' ? '342-392-4354' : 'myemail@gmail.com' }
}

export async function verifyCode({ code }) {
  await delay(600)
  if (code?.join?.('') === '268901' || code === '268901') return { ok: true }
  if ((code?.join ? code.join('') : code).length === 6) return { ok: true }
  throw new Error('Invalid code')
}

export async function resetPassword({ password, confirm }) {
  await delay(600)
  if (password !== confirm) throw new Error('Passwords do not match')
  return { ok: true }
}

export async function register({ identifier, password }) {
  await delay(600)
  if (!identifier || !password) throw new Error('Missing fields')
  return { ok: true }
}


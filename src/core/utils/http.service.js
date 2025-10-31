import { env } from '../../config/env.js'

export async function httpGet(path, options = {}) {
  const res = await fetch(`${env.API_BASE_URL}${path}`, { ...options, method: 'GET' })
  return res.json()
}




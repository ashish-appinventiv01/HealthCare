import { env } from '../../config/env'

export async function httpGet(path: string, options: RequestInit = {}) {
  const res = await fetch(`${env.API_BASE_URL}${path}`, { ...options, method: 'GET' })
  return res.json()
}




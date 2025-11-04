import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'
import { toastService } from '@components/common/common-toastmessage'
import dayjs from 'dayjs'

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  timeout: 300000,
})

api.interceptors.request.use(async (config) => {
  if (!config.headers) return config

  config.headers['platform'] = '3'
  config.headers['timezone'] = new Date().getTimezoneOffset()
  config.headers['timezoneName'] = Intl.DateTimeFormat().resolvedOptions().timeZone
  config.headers['language'] = 'en'
  config.headers['api-key'] = 'a46776aa-499e-41dd-b333-697254ba82c0'
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  const authToken = localStorage.getItem('auth_token')
  if (authToken && authToken.length > 0) {
    config.headers['authorization'] = `Bearer ${authToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<unknown>) => {
    const responseData = error.response?.data as { statusCode?: number; message?: string } | undefined
    const statusCode: number | undefined = responseData?.statusCode
    const message: string = responseData?.message || error.message || 'Request failed'

    try {
      toastService.showToast(message, 'error', 'globalError')
    } catch {
      // noop if toast not available
      console.error('[API Error]:', message)
    }

    if (statusCode === 401) {
      try {
        localStorage.removeItem('auth_token')
      } catch {}
    }

    return Promise.reject(error)
  }
)

// Utils borrowed from reference: parse dates in params and clean empties
const parseDateToTimeStamp = (obj: unknown) => {
  const cloned: unknown = obj && typeof obj === 'object' ? { ...(obj as Record<string, unknown>) } : obj
  ;(function transform(data: unknown): unknown {
    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        for (let i = data.length - 1; i >= 0; i -= 1) {
          const item = data[i]
          const transformed = transform(item)
          if (transformed === '' || transformed === undefined || transformed === null) {
            data.splice(i, 1)
          } else {
            data[i] = transformed
          }
        }
      } else {
        Object.keys(data as Record<string, unknown>).forEach((key) => {
          const value = (data as Record<string, unknown>)[key]
          if (value instanceof Date) {
            ;(data as Record<string, unknown>)[key] = new Date(value).toISOString()
            return
          }
          if (dayjs.isDayjs(value)) {
            if (key.toLowerCase() === 'from') {
              const d = value.toDate()
              d.setDate(d.getDate() + 1)
              d.setUTCHours(0, 0, 0, 0)
              const dateTimeSplit = d.toISOString().split('T')
              ;(data as Record<string, unknown>)[key] = dateTimeSplit[0]
              return
            }
            if (key.toLowerCase() === 'to') {
              const d = value.toDate()
              d.setDate(d.getDate() + 1)
              d.setUTCHours(23, 59, 59, 999)
              const dateTimeSplit = d.toISOString().split('T')
              ;(data as Record<string, unknown>)[key] = dateTimeSplit[0]
              return
            }
            ;(data as Record<string, unknown>)[key] = value.toDate().toISOString()
            return
          }
          if (typeof value === 'object' && value !== null) {
            ;(data as Record<string, unknown>)[key] = transform(value)
          }
        })
      }
    }
    return data
  })(cloned)
  return cloned
}

const cleanParams = (params?: Record<string, unknown>) => {
  if (!params || typeof params !== 'object') return params
  const result: Record<string, unknown> = {}
  Object.keys(params).forEach((k) => {
    const v = params[k]
    if (v !== '' && v !== undefined && v !== null) {
      result[k] = v
    }
  })
  return result
}

export const http = {
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) {
    return api.post<T>(url, data, config)
  },
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) {
    return api.put<T>(url, data, config)
  },
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig<unknown>) {
    return api.patch<T>(url, data, config)
  },
  delete<T = unknown>(url: string, config?: AxiosRequestConfig<unknown>) {
    return api.delete<T>(url, config)
  },
  get<T = unknown>(url: string, params?: unknown, config?: AxiosRequestConfig<unknown>) {
    const parsed = parseDateToTimeStamp(params)
    const cleaned = cleanParams(parsed as Record<string, unknown>)
    return api.get<T>(url, { ...(config || {}), params: cleaned })
  },
}

export default api



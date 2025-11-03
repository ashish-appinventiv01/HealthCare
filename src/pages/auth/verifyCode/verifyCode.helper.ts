import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { VerifyCodeSchema } from './verify-code.validator'
import { sendResetCode, verifyCode } from '@utils/authApi'
import ROUTES from '@routes/routes'

export function useVerifyCode() {
  const { state } = useLocation() as { state?: { context?: string; identifier?: string; method?: 'sms' | 'email' } }
  const navigate = useNavigate()

  const [codeArray, setCodeArray] = useState<string[]>(Array(6).fill(''))
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isFromRegister = state?.context === 'register'

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const code = useMemo(() => codeArray.join(''), [codeArray])

  const isCodeValid = useMemo(() => {
    try {
      VerifyCodeSchema.validateSync({ code })
      return true
    } catch {
      return false
    }
  }, [code])

  const handleChange = (idx: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...codeArray]
    next[idx] = val
    setCodeArray(next)
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !codeArray[idx] && idx > 0) inputsRef.current[idx - 1]?.focus()
  }

  const confirm = async () => {
    setError('')
    setLoading(true)
    try {
      await verifyCode({ code: codeArray })
      if (isFromRegister) {
        localStorage.setItem('auth', 'true')
        navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_1)
      } else {
        navigate(ROUTES.AUTH_ROUTES.FORGOT_PASSWORD)
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    await sendResetCode({ identifier: state?.identifier, method: (state?.method as 'sms' | 'email') || 'sms' })
  }

  return {
    state,
    isFromRegister,
    codeArray,
    inputsRef,
    error,
    loading,
    isCodeValid,
    handleChange,
    handleKeyDown,
    confirm,
    resend,
  }
}



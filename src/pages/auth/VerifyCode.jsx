import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import Button from '../../components/Button.jsx'
import { sendResetCode, verifyCode } from '../../utils/authApi.js'

export default function VerifyCode() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [code, setCode] = useState(Array(6).fill(''))
  const inputsRef = useRef([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const handleChange = (idx, val) => {
    if (!/^[0-9]?$/.test(val)) return
    const next = [...code]
    next[idx] = val
    setCode(next)
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) inputsRef.current[idx - 1]?.focus()
  }

  const confirm = async () => {
    setError('')
    setLoading(true)
    try {
      await verifyCode({ code })
      if (isFromRegister) {
        localStorage.setItem('auth', 'true')
        navigate('/onboarding/step-1')
      } else {
        navigate('/reset')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resend = async () => {
    await sendResetCode({ identifier: state?.identifier, method: state?.method || 'sms' })
  }

  const isFromRegister = state?.context === 'register'

  return (
    <AuthLayout>
      <div className="auth-header">
        <Link to="/login" className="back-link">&lt; Back to Login</Link>
        <h1>{isFromRegister ? 'Verify Email' : 'Verify Account Access'}</h1>
        <p className="sub">
          {isFromRegister
            ? 'Please enter the code sent to your email in order to continue with account creation'
            : 'Please enter the code sent to your number in order to verify your account.'}
        </p>
      </div>
      <div className="otp">
        {code.map((c, i) => (
          <input
            key={i}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={c}
            ref={(el) => (inputsRef.current[i] = el)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>
      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      <Button
        onClick={confirm}
        disabled={loading || code.some((d) => !d)}
        variant="primary"
        style={{ width: '391px', height: '48px', borderRadius: '1px', padding: 0 }}
      >
        {loading ? 'Confirming...' : 'Confirm Code'}
      </Button>
      <div style={{ marginTop: 12 }}>
        Didn’t get a code? <button onClick={resend} style={{ background: 'none', border: 'none', color: 'var(--brand)', cursor: 'pointer' }}>Resend Code</button>
      </div>
    </AuthLayout>
  )
}


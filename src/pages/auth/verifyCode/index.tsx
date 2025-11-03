// @ts-nocheck
import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import Button from '@components/common/common-button'
import { useVerifyCode } from './verifyCode.helper'
export default function VerifyCode() {
  const { 
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
  } = useVerifyCode()

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
        {codeArray.map((c, i) => (
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
        disabled={loading || !isCodeValid}
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


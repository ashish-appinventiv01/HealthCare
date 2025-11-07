import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import Button from '@components/common/common-button'
import ROUTES from '@routes/routes'
import { useVerifyCode } from './verifyCode.helper'
import { COLORS } from '@/constants/ui-constant'

export default function VerifyCode() {
  const {
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
    <AuthLayout 
    title={isFromRegister ? 'Verify Email' : 'Forgot Password'} 
    subtitle={isFromRegister ? 'Please enter the code sent to your email in order to continue with account creation' : 'Please enter the code sent to your number in order to verify your account.'} 
    backLink={<Link to={ROUTES.AUTH_ROUTES.FORGOT_PASSWORD} className="back-link" aria-label="Back to Forgot Password">&lt; Back to Forgot Password</Link>}
    >
      <div className="auth-verify-container">
        
        <div className="otp" role="group" aria-label="6-digit verification code inputs">
          {codeArray.map((c, i) => (
            <input
              key={i} 
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={c}
              ref={(el: HTMLInputElement | null) => { inputsRef.current[i] = el }}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              aria-label={`Digit ${i + 1}`}
              aria-invalid={!!error}
            />
          ))}
        </div>
        {error && (
          <div className="error-text" role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <Button
          onClick={confirm}
          disabled={loading || !isCodeValid}
          variant="contained"
          full
          className="verify-button"
        >
          {loading ? 'Confirming...' : 'Confirm Code'}
        </Button>
        <div className="resend-code-section">
          <span className="resend-text">Didn’t get a code?</span>{' '}
          <button onClick={resend} type="button" className="resend-link">
            Resend Code
          </button>
        </div>
      </div>
    </AuthLayout>  
  
  )
}


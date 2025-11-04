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
    <AuthLayout>
      <div style={{
        width: '100%',
        maxWidth: '520px',
        margin: '0px auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="auth-header">
          <Link
            to={isFromRegister ? ROUTES.AUTH_ROUTES.REGISTER : ROUTES.AUTH_ROUTES.LOGIN}
            className="back-link"
            aria-label={isFromRegister ? 'Back to Register' : 'Back to Login'}
          >
            &lt; {isFromRegister ? 'Back to Register' : 'Back to Login'}
          </Link>
          <h1>{isFromRegister ? 'Verify Email' : 'Verify Account Access'}</h1>
          <p className="sub">
            {isFromRegister
              ? 'Please enter the code sent to your email in order to continue with account creation'
              : 'Please enter the code sent to your number in order to verify your account.'}
          </p>
        </div>
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
          <div style={{ color: 'crimson', marginBottom: 12 }} role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <Button
          onClick={confirm}
          disabled={loading || !isCodeValid}
          variant="contained"
          style={{ width: '85%', height: '48px', borderRadius: '1px', padding: 0 }}
        >
          {loading ? 'Confirming...' : 'Confirm Code'}
        </Button>
        <div style={{ marginTop: 28 , color: COLORS.resendCodeText}}>
          Didn’t get a code?{' '}
          <button
            onClick={resend}
            type="button"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: COLORS.focusPrimary, padding: 0 }}
          >
            Resend Code
          </button>
        </div>
      </div>
    </AuthLayout>
  )
}


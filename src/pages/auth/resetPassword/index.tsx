import { FormikProvider, Form } from 'formik'
import { Link } from 'react-router-dom'
import { passwordError } from '../../../constants/validation'
import AuthLayout from '@layouts/authLayout'
import MUITextField from '@components/common/common-textfield'
import IconButton from '@components/eyeIcon-button/IconButton'
import EyeOpen from '@assets/icons/EyeOpen'
import EyeOff from '@assets/icons/EyeOff'
import Button from '@components/common/common-button'
import { useResetPassword } from './resetPassword.helper'

export default function ResetPassword() {
  const {
    loading,
    error,
    showPass1, setShowPass1,
    showPass2, setShowPass2,
    isPwdFocused, setIsPwdFocused,
    isConfirmFocused, setIsConfirmFocused,
    formik,
    isConfirmValid,
  } = useResetPassword()

  return (
    <AuthLayout title="Reset Your Password" subtitle="You are all set! Enter a new password.">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
            label="Password" 
            type={showPass1 ? 'text' : 'password'} 
            value={formik.values.password} 
            onChange={(v) => formik.setFieldValue('password', String(v))} 
            onFocus={() => setIsPwdFocused(true)}
            onBlur={() => setIsPwdFocused(false)}
            placeholder="Enter password" 
            helperText={!isPwdFocused && Boolean(formik.values.password) ? (formik.errors.password as string) || passwordError : ''} 
            error={!isPwdFocused && Boolean(formik.values.password) && Boolean(formik.errors.password)} 
            InputProps={{ endAdornment: (
              <IconButton onClick={() => setShowPass1(!showPass1)}>{showPass1 ? <EyeOff/> : <EyeOpen/>}</IconButton>
            ) }} 
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <MUITextField 
            label="Confirm Password" 
            type={showPass2 ? 'text' : 'password'} 
            value={formik.values.confirm} 
            onChange={(v) => formik.setFieldValue('confirm', String(v))} 
            onFocus={() => setIsConfirmFocused(true)}
            onBlur={() => setIsConfirmFocused(false)}
            placeholder="Enter password" 
            helperText={!isConfirmFocused && Boolean(formik.values.confirm) ? (formik.errors.confirm as string) : ''} 
            error={!isConfirmFocused && Boolean(formik.values.confirm) && Boolean(formik.errors.confirm)} 
            InputProps={{ endAdornment: (
              <IconButton onClick={() => setShowPass2(!showPass2)}>{showPass2 ? <EyeOff/> : <EyeOpen/>}</IconButton>
            ) }} 
          />
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !isConfirmValid} full style={{ marginTop: 61 }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </Form>
      </FormikProvider>
    </AuthLayout>
  )
}


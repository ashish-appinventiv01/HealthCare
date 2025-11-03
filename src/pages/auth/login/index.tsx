import { useState } from 'react'
import { FormikProvider, Form } from 'formik'
import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import MUITextField from '@components/common/common-textfield'
import IconButton from '@components/eyeIcon-button/IconButton'
import Button from '@components/common/common-button'
import EyeOpen from '@assets/icons/EyeOpen'
import EyeOff from '@assets/icons/EyeOff'
import Modal from '@components/Modal'
import { useLogin } from './login.helper'

export default function Login() {
  const { 
    open, setOpen, method, setMethod, loading, error, 
    formik, isIdentifierValid, isPasswordValid, handleLogin,
    showPassword, setShowPassword,
    isIdFocused, setIsIdFocused,
    isPwdFocused, setIsPwdFocused,
  } = useLogin()
  const { values, setFieldValue, errors } = formik

  return (
    <AuthLayout title="Welcome Back!" subtitle="Please sign in to continue">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
            label="Email/Phone Number"
            value={values.identifier}
            onChange={(v) => setFieldValue('identifier', String(v).trim())}
            onFocus={() => setIsIdFocused(true)}
            onBlur={() => setIsIdFocused(false)}
            placeholder="Enter email or phone number"
            helperText={!isIdFocused && Boolean(values.identifier) ? (errors.identifier as string) : ''}
            error={!isIdFocused && Boolean(values.identifier) && Boolean(errors.identifier)}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
            label="Password" 
            type={showPassword ? 'text' : 'password'} 
            value={values.password} 
            onChange={(v) => setFieldValue('password', String(v))}
            onFocus={() => setIsPwdFocused(true)}
            onBlur={() => setIsPwdFocused(false)}
            placeholder="Enter password" 
            helperText={!isPwdFocused && Boolean(values.password) ? (errors.password as string) : ''} 
            error={!isPwdFocused && Boolean(values.password) && Boolean(errors.password)} 
            InputProps={{ endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <EyeOpen/>}</IconButton>
            ) }} 
          />
        </div>
        <div className="row" style={{ marginBottom: 8 }}>
          <span />
          <Link to="/forgot">Forgot Password?</Link>
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !isIdentifierValid || !isPasswordValid} full style={{ marginTop: 61 }}>
          {loading ? 'Logging In...' : 'Log In'}
        </Button>
        <div style={{ marginTop: 16, textAlign: 'center', color: '#6b7280' }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </Form>
      </FormikProvider>
      <Modal
        title={"Select how you'd like to receive your verification code for Login."}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <div className="modal-footer">
            <Button className="modal-button" onClick={() => setOpen(false)} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#e5e7eb', color: '#111827' }}>Cancel</Button>
            <Button className="modal-button" onClick={handleLogin} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#2483C5' }}>Continue</Button>
          </div>
        }
      >
        <div className="choice" onClick={() => setMethod('sms')} style={{ borderColor: method==='sms'? 'var(--brand)': '#e5e7eb' }}>
          <input type="radio" checked={method==='sms'} readOnly />
          <div>
            <div>SMS (Text Message)</div>
            <div style={{ color: '#6b7280', fontSize: 12 }}>342-392-4354</div>
          </div>
        </div>
        <div className="choice" onClick={() => setMethod('email')} style={{ borderColor: method==='email'? 'var(--brand)': '#e5e7eb' }}>
          <input type="radio" checked={method==='email'} readOnly />
          <div>
            <div>Email</div>
            <div style={{ color: '#6b7280', fontSize: 12 }}>myemail@gmail.com</div>
          </div>
        </div>
      </Modal>
    </AuthLayout>
  )
}

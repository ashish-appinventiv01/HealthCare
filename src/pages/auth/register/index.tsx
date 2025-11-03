import { FormikProvider, Form } from 'formik'
import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import MUITextField from '@components/common/common-textfield'
// import DatePicker from '@components/common/DatePicker'
import IconButton from '@components/eyeIcon-button/IconButton'
import Button from '@components/common/common-button'
import Modal from '@components/Modal'
import EyeOpen from '@assets/icons/EyeOpen'
import EyeOff from '@assets/icons/EyeOff'
import { passwordError } from '../../../constants/validation'
import { useRegister } from './register.helper'
export default function Register() {
  const { 
    open, setOpen, method, setMethod, loading, error,
    showPassword, setShowPassword,
    isIdFocused, setIsIdFocused,
    isPwdFocused, setIsPwdFocused,
    formik, isIdentifierValid, isPasswordValid, handleRegister,
  } = useRegister()

  return (
    <AuthLayout title="Welcome to CWCFNP" subtitle="Let’s create your account">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
            label="Email/Phone Number" 
            type="text" 
            value={formik.values.identifier} 
            onChange={(v) => formik.setFieldValue('identifier', String(v).trim())} 
            onFocus={() => setIsIdFocused(true)}
            onBlur={() => setIsIdFocused(false)}
            placeholder="Enter email or phone number" 
            helperText={!isIdFocused && Boolean(formik.values.identifier) ? (formik.errors.identifier as string) : ''} 
            error={!isIdFocused && Boolean(formik.values.identifier) && Boolean(formik.errors.identifier)} 
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
            label="Password" 
            type={showPassword ? 'text' : 'password'} 
            value={formik.values.password} 
            onChange={(v) => formik.setFieldValue('password', String(v))} 
            onFocus={() => setIsPwdFocused(true)}
            onBlur={() => setIsPwdFocused(false)}
            placeholder="Enter password" 
            helperText={!isPwdFocused && Boolean(formik.values.password) ? (formik.errors.password as string) : ''} 
            error={!isPwdFocused && Boolean(formik.values.password) && Boolean(formik.errors.password)} 
            InputProps={{ endAdornment: (
              <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <EyeOpen/>}</IconButton>
            ) }} 
          />
        </div>
        {/* Password rules checklist is removed in favor of centralized regex validation */}
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !isIdentifierValid || !isPasswordValid} full style={{ marginTop: 61 }}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div style={{ marginTop: 16, textAlign: 'center', color: '#6b7280' }}>
          Already have a account? <Link to="/login">Log in</Link>
        </div>
      </Form>
      </FormikProvider>

      <Modal
        title={"Select how you'd like to receive your verification code for Registration."}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <div className="modal-footer">
            <Button className="modal-button" onClick={() => setOpen(false)} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#e5e7eb', color: '#111827' }}>Cancel</Button>
            <Button className="modal-button" onClick={handleRegister} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#2483C5' }}>Continue</Button>
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


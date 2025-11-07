import { FormikProvider, Form } from 'formik'
import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import MUITextField from '@components/common/common-textfield'
// import DatePicker from '@components/common/DatePicker'
import IconButton from '@components/eyeIcon-button/IconButton'
import Button from '@components/common/common-button'
import CommonCheckbox from '@components/common/common-checkbox'
import Modal from '@components/Modal'
import EyeOpen from '@assets/icons/EyeOpen'
import EyeOff from '@assets/icons/EyeOff'
import { useRegister } from './register.helper'
import checkCircle from '@assets/Images/check_circle.png'
import uncheckedCircle from '@assets/Images/unchecked_circle.png'
export default function Register() {
  const { 
    open, setOpen, method, setMethod, loading, error,
    showPassword, setShowPassword,
    isIdFocused, setIsIdFocused,
    isPwdFocused, setIsPwdFocused,
    formik, isIdentifierValid, isPasswordValid, handleRegister,
  } = useRegister()

  return (
    <AuthLayout title="Welcome to CWCNFP" subtitle="Let’s create your account">
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
        {/* <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8, marginBottom: 12 }}>
          <CommonCheckbox shape="square" checked={agreed} onChange={setAgreed} />
          <div style={{ color: '#374151' }}>
            I agree to <Link to="/privacy-consent">Privacy Consent</Link> and <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div> */}
        {/* Password rules checklist - visible only after typing */}
        {Boolean(formik.values.password?.length) && (
          <div style={{ marginTop: 8, marginBottom: 12 }}>
            {(() => {
              const pwd = String(formik.values.password || '')
              const passHasValidLength = pwd.length >= 8 && pwd.length <= 15
              const passHasUppercase = /[A-Z]/.test(pwd)
              const passHasLowercase = /[a-z]/.test(pwd)
              const passHasNumber = /[0-9]/.test(pwd)
              const passHasSpecial = /[@$%&]/.test(pwd)
              const rules = [
                { ok: passHasValidLength, text: '8 to 15 characters,' },
                { ok: passHasUppercase, text: '1 Uppercase(A-Z),' },
                { ok: passHasLowercase, text: '1 lower case(a-z),' },
                { ok: passHasNumber, text: '1 number (0-9) and' },
                { ok: passHasSpecial, text: '1 special character like @,$,%, and &.' },
              ]
              return (
                <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                  {rules.map((rule, idx) => (
                    <li
                      key={idx}
                      style={{ display: 'flex', alignItems: 'center', gap: 8, color: rule.ok ? '#16a34a' : '#6b7280', fontSize: 14, lineHeight: '22px' }}
                    >
                      <img src={rule.ok ? checkCircle : uncheckedCircle} alt="rule status" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                      <span>{rule.text}</span>
                    </li>
                  ))}
                </ul>
              )
            })()}
          </div>
        )}
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !isIdentifierValid || !isPasswordValid} full style={{ marginTop: 61 }}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div style={{ marginTop: 18, textAlign: 'center', color: '#6b7280' }}>
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


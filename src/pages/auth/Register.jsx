import { useState } from 'react'
import { useFormik, FormikProvider, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUITextField from '../../components/common/MUITextField.jsx'
// import DatePicker from '../../components/common/DatePicker.jsx'
import IconButton from '../../components/IconButton.jsx'
import Button from '../../components/common/Button.jsx'
import Modal from '../../components/Modal.jsx'
import EyeOpen from '../../assets/icons/EyeOpen.jsx'
import EyeOff from '../../assets/icons/EyeOff.jsx'
import { register } from '../../utils/authApi.js'
import checkCircle from '../../assets/Images/check_circle.png'
import uncheckedCircle from '../../assets/Images/unchecked_circle.png'

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState('sms')

  const formik = useFormik({
    initialValues: { identifier: '', password: '', dob: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
  })

  // Live password validation rules
  const passHasValidLength = formik.values.password.length >= 8 && formik.values.password.length <= 15
  const passHasUppercase = /[A-Z]/.test(formik.values.password)
  const passHasLowercase = /[a-z]/.test(formik.values.password)
  const passHasNumber = /[0-9]/.test(formik.values.password)
  const passHasSpecial = /[@$%&]/.test(formik.values.password)
  const allPasswordRulesOk = passHasValidLength && passHasUppercase && passHasLowercase && passHasNumber && passHasSpecial

  const handleRegister = async () => {
    setError('')
    setLoading(true)
    try {
      await register({ identifier: formik.values.identifier, password: formik.values.password })
      navigate('/verify', { state: { context: 'register', identifier: formik.values.identifier, method } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AuthLayout title="Welcome to CWCFNP" subtitle="Let’s create your account">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Email/Phone Number" type="text" value={formik.values.identifier} onChange={(v) => formik.setFieldValue('identifier', v)} placeholder="Enter email or phone number" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Password" type={showPassword ? 'text' : 'password'} value={formik.values.password} onChange={(v) => formik.setFieldValue('password', v)} placeholder="Enter password" InputProps={{ endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <EyeOpen/>}</IconButton>
          ) }} />
        </div>
        {/* Password rules checklist - visible only after typing */}
        {formik.values.password.length > 0 && (
          <div style={{ marginTop: 8, marginBottom: 12 }}>
            <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
              {[{
                ok: passHasValidLength,
                text: '8 to 15 characters,'
              }, {
                ok: passHasUppercase,
                text: '1 Uppercase(A-Z),'
              }, {
                ok: passHasLowercase,
                text: '1 lower case(a-z),'
              }, {
                ok: passHasNumber,
                text: '1 number (0-9) and'
              }, {
                ok: passHasSpecial,
                text: '1 special character like @,$,%, and &.'
              }].map((rule, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, color: rule.ok ? '#16a34a' : '#6b7280', fontSize: 14, lineHeight: '22px' }}>
                  <img src={rule.ok ? checkCircle : uncheckedCircle} alt="rule status" style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  <span>{rule.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !formik.values.identifier || !allPasswordRulesOk} full style={{ marginTop: 61 }}>
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


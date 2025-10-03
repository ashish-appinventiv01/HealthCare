import { useState } from 'react'
import { useFormik, FormikProvider, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUITextField from '../../components/common/MUITextField.jsx'
import IconButton from '../../components/IconButton.jsx'
import Button from '../../components/common/Button.jsx'
import EyeOpen from '../../assets/icons/EyeOpen.jsx'
import EyeOff from '../../assets/icons/EyeOff.jsx'
import Modal from '../../components/Modal.jsx'
import { login } from '../../utils/authApi.js'

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState('sms')

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
  })

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await login({ identifier: formik.values.identifier, password: formik.values.password })
      localStorage.setItem('auth', 'true')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AuthLayout title="Welcome Back!" subtitle="Please sign in to continue">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Email/Phone Number" value={formik.values.identifier} onChange={(v) => formik.setFieldValue('identifier', v)} placeholder="Enter email or phone number" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Password" type={showPassword ? 'text' : 'password'} value={formik.values.password} onChange={(v) => formik.setFieldValue('password', v)} placeholder="Enter password" InputProps={{ endAdornment: (
          <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <EyeOpen/>}</IconButton>
        ) }} />
        </div>
        <div className="row" style={{ marginBottom: 8 }}>
          <span />
          <Link to="/forgot">Forgot Password?</Link>
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !formik.values.identifier || !formik.values.password} full style={{ marginTop: 61 }}>
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

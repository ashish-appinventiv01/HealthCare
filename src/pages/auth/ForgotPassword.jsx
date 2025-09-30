import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import TextField from '../../components/TextField.jsx'
import Button from '../../components/Button.jsx'
import Modal from '../../components/Modal.jsx'
import { sendResetCode } from '../../utils/authApi.js'

export default function ForgotPassword() {
  const [identifier, setIdentifier] = useState('')
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState('sms')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSend = async () => {
    setError('')
    setLoading(true)
    try {
      await sendResetCode({ identifier, method })
      navigate('/verify', { state: { identifier, method } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AuthLayout>
      <div className="auth-header">
        <Link to="/login" className="back-link">&lt; Back to Login</Link>
        <h1>Forgot Password</h1>
        <p className="sub">We’ll send you a code to verify your account access.</p>
      </div>
      <TextField id="forgot-email" label="Email/Phone Number" variant="filled" fullWidth value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Please enter your email or phone number" />
      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      <Button onClick={() => setOpen(true)} disabled={!identifier} variant="primary" full>
        {loading ? 'Sending...' : 'Send Code'}
      </Button>
      
      <Modal
        title={"Select how you'd like to receive your verification code for Reset Password."}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <div className="modal-footer">
            <Button className="modal-button" onClick={() => setOpen(false)} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 1, backgroundColor: '#e5e7eb', color: '#111827' }}>Cancel</Button>
            <Button className="modal-button" onClick={handleSend} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 1, backgroundColor: '#2483C5' }}>Continue</Button>
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


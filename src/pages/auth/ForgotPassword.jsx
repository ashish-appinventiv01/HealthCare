import { useState } from 'react'
import { useFormik, FormikProvider, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUITextField from '../../components/common/MUITextField.jsx'
import Button from '../../components/common/Button.jsx'
import Modal from '../../components/Modal.jsx'
import { sendResetCode } from '../../utils/authApi.js'

export default function ForgotPassword() {
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState('sms')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { identifier: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
  })

  const handleSend = async () => {
    setError('')
    setLoading(true)
    try {
      await sendResetCode({ identifier: formik.values.identifier, method })
      navigate('/verify', { state: { identifier: formik.values.identifier, method } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <AuthLayout title="Forgot Password" subtitle="We’ll send you a code to verify your account access.">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Email/Phone Number" value={formik.values.identifier} onChange={(v) => formik.setFieldValue('identifier', v)} placeholder="Please enter your email or phone number" />
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !formik.values.identifier} full style={{ marginTop: 61 }}>
          {loading ? 'Sending...' : 'Send Code'}
        </Button>
      </Form>
      </FormikProvider>

      <Modal
        title={"Select how you'd like to receive your verification code for Reset Password."}
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <div className="modal-footer">
            <Button className="modal-button" onClick={() => setOpen(false)} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#e5e7eb', color: '#111827' }}>Cancel</Button>
            <Button className="modal-button" onClick={handleSend} style={{ width: 190, height: 48, borderWidth: 1, borderRadius: 9, backgroundColor: '#2483C5' }}>Continue</Button>
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


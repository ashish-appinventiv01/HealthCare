import { FormikProvider, Form } from 'formik'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import MUITextField from '@components/common/common-textfield'
import Button from '@components/common/common-button'
import Modal from '@components/Modal'
import { useForgotPassword } from './forgotPassword.helper'

export default function ForgotPassword() {
  const { open, setOpen, method, setMethod, loading, error, formik, isIdentifierValid, handleSend } = useForgotPassword()
  const { values, setFieldValue, errors } = formik
  const [isFocused, setIsFocused] = useState(false)
  const showError = !isFocused && Boolean(values.identifier) && Boolean(errors.identifier)

  return (
    <AuthLayout title="Forgot Password" subtitle="We’ll send you a code to verify your account access.">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField 
           label="Email/Phone Number"
           value={values.identifier}
           onChange={(v) => setFieldValue('identifier', String(v).trim())}
           onFocus={() => setIsFocused(true)}
           onBlur={() => setIsFocused(false)}
           placeholder="Please enter your email or phone number"
           helperText={showError ? (errors.identifier as string) : ''}
           error={showError} />
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button 
          type="submit" 
          disabled={loading || !isIdentifierValid} 
          full 
          style={{ marginTop: 61 }}
          onClick={handleSend}
        >
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


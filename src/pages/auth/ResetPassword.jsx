import { useState } from 'react'
import { useFormik, FormikProvider, Form } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUITextField from '../../components/MUITextField.jsx'
import IconButton from '../../components/IconButton.jsx'
import EyeOpen from '../../assets/icons/EyeOpen.jsx'
import EyeOff from '../../assets/icons/EyeOff.jsx'
import Button from '../../components/Button.jsx'
import { resetPassword } from '../../utils/authApi.js'

export default function ResetPassword() {
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { password: '', confirm: '' },
    onSubmit: async () => {
      setError('')
      setLoading(true)
      try {
        await resetPassword({ password: formik.values.password, confirm: formik.values.confirm })
        navigate('/login')
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    },
  })

  return (
    <AuthLayout title="Reset Your Password" subtitle="You are all set! Enter a new password.">
      <FormikProvider value={formik}>
      <Form>
        <div style={{ marginBottom: 12 }}>
          <MUITextField label="Password" type={showPass1 ? 'text' : 'password'} value={formik.values.password} onChange={(v) => formik.setFieldValue('password', v)} placeholder="Enter password" InputProps={{ endAdornment: (
            <IconButton onClick={() => setShowPass1(!showPass1)}>{showPass1 ? <EyeOff/> : <EyeOpen/>}</IconButton>
          ) }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <MUITextField label="Confirm Password" type={showPass2 ? 'text' : 'password'} value={formik.values.confirm} onChange={(v) => formik.setFieldValue('confirm', v)} placeholder="Enter password" InputProps={{ endAdornment: (
            <IconButton onClick={() => setShowPass2(!showPass2)}>{showPass2 ? <EyeOff/> : <EyeOpen/>}</IconButton>
          ) }} />
        </div>
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !formik.values.password || formik.values.password !== formik.values.confirm} full style={{ marginTop: 61 }}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </Form>
      </FormikProvider>
    </AuthLayout>
  )
}


import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import TextField from '../../components/TextField.jsx'
import IconButton from '../../components/IconButton.jsx'
import EyeOpen from '../../assets/icons/EyeOpen.jsx'
import EyeOff from '../../assets/icons/EyeOff.jsx'
import Button from '../../components/Button.jsx'
import { resetPassword } from '../../utils/authApi.js'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState('')
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await resetPassword({ password, confirm: confirmPass })
      navigate('/login')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Reset Your Password" subtitle="You are all set! Enter a new password.">
      <form onSubmit={submit}>
        <TextField id="reset-pass-1" label="Password" type={showPass1 ? 'text' : 'password'} variant="filled" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" InputProps={{ endAdornment: (
          <IconButton onClick={() => setShowPass1(!showPass1)}>{showPass1 ? <EyeOff/> : <EyeOpen/>}</IconButton>
        ) }} />
        <TextField id="reset-pass-2" label="Confirm Password" type={showPass2 ? 'text' : 'password'} variant="filled" fullWidth value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Enter password" InputProps={{ endAdornment: (
          <IconButton onClick={() => setShowPass2(!showPass2)}>{showPass2 ? <EyeOff/> : <EyeOpen/>}</IconButton>
        ) }} />
        {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
        <Button type="submit" disabled={loading || !password || password !== confirmPass} full>
          {loading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </form>
    </AuthLayout>
  )
}


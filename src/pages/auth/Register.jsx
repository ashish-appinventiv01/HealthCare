import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import TextField from '../../components/TextField.jsx'
import IconButton from '../../components/IconButton.jsx'
import Button from '../../components/Button.jsx'
import EyeOpen from '../../assets/icons/EyeOpen.jsx'
import EyeOff from '../../assets/icons/EyeOff.jsx'
import { register } from '../../utils/authApi.js'
import checkCircle from '../../assets/Images/check_circle.png'
import uncheckedCircle from '../../assets/Images/unchecked_circle.png'

export default function Register() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Live password validation rules
  const passHasValidLength = password.length >= 8 && password.length <= 15
  const passHasUppercase = /[A-Z]/.test(password)
  const passHasLowercase = /[a-z]/.test(password)
  const passHasNumber = /[0-9]/.test(password)
  const passHasSpecial = /[@$%&]/.test(password)
  const allPasswordRulesOk = passHasValidLength && passHasUppercase && passHasLowercase && passHasNumber && passHasSpecial

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ identifier, password })
      navigate('/verify', { state: { context: 'register', identifier, method: 'email' } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Welcome to CWCFNP" subtitle="Let’s create your account">
      <form onSubmit={handleSubmit}>
        <TextField id="reg-email" label="Email/Phone Number" type="text" variant="filled" fullWidth value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Enter email" />
        <TextField id="reg-pass" label="Password" type={showPassword ? 'text' : 'password'} variant="filled" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" InputProps={{ endAdornment: (
          <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff/> : <EyeOpen/>}</IconButton>
        ) }} />
        {/* Password rules checklist - visible only after typing */}
        {password.length > 0 && (
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
        <Button type="submit" disabled={loading || !identifier || !allPasswordRulesOk} full>
          {loading ? 'Registering...' : 'Register'}
        </Button>
        <div style={{ marginTop: 16, textAlign: 'center', color: '#6b7280' }}>
          Already have a account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </AuthLayout>
  )
}


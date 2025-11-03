import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { LoginSchema } from './login.validator'
import { login } from '@utils/authApi'
import ROUTES from '@routes/routes'

export function useLogin() {
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState<'sms' | 'email'>('sms')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isIdFocused, setIsIdFocused] = useState(false)
  const [isPwdFocused, setIsPwdFocused] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
    validationSchema: LoginSchema,
    validateOnMount: true,
  })

  const isIdentifierValid = Boolean(formik.values.identifier) && !formik.errors.identifier
  const isPasswordValid = Boolean(formik.values.password) && !formik.errors.password

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await login({ identifier: formik.values.identifier, password: formik.values.password })
      localStorage.setItem('auth', 'true')
      navigate(ROUTES.FEATURE_ROUTES.DASHBOARD)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return { 
    open, setOpen, 
    method, setMethod, 
    loading, 
    error, setError, 
    showPassword, setShowPassword,
    isIdFocused, setIsIdFocused,
    isPwdFocused, setIsPwdFocused,
    formik, 
    isIdentifierValid, 
    isPasswordValid, 
    handleLogin 
  }
}



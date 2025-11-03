import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { RegisterSchema } from './register.validator'
import { register as registerApi } from '@utils/authApi'
import ROUTES from '@routes/routes'

export function useRegister() {
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState<'sms' | 'email'>('sms')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isIdFocused, setIsIdFocused] = useState(false)
  const [isPwdFocused, setIsPwdFocused] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { identifier: '', password: '', dob: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
    validationSchema: RegisterSchema,
    validateOnMount: true,
  })

  const isIdentifierValid = Boolean(formik.values.identifier) && !formik.errors.identifier
  const isPasswordValid = Boolean(formik.values.password) && !formik.errors.password

  const handleRegister = async () => {
    setError('')
    setLoading(true)
    try {
      await registerApi({ identifier: formik.values.identifier, password: formik.values.password })
      navigate(ROUTES.AUTH_ROUTES.VERIFY_CODE, { state: { context: 'register', identifier: formik.values.identifier, method } })
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
    handleRegister,
  }
}



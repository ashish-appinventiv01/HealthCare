import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ForgotPasswordSchema } from './forgot-password.validator'
import { sendResetCode } from '@utils/authApi'
import ROUTES from '@routes/routes'

export function useForgotPassword() {
  const [open, setOpen] = useState(false)
  const [method, setMethod] = useState<'sms' | 'email'>('sms')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { identifier: '' },
    onSubmit: () => {
      setError('')
      setOpen(true)
    },
    validationSchema: ForgotPasswordSchema,
    validateOnMount: true,
  })

  const isIdentifierValid = formik.isValid && Boolean(formik.values.identifier)

  // Track input focus to control when to show validation errors
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const showError = !isFocused && Boolean(formik.values.identifier) && Boolean(formik.errors.identifier)

  const handleSend = async () => {
    setError('')
    setLoading(true)
    try {
      await sendResetCode({ identifier: formik.values.identifier, method })
      navigate(ROUTES.AUTH_ROUTES.VERIFY_CODE, { state: { identifier: formik.values.identifier, method } })
    } catch (err: unknown) {
      setError((err as Error)?.message || 'Something went wrong')
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
    formik, 
    isIdentifierValid, 
    isFocused, setIsFocused,
    handleFocus, handleBlur,
    showError,
    handleSend 
  }
}



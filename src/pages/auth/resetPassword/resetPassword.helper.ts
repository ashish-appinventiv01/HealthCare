import { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ResetPasswordSchema } from './reset-password.validator'
import { resetPassword } from '@utils/authApi'
import ROUTES from '@routes/routes'

export function useResetPassword() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass1, setShowPass1] = useState(false)
  const [showPass2, setShowPass2] = useState(false)
  const [isPwdFocused, setIsPwdFocused] = useState(false)
  const [isConfirmFocused, setIsConfirmFocused] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { password: '', confirm: '' },
    onSubmit: async () => {
      setError('')
      setLoading(true)
      try {
        await resetPassword({ password: formik.values.password, confirm: formik.values.confirm })
        navigate(ROUTES.AUTH_ROUTES.LOGIN)
      } catch (err: unknown) {
        setError((err as Error)?.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    },
    validationSchema: ResetPasswordSchema,
    validateOnMount: true,
  })

  const isPasswordValid = Boolean(formik.values.password) && !formik.errors.password
  const isConfirmValid = Boolean(formik.values.confirm) && !formik.errors.confirm

  return {
    loading,
    error, setError,
    showPass1, setShowPass1,
    showPass2, setShowPass2,
    isPwdFocused, setIsPwdFocused,
    isConfirmFocused, setIsConfirmFocused,
    formik,
    isPasswordValid,
    isConfirmValid,
  }
}



import React, { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ROUTES from './routes.jsx'

const Login = lazy(() => import('../pages/auth/Login.jsx'))
const LanguageSelect = lazy(() => import('../pages/auth/LanguageSelect.jsx'))
const Register = lazy(() => import('../pages/auth/Register.jsx'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword.jsx'))
const VerifyCode = lazy(() => import('../pages/auth/VerifyCode.jsx'))

const publicRoute = {
  path: ROUTES.BASE_ROUTE,
  element: (
    <PublicGate />
  ),
  children: [
    { index: true, element: <LanguageSelect /> },
    { path: ROUTES.AUTH_ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.AUTH_ROUTES.REGISTER, element: <Register /> },
    { path: ROUTES.AUTH_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.AUTH_ROUTES.VERIFY_CODE, element: <VerifyCode /> }
  ]
}

export default publicRoute

function isAuthenticated() {
  return !!localStorage.getItem('auth')
}

function PublicGate() {
  return isAuthenticated() ? <Navigate to={ROUTES.FEATURE_ROUTES.DASHBOARD} replace /> : <Outlet />
}




import { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ROUTES from './routes'

const Login = lazy(() => import('@pages/auth/login'))
const LanguageSelect = lazy(() => import('@pages/auth/LanguageSelect'))
const Register = lazy(() => import('@pages/auth/register'))
const ForgotPassword = lazy(() => import('@pages/auth/forgotPassword'))
const VerifyCode = lazy(() => import('@pages/auth/verifyCode'))

function isAuthenticated() {
  return !!localStorage.getItem('auth')
}

function PublicGate() {
  return isAuthenticated() ? <Navigate to={ROUTES.FEATURE_ROUTES.DASHBOARD} replace /> : <Outlet />
}

const publicRoute = {
  path: ROUTES.BASE_ROUTE,
  element: <PublicGate />,
  children: [
    { index: true, element: <LanguageSelect /> },
    { path: ROUTES.AUTH_ROUTES.LOGIN, element: <Login /> },
    { path: ROUTES.AUTH_ROUTES.REGISTER, element: <Register /> },
    { path: ROUTES.AUTH_ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
    { path: ROUTES.AUTH_ROUTES.VERIFY_CODE, element: <VerifyCode /> }
  ]
}

export default publicRoute


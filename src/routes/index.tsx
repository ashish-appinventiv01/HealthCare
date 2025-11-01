import { Suspense } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import publicRoute from './publicRoute'
import privateRoute from './privateRoute'
import ResetPassword from '@pages/auth/resetPassword'

export function RouteManager() {
  const NotFoundRoute = {
    path: '*',
    element: <Navigate to="/login" replace />
  }

  const ResetPasswordRoute = {
    path: '/reset',
    element: <ResetPassword />
  }

  const element = useRoutes([publicRoute, privateRoute, ResetPasswordRoute, NotFoundRoute])

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid #E5E7EB', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
      </div>
    }>
      {element}
    </Suspense>
  )
}

export default RouteManager

import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => !!localStorage.getItem('auth')

export default function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />
}



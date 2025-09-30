import { Navigate, Outlet } from 'react-router-dom'

const isAuthenticated = () => !!localStorage.getItem('auth')

export default function PublicRoute() {
  return isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Outlet />
}



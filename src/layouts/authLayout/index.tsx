
import { Outlet } from 'react-router-dom'

import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title?: ReactNode
  subtitle?: ReactNode
  step?: ReactNode
  children?: ReactNode

}

export default function AuthLayout({ title, subtitle, step, children }: AuthLayoutProps) {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        {step && <div className="auth-step">{step}</div>}
        <div className={`auth-content ${step ? 'auth-content-with-step' : ''}`}>
          {title && <h1 className="auth-title">{title}</h1>}
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}


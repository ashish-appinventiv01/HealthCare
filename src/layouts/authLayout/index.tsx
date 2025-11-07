
import { Outlet } from 'react-router-dom'

import type { ReactNode } from 'react'

interface AuthLayoutProps {
  title?: ReactNode
  subtitle?: ReactNode
  step?: ReactNode
  children?: ReactNode
  backLink?: ReactNode
}

export default function AuthLayout({ title, subtitle, step, children ,backLink}: AuthLayoutProps) {
  const hasTitleAndSubtitle = title && subtitle
  
  // If no title and subtitle, render children directly without auth-card wrapper
  if (!hasTitleAndSubtitle) {
    return (
      <div className="auth-layout">
        {children || <Outlet />}
      </div>
    )
  }
  
  // Otherwise, render with auth-card wrapper (existing behavior)
  return (
    <div className="auth-layout">
      <div className="auth-card">
        {step && <div className="auth-step">{step}</div>}
        {backLink && <div className="auth-back-link">{backLink}</div>}
        <div className={`auth-content ${step ? 'auth-content-with-step' : ''} ${hasTitleAndSubtitle ? 'auth-content-normal' : ''}`.trim()}>
          {title && <h1 className="auth-title">{title}</h1>}
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}


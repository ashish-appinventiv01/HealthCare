import type { ReactNode } from 'react'

export function Card({ className = '', children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={`bg-white rounded-md ${className}`.trim()}>
      {children}
    </div>
  )
}



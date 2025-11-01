import { useState } from 'react'
import type { ChangeEventHandler, ReactNode } from 'react'

interface PasswordInputProps {
  label?: ReactNode
  value?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  placeholder?: string
  name?: string
}

export default function PasswordInput({ label = 'Password', value, onChange, placeholder = 'Enter password', name = 'password' }: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="field password-wrap">
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} name={name} className="input" type={visible ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} />
      <button type="button" className="password-toggle" onClick={() => setVisible(v => !v)}>{visible ? '🙈' : '👁️'}</button>
    </div>
  )
}


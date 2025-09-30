import { useState } from 'react'

export default function TextField({
  id,
  label,
  type = 'text',
  variant = 'filled',
  value,
  onChange,
  placeholder,
  fullWidth,
  InputProps,
  inputSx,
  containerClassName,
  inputClassName,
  sx,
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const isDate = type === 'date'
  const isLabelRaised = focused || value || isDate

  const containerStyle = {
    position: 'relative',
    width: fullWidth ? '100%' : 'auto',
    marginBottom: '24px',
    ...(sx || {}),
  }

  const labelStyle = {
    position: 'absolute',
    left: '7px',
    top: isLabelRaised ? '8px' : '20px',
    fontSize: isLabelRaised ? '12px' : '16px',
    color: focused ? '#4B575AB2' : '#666',
    transition: 'all 0.2s ease',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    padding: '0 4px',
    zIndex: 1,
  }

  const inputStyle = {
    width: '100%',
    padding: variant === 'filled'
      ? '30px 12px 8px 12px'
      : (isLabelRaised ? '24px 12px 10px 12px' : '16px 12px'),
    fontSize: '16px',
    border: '1px solid #BAC3C8',
    borderBottom: '1px solid #BAC3C8',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    outline: 'none',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    color: '#374151',
    paddingRight: InputProps?.endAdornment ? '48px' : '12px',
    ...(inputSx || {}),
  }

  const endAdornmentStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
  }

  return (
    <div style={containerStyle} className={containerClassName}>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={isDate ? (focused ? placeholder : '') : (focused ? placeholder : '')}
        style={inputStyle}
        className={inputClassName}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {InputProps?.endAdornment && <div style={endAdornmentStyle}>{InputProps.endAdornment}</div>}
    </div>
  )
}


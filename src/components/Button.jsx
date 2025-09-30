export default function Button({ children, onClick, type = 'button', disabled, full, className, style }) {
  const background = style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')
    ? style.backgroundColor
    : (disabled ? '#e0e0e0' : '#1976d2')

  const base = {
    width: full ? '100%' : undefined,
    padding: '16px',
    fontSize: '16px',
    fontWeight: 500,
    border: 'none',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    cursor: disabled ? 'not-allowed' : 'pointer',
    backgroundColor: background,
    color: disabled ? '#999' : '#fff',
    ...style,
  }

  const hasCustomBg = style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={base}
      onMouseEnter={(e) => {
        if (disabled) return
        if (!hasCustomBg) e.currentTarget.style.backgroundColor = '#1565c0'
      }}
      onMouseLeave={(e) => {
        if (disabled) return
        if (!hasCustomBg) e.currentTarget.style.backgroundColor = '#1976d2'
      }}
    >
      {children}
    </button>
  )
}


import ButtonMUI from '@mui/material/Button'

export default function Button({ children, onClick, type = 'button', disabled, full, className, style }) {
  const background = style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')
    ? style.backgroundColor
    : (disabled ? '#e0e0e0' : '#1976d2')

  const baseSx = {
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 500,
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    ...(disabled
      ? { backgroundColor: '#e0e0e0', color: '#999' }
      : {
          backgroundColor: background,
          color: '#fff',
          '&:hover': { backgroundColor: (style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')) ? background : '#1565c0' },
        }),
  }

  const hasCustomBg = style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')

  return (
    <ButtonMUI
      variant="contained"
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      fullWidth={!!full}
      style={style}
      sx={baseSx}
    >
      {children}
    </ButtonMUI>
  )
}


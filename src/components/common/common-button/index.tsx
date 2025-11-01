import ButtonMUI from '@mui/material/Button'
import type { SxProps } from '@mui/material/styles'
import type { ReactNode, MouseEvent, CSSProperties } from 'react'
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button'

type ButtonType = 'button' | 'reset' | 'submit'

interface CommonButtonProps {
  children?: ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: ButtonType
  variant?: MUIButtonProps['variant']
  disabled?: boolean
  full?: boolean
  className?: string
  style?: CSSProperties
}

export default function Button({ children, onClick, type = 'button', variant = 'contained', disabled, full, className, style }: CommonButtonProps) {
  const background = style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')
    ? style.backgroundColor
    : (disabled ? '#e0e0e0' : '#1976d2')

  const baseSx: SxProps = {
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
      variant={variant}
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


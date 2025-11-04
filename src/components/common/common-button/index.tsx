import ButtonMUI from '@mui/material/Button'
import type { SxProps } from '@mui/material/styles'
import { COLORS, SIZES } from '@/constants/ui-constant'
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
    : (disabled ? COLORS.disabledBackground : COLORS.primary)

  const baseSx: SxProps = {
    textTransform: 'none',
    fontSize: SIZES.buttonTextSize,
    fontWeight: 400,
    // borderRadius: SIZES.borderRadiusSm,
    height: '48px',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    backgroundColor: disabled ? COLORS.disabledBackground : background,
    color: disabled ? COLORS.white : COLORS.onPrimaryText,
    '&.Mui-disabled': {
      backgroundColor: COLORS.disabledBackground,
      color: COLORS.white,
    },
    ...(!disabled && {
      '&:hover': { backgroundColor: (style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')) ? background : COLORS.primaryHover },
    }),
  }

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


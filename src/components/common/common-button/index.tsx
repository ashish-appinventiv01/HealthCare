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
    fontSize: SIZES.paragraphSize,
    fontWeight: 500,
    borderRadius: SIZES.borderRadiusSm,
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
    ...(disabled
      ? { backgroundColor: COLORS.disabledBackground, color: COLORS.disabledText }
      : {
          backgroundColor: background,
          color: COLORS.onPrimaryText,
          '&:hover': { backgroundColor: (style && Object.prototype.hasOwnProperty.call(style, 'backgroundColor')) ? background : COLORS.primaryHover },
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


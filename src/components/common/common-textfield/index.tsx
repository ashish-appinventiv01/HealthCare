import TextField, { TextFieldProps } from '@mui/material/TextField'
import type { SxProps } from '@mui/material/styles'
import type { ReactNode } from 'react'
import { COLORS } from '@/constants/ui-constant'

interface MUITextFieldProps {
  label?: ReactNode
  value?: string | number
  onChange?: (value: string | number) => void
  placeholder?: string
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
  disabled?: boolean
  error?: boolean
  helperText?: ReactNode
  InputLabelProps?: TextFieldProps['InputLabelProps']
  InputProps?: TextFieldProps['InputProps']
  onClick?: React.MouseEventHandler<HTMLDivElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  readOnly?: boolean
  shrink?: boolean
  sx?: SxProps
}

export default function MUITextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error = false,
  helperText,
  InputLabelProps,
  InputProps,
  onClick,
  onFocus,
  onBlur,
  readOnly = false,
  shrink,
  sx,
}: MUITextFieldProps) {
  const computedShrink = typeof shrink === 'boolean'
    ? shrink
    : Boolean(value) || Boolean(placeholder)

  const mergedInputProps = {
    disableUnderline: true,
    ...(readOnly ? { readOnly: true } : {}),
    ...(InputProps || {}),
  }

  return (
    <TextField
      fullWidth
      size="medium"
      label={label ?? undefined}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      error={error}
      helperText={helperText}
      variant='filled'
      InputLabelProps={{ shrink: computedShrink, ...(InputLabelProps || {}) }}
      InputProps={mergedInputProps}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      sx={{
        '& .MuiFilledInput-root': {
          height: '55px',
          borderRadius: '8px',
          background: COLORS.surface,
          border: `1px solid ${error ? COLORS.error : COLORS.borderDefault}`,
          overflow: 'hidden',
        },
        // Tame autofill background inside MUI input
        '& .MuiFilledInput-input:-webkit-autofill, & .MuiFilledInput-input:-webkit-autofill:hover, & .MuiFilledInput-input:-webkit-autofill:focus': {
          WebkitBoxShadow: `0 0 0px 1000px ${COLORS.surface} inset`,
          boxShadow: `0 0 0px 1000px ${COLORS.surface} inset`,
          WebkitTextFillColor: COLORS.textPrimary,
          caretColor: COLORS.textPrimary,
          transition: 'background-color 9999s ease-out 0s',
        },
        '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': { display: 'none' },
        '& .MuiFilledInput-input': {
          padding: '20px 16px 1px 11px',
          color: COLORS.textPrimary,
          fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          textAlign: 'left',
        },
        '& .MuiFilledInput-input::placeholder': {
          color: COLORS.placeholderMuted,
          opacity: 1,
          fontSize: '14px',
          fontFamily: 'Poppins',
          fontWeight: 500,
          wordWrap: 'break-word',
        },
        '& .MuiInputLabel-root': {
          color: error ? COLORS.error : COLORS.labelMuted,
          fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          transform: 'translate(12px, 12px) scale(1)',
          textAlign: 'left',
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: error ? COLORS.error : COLORS.labelMuted,
        },
        '& .MuiInputLabel-shrink': {
          transform: 'translate(12px, 6px) scale(1)',
        },
        '& .MuiFilledInput-root.Mui-focused': { borderColor: error ? COLORS.error : COLORS.focusPrimary },
        ...(sx || {}),
      }}
    />
  )
}



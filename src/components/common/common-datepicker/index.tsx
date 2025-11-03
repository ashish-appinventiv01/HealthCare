import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import type { ReactNode } from 'react'
import type { TextFieldProps } from '@mui/material/TextField'
import { COLORS } from '@/constants/ui-constant'

interface DatePickerProps {
  label?: ReactNode
  value?: string | null
  onChange?: (value: string) => void
  minDate?: string
  maxDate?: string
  disabled?: boolean
  placeholder?: string
  InputLabelProps?: TextFieldProps['InputLabelProps']
  InputProps?: TextFieldProps['InputProps']
  error?: boolean
  helperText?: ReactNode
  shrink?: boolean
}

export default function DatePicker({
  label,
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  placeholder,
  InputLabelProps,
  InputProps,
  error = false,
  helperText,
  shrink,
}: DatePickerProps) {
  const dayValue = value ? dayjs(value) : null
  const computedShrink = typeof shrink === 'boolean'
    ? shrink
    : Boolean(value) || Boolean(placeholder)

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MUIDatePicker
        label={label}
        value={dayValue}
        onChange={(d) => onChange?.(d ? d.format('YYYY-MM-DD') : '')}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'medium',
            variant: 'filled',

            placeholder,
            error,
            helperText,
            InputLabelProps: { shrink: computedShrink, ...(InputLabelProps || {}) },
            InputProps: { disableUnderline: true, ...(InputProps || {}) },
            sx: {

              ".MuiPickersInputBase-root": {
                backgroundColor: `${COLORS.white} !important`,
                borderRadius: '8px',
                border: `1px solid ${COLORS.borderDefault}`,
              },
              '& .MuiFilledInput-root': {
                height: '55px',
                borderRadius: '8px',
                background: COLORS.white,
                backgroundColor: `${COLORS.white} !important`,
                border: `1px solid ${COLORS.borderDefault}`,
                overflow: 'hidden',
              },
              '& .MuiFilledInput-root:hover': {
                backgroundColor: `${COLORS.white} !important`,
              },
              '& .MuiFilledInput-root.Mui-focused': {
                backgroundColor: `${COLORS.white} !important`,
                borderColor: COLORS.focusPrimary,
              },
              '& .MuiFilledInput-root.Mui-disabled': {
                backgroundColor: `${COLORS.white} !important`,
              },
              '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': { display: 'none' },
              '& .MuiFilledInput-input': {
                padding: '20px 16px 12px 11px',
                color: COLORS.textPrimary,
                fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                textAlign: 'left',
              },
              '& .MuiFilledInput-input:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0px 1000px ${COLORS.white} inset`,
                WebkitTextFillColor: COLORS.textPrimary,
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
                color: COLORS.labelMuted,
                fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                transform: 'translate(12px, 12px) scale(1)',
                textAlign: 'left',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(12px, 6px) scale(1)',
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}



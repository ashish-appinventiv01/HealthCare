import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

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
}) {
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
                backgroundColor: '#FFFFFF !important',
                borderRadius: '8px',
                border: '1px solid #BAC3C8',
              },
              '& .MuiFilledInput-root': {
                height: '55px',
                borderRadius: '8px',
                background: '#FFFFFF',
                backgroundColor: '#FFFFFF !important',
                border: '1px solid #BAC3C8',
                overflow: 'hidden',
              },
              '& .MuiFilledInput-root:hover': {
                backgroundColor: '#FFFFFF !important',
              },
              '& .MuiFilledInput-root.Mui-focused': {
                backgroundColor: '#FFFFFF !important',
                borderColor: '#2483C5',
              },
              '& .MuiFilledInput-root.Mui-disabled': {
                backgroundColor: '#FFFFFF !important',
              },
              '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': { display: 'none' },
              '& .MuiFilledInput-input': {
                padding: '20px 16px 12px 11px',
                color: '#1A1A1A',
                fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                textAlign: 'left',
              },
              '& .MuiFilledInput-input:-webkit-autofill': {
                WebkitBoxShadow: '0 0 0px 1000px #FFFFFF inset',
                WebkitTextFillColor: '#1A1A1A',
              },
              '& .MuiFilledInput-input::placeholder': {
                color: 'rgba(26, 26, 26, 0.20)',
                opacity: 1,
                color: 'rgba(25.50, 25.50, 25.50, 0.20)',
                fontSize: '14px',
                fontFamily: 'Poppins',
                fontWeight: 500,
                wordWrap: 'break-word',
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(75, 87, 90, 0.70)',
                fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
                fontSize: '10px',
                fontWeight: 500,
                transform: 'translate(12px, 12px) scale(1)',
                textAlign: 'left',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(12px, 6px) scale(1)',
              },
              '& .MuiFilledInput-root.Mui-focused': { borderColor: '#2483C5' },
            },
          },
        }}
      />
    </LocalizationProvider>
  )
}



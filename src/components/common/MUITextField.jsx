import TextField from '@mui/material/TextField'

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
  readOnly = false,
  shrink,
}) {
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
      sx={{
        '& .MuiFilledInput-root': {
          height: '55px',
          borderRadius: '8px',
          background: '#FBFBFB',
          border: '1px solid #BAC3C8',
          overflow: 'hidden',
        },
        // Tame autofill background inside MUI input
        '& .MuiFilledInput-input:-webkit-autofill, & .MuiFilledInput-input:-webkit-autofill:hover, & .MuiFilledInput-input:-webkit-autofill:focus': {
          WebkitBoxShadow: '0 0 0px 1000px #FBFBFB inset',
          boxShadow: '0 0 0px 1000px #FBFBFB inset',
          WebkitTextFillColor: '#1A1A1A',
          caretColor: '#1A1A1A',
          transition: 'background-color 9999s ease-out 0s',
        },
        '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': { display: 'none' },
        '& .MuiFilledInput-input': {
          padding: '20px 16px 1px 11px',
          color: '#1A1A1A',
          fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          textAlign: 'left',
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
      }}
    />
  )
}



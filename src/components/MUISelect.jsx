import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'

export default function MUISelect({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  disabled = false,
  error = false,
  helperText,
  InputLabelProps,
  InputProps,
  SelectProps,
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

  const mergedSelectProps = {
    displayEmpty: Boolean(placeholder),
    renderValue: (selected) => {
      if ((selected === undefined || selected === '' || selected === null) && placeholder) {
        return placeholder
      }
      return selected
    },
    ...(SelectProps || {}),
  }

  return (
    <TextField
      select
      fullWidth
      size="medium"
      label={label ?? undefined}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      error={error}
      helperText={helperText}
      variant='filled'
      InputLabelProps={{ shrink: computedShrink, ...(InputLabelProps || {}) }}
      InputProps={mergedInputProps}
      SelectProps={mergedSelectProps}
      sx={{
        '& .MuiFilledInput-root': {
          height: '55px',
          borderRadius: '8px',
          background: '#FBFBFB',
          border: '1px solid #BAC3C8',
          overflow: 'hidden',
        },
        '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': { display: 'none' },
        '& .MuiFilledInput-input, & .MuiSelect-select': {
          padding: '20px 16px 1px 11px',
          color: '#1A1A1A',
          fontFamily: 'Poppins, -apple-system, Roboto, Helvetica, sans-serif',
          fontSize: '12px',
          fontWeight: 500,
          textAlign: 'left',
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
        '& .MuiSelect-select.Mui-disabled': {
          WebkitTextFillColor: 'inherit',
        },
        '& .MuiSelect-select:has(+ input[hidden][value=""])': {
          color: 'rgba(26, 26, 26, 0.20)',
        },
      }}
    >
      {options.map((opt) => {
        const optionValue = typeof opt === 'string' ? opt : opt.value
        const optionLabel = typeof opt === 'string' ? opt : opt.label
        return (
          <MenuItem key={optionValue} value={optionValue}>
            {optionLabel}
          </MenuItem>
        )
      })}
    </TextField>
  )
}



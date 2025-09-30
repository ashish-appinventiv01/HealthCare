import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function PreferenceItem({ label, checked, onChange }) {
  return (
    <Box
      component="label"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <span>{label}</span>
      <FormControlLabel
        sx={{ margin: 0 }}
        label=""
        control={
          <Checkbox
            checked={checked}
            onChange={(e) => onChange?.(e.target.checked)}
            sx={{
              padding: 0,
              color: '#e5e7eb',
              '&.Mui-checked': { color: '#2483C5' },
            }}
          />
        }
      />
    </Box>
  )
}



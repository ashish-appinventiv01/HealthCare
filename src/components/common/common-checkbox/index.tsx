import Checkbox from '@mui/material/Checkbox'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import type { SxProps } from '@mui/material/styles'
import type { CSSProperties } from 'react'
import { COLORS } from '@/constants/ui-constant'

interface CommonCheckboxProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  indeterminate?: boolean
  size?: 'small' | 'medium'
  className?: string
  style?: CSSProperties
  sx?: SxProps
  shape?: 'circle' | 'square'
}

export default function CommonCheckbox({
  checked,
  onChange,
  disabled,
  indeterminate,
  size = 'medium',
  className,
  style,
  sx,
  shape = 'circle',
}: CommonCheckboxProps) {
  const uncheckedIcon = shape === 'square' ? <CheckBoxOutlineBlankIcon /> : <RadioButtonUncheckedIcon />
  const checkedStateIcon = shape === 'square' ? <CheckBoxIcon /> : <CheckCircleIcon />
  const indeterminateStateIcon = shape === 'square' ? <IndeterminateCheckBoxIcon /> : <RadioButtonUncheckedIcon />
  return (
    <Checkbox
      checked={!!checked}
      onChange={(e) => onChange?.(e.target.checked)}
      disabled={disabled}
      indeterminate={indeterminate}
      size={size}
      className={className}
      style={style}
      sx={{
        color: '#53A5D4',
        '& .MuiSvgIcon-root': { fontSize: size === 'small' ? 18 : 22 },
        '&.Mui-checked': { color: COLORS.primary },
        '&.MuiCheckbox-indeterminate': { color: COLORS.primary },
        ...sx,
      }}
      icon={uncheckedIcon}
      checkedIcon={checkedStateIcon}
      indeterminateIcon={indeterminateStateIcon}
    />
  )
}



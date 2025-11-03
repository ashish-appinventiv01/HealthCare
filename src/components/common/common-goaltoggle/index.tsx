import type { MouseEventHandler } from 'react'
import { COLORS } from '@/constants/ui-constant'

interface GoalToggleProps {
  label: string
  checked: boolean
  onChange?: MouseEventHandler<HTMLButtonElement>
  isLast?: boolean
}

export function GoalToggle({ label, checked, onChange, isLast }: GoalToggleProps) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 48px',
      alignItems: 'center',
      gap: 16,
      padding: '12px 8px',
      borderBottom: isLast ? 'none' : `1px solid ${COLORS.borderDefault}`
    }}>
      <label htmlFor={label} style={{ fontSize: 14, color: COLORS.textPrimary, cursor: 'pointer' }}>
        {label}
      </label>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button
          id={label}
          role="switch"
          aria-checked={checked}
          onClick={onChange}
          style={{
            position: 'relative',
            width: 36,
            height: 20,
            borderRadius: 999,
            background: checked ? COLORS.focusPrimary : COLORS.gray200,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <span style={{
            position: 'absolute',
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            background: COLORS.white,
            borderRadius: '50%',
            boxShadow: `0 1px 3px ${COLORS.shadowMuted}`
          }} />
        </button>
      </div>
    </div>
  );
}

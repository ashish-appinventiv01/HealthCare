export function GoalToggle({ label, checked, onChange, isLast }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 48px',
      alignItems: 'center',
      gap: 16,
      padding: '12px 8px',
      borderBottom: isLast ? 'none' : '1px solid #F0F2F5'
    }}>
      <label htmlFor={label} style={{ fontSize: 14, color: '#191919', cursor: 'pointer' }}>
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
            background: checked ? '#2483C5' : '#E5E7EB',
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
            background: '#fff',
            borderRadius: '50%',
            boxShadow: '0 1px 3px rgba(0,0,0,.2)'
          }} />
        </button>
      </div>
    </div>
  );
}

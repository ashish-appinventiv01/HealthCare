export default function IconButton({ children, onClick, type = 'button', ...props }) {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    >
      {children}
    </button>
  )}


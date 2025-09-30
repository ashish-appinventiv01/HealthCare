export default function EyeOff({ size = 20, color = '#6b7280' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 3l18 18" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M21 12c0-1.5-3.5-7-9-7-2.1 0-3.9.6-5.3 1.5M3 12c0 1.5 3.5 7 9 7 2.1 0 3.9-.6 5.3-1.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8.5 8.5A3.5 3.5 0 0012 15.5c.7 0 1.4-.2 2-.6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}


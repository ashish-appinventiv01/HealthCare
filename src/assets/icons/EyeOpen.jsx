export default function EyeOpen({ size = 20, color = '#6b7280' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 5c-5.5 0-9 5.5-9 7s3.5 7 9 7 9-5.5 9-7-3.5-7-9-7Z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3.5" stroke={color} strokeWidth="1.8"/>
    </svg>
  )
}


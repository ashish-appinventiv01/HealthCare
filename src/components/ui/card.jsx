export function Card({ className = '', children }) {
  return (
    <div className={`bg-white rounded-md ${className}`.trim()}>
      {children}
    </div>
  )
}



import React from 'react'

function CommonLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ width: '32px', height: '32px', border: '3px solid #E5E7EB', borderTopColor: '#3B82F6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  )
}

export default CommonLoader



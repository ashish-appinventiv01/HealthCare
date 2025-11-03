import React from 'react'
import { COLORS } from '@/constants/ui-constant'

function CommonLoader() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div style={{ width: '32px', height: '32px', border: `3px solid ${COLORS.gray200}`, borderTopColor: COLORS.accentBlue, borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
    </div>
  )
}

export default CommonLoader



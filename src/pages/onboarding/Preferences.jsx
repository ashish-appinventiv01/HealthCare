import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import Button from '../../components/Button.jsx'

export default function Preferences() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({ period: false, fertility: false, deviations: false })
  const canSave = Object.values(prefs).some(Boolean)

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  return (
    <AuthLayout>
      <div style={{ marginBottom: 16, color: '#6b7280' }}>Step 3 of 3</div>
      <h1 style={{ margin: 0 }}>Your Preference</h1>
      <p style={{ color: '#6b7280', marginTop: 8 }}>Please select all the preferences that apply</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <span>Period predictions</span>
          <input type="checkbox" checked={prefs.period} onChange={() => toggle('period')} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <span>Fertility status estimation</span>
          <input type="checkbox" checked={prefs.fertility} onChange={() => toggle('fertility')} />
        </label>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <span>Cycle deviation detection</span>
          <input type="checkbox" checked={prefs.deviations} onChange={() => toggle('deviations')} />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <Button onClick={() => navigate('/onboarding/step-2')} style={{ width: 200 }}>Back</Button>
        <Button onClick={() => navigate('/login')} disabled={!canSave} style={{ width: 200 }}>Save</Button>
      </div>
    </AuthLayout>
  )
}



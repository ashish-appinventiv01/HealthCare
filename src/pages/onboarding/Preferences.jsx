import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import Button from '../../components/common/Button.jsx'
import PreferenceItem from '../../components/PreferenceItem.jsx'

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

      <div style={{ marginTop: 24, display: 'grid', gap: 12 , width: '69%'}}>
        <PreferenceItem
          label="Period predictions"
          checked={prefs.period}
          onChange={() => toggle('period')}
        />
        <PreferenceItem
          label="Fertility status estimation"
          checked={prefs.fertility}
          onChange={() => toggle('fertility')}
        />
        <PreferenceItem
          label="Cycle deviation detection"
          checked={prefs.deviations}
          onChange={() => toggle('deviations')}
        />
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <Button onClick={() => navigate('/onboarding/step-2')} style={{ width: 200 }}>Back</Button>
        <Button onClick={() => navigate('/login')} disabled={!canSave} style={{ width: 200 }}>Save</Button>
      </div>
    </AuthLayout>
  )
}



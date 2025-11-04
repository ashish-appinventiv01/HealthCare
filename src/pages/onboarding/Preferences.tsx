import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import Button from '@components/common/common-button'
import PreferenceItem from '@/components/preferenceItemCheckbox'
import ROUTES from '@routes/routes'

export default function Preferences() {
  const navigate = useNavigate()
  const [prefs, setPrefs] = useState({ period: false, fertility: false, deviations: false })
  const canSave = Object.values(prefs).some(Boolean)

  const toggle = (key: keyof typeof prefs) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  return (
    <AuthLayout
      step="Step 3 of 4"
      title="Your Preferences"
      subtitle="Please select all the preferences that apply."
    >
      <div className="ob-parent">
        <div className="ob-fields">
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

        <div className="ob-actions">
          <Button onClick={() => navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_2)} style={{ width: 200 }}>Back</Button>
          <Button onClick={() => navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_4)} disabled={!canSave} style={{ width: 200 }}>Save</Button>
        </div>
      </div>
    </AuthLayout>
  )
}



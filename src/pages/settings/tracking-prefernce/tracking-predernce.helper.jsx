import { useMemo, useState } from 'react'

export default function useTrackingPreferenceHelper() {
  const [preferences, setPreferences] = useState({
    basalBodyTemperature: true,
    fshTestResult: true,
    lhTestResult: true,
    estrogenLevelTest: false,
    progesteroneTestResult: false,
    insightsWithHcp: false
  })

  const toggle = (key) => {
    setPreferences((p) => ({ ...p, [key]: !p[key] }))
  }

  const items = useMemo(() => ([
    { key: 'basalBodyTemperature', label: 'Basal Body Temperature' },
    { key: 'fshTestResult', label: 'FSH Test Result' },
    { key: 'lhTestResult', label: 'LH Test Result' },
    { key: 'estrogenLevelTest', label: 'Estrogen Level Test' },
    { key: 'progesteroneTestResult', label: 'Progesterone Test Result' },
    { key: 'insightsWithHcp', label: 'My Insights with HCP' }
  ]), [])

  return {
    preferences,
    toggle,
    items
  }
}



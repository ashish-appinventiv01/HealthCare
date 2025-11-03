import { useMemo, useState } from 'react'
import type { PreferencesState, PreferenceKey, PreferenceItem, UseTrackingPreferenceHelperReturn } from './tracking-preference.interface'

export default function useTrackingPreferenceHelper(): UseTrackingPreferenceHelperReturn {
  const [preferences, setPreferences] = useState<PreferencesState>({
    basalBodyTemperature: true,
    fshTestResult: true,
    lhTestResult: true,
    estrogenLevelTest: false,
    progesteroneTestResult: false,
    insightsWithHcp: false,
  })

  const toggle = (key: PreferenceKey) => {
    setPreferences(p => ({ ...p, [key]: !p[key] }))
  }

  const items: PreferenceItem[] = useMemo(() => ([
    { key: 'basalBodyTemperature', label: 'Basal Body Temperature' },
    { key: 'fshTestResult', label: 'FSH Test Result' },
    { key: 'lhTestResult', label: 'LH Test Result' },
    { key: 'estrogenLevelTest', label: 'Estrogen Level Test' },
    { key: 'progesteroneTestResult', label: 'Progesterone Test Result' },
    { key: 'insightsWithHcp', label: 'My Insights with HCP' },
  ]), [])

  return { preferences, toggle, items }
}





export type PreferenceKey =
  | 'basalBodyTemperature'
  | 'fshTestResult'
  | 'lhTestResult'
  | 'estrogenLevelTest'
  | 'progesteroneTestResult'
  | 'insightsWithHcp'

export type PreferencesState = Record<PreferenceKey, boolean>

export type PreferenceItem = { key: PreferenceKey; label: string }

export type UseTrackingPreferenceHelperReturn = {
  preferences: PreferencesState
  toggle: (key: PreferenceKey) => void
  items: PreferenceItem[]
}



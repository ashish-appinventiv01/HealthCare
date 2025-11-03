import { useState } from 'react'
import type { LanguageCode, UseLanguagePreferenceHelperReturn } from './language-prefernce.interface'

export default function useLanguagePreferenceHelper(): UseLanguagePreferenceHelperReturn {
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try {
      return localStorage.getItem('app_language') || 'en'
    } catch {
      return 'en'
    }
  })

  const handleChange: UseLanguagePreferenceHelperReturn['handleChange'] = (value) => {
    setLanguage(value)
    try {
      localStorage.setItem('app_language', value)
    } catch {}
  }

  return {
    language,
    handleChange,
    setLanguage,
  }
}





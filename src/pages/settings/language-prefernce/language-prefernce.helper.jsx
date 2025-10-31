import { useState } from 'react'

export default function useLanguagePreferenceHelper() {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('app_language') || 'en'
    } catch {
      return 'en'
    }
  })

  const handleChange = (value) => {
    setLanguage(value)
    try {
      localStorage.setItem('app_language', value)
    } catch {}
  }

  return {
    language,
    handleChange,
    setLanguage
  }
}



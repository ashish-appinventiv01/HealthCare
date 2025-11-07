import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@routes/routes'

export function useLanguageSelection() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  function handleContinue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      localStorage.setItem('app_language', language)
    } catch {}
    navigate(ROUTES.FEATURE_ROUTES.SPLASH)
  }

  return { language, setLanguage, handleContinue }
}



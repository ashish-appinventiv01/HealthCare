import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'

export default function LanguageSelect() {
  const navigate = useNavigate()
  const [language, setLanguage] = useState('en')

  function handleContinue(e) {
    e.preventDefault()
    // Persist selection if needed later
    try {
      localStorage.setItem('app_language', language)
    } catch {}
    navigate('/login')
  }

  return (
    <AuthLayout
      title="Choose Your Language"
      subtitle="We've set your language to English. Do you want to continue or switch to Español?"
      contentClassName="lang-panel"
    >
      <form onSubmit={handleContinue} className="lang-form">
        <div className="lang-options">
          <label className="lang-option">
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === 'en'}
              onChange={() => setLanguage('en')}
            />
            <span>English</span>
          </label>
          <label className="lang-option">
            <input
              type="radio"
              name="language"
              value="es"
              checked={language === 'es'}
              onChange={() => setLanguage('es')}
            />
            <span>Español</span>
          </label>
        </div>

        <p className="lang-note">You can change this later in the settings.</p>

        <div className="lang-actions">
          <button type="submit" className="btn primary" style={{ width: '100%' }}>
            Continue
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}



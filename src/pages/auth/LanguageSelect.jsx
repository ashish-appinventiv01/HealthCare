import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'

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
          <FormControl component="fieldset">
            <RadioGroup
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              sx={{ gap: 2 }}
            >
              <FormControlLabel
                value="en"
                control={<Radio />}
                label={
                  <Typography variant="body1" sx={{ fontWeight: language === 'en' ? 500 : 400 }}>
                    English
                  </Typography>
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '16px',
                    color: language === 'en' ? '#1976d2' : '#666'
                  }
                }}
              />
              <FormControlLabel
                value="es"
                control={<Radio />}
                label={
                  <Typography variant="body1" sx={{ fontWeight: language === 'es' ? 500 : 400 }}>
                    Español
                  </Typography>
                }
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontSize: '16px',
                    color: language === 'es' ? '#1976d2' : '#666'
                  }
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <Typography variant="body2" sx={{ color: '#666', marginTop: 3, marginBottom: 3, textAlign: 'left' }}>
          You can change this later in the settings.
        </Typography>

        <div className="lang-actions">
          <button type="submit" className="btn primary" style={{ width: '100%' }}>
            Continue
          </button>
        </div>
      </form>
    </AuthLayout>
  )
}



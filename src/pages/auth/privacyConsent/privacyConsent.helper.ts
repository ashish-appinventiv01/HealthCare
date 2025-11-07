import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@routes/routes'

export function usePrivacyConsent(totalOptions?: number) {
  const [selectedConsents, setSelectedConsents] = useState<Set<string>>(new Set())
  const navigate = useNavigate()

  const handleConsentChange = (consentId: string) => {
    setSelectedConsents((prev) => {
      const next = new Set(prev)
      if (next.has(consentId)) {
        next.delete(consentId)
      } else {
        next.add(consentId)
      }
      return next
    })
  }

  const handleContinue = () => {
    navigate(ROUTES.AUTH_ROUTES.LOGIN)
  }

  const allConsentsSelected = typeof totalOptions === 'number' ? selectedConsents.size === totalOptions : undefined

  return { selectedConsents, handleConsentChange, handleContinue, allConsentsSelected }
}



import { useMemo } from 'react'
import type { UseManageConsentHelperReturn } from './manage-consent.interface'

export default function useManageConsentHelper(): UseManageConsentHelperReturn {
  const consentItems = useMemo(() => ([
    {
      title: 'Privacy Policy Agreement',
      description:
        'I have read and agree to the privacy policy regarding how my personal data will be processed.'
    },
    {
      title: 'Data Collection Consent',
      description:
        'I consent to the collection and processing of my cycle and health data for app functionality.'
    },
    {
      title: 'Sensitive Health Information',
      description:
        'I understand that I will be logging sensitive health information and consent to its secure storage.'
    },
    {
      title: 'Terms of Service',
      description:
        'I agree to the terms of service and understand my rights regarding data deletion and access.'
    }
  ]), [])

  return {
    consentItems
  }
}





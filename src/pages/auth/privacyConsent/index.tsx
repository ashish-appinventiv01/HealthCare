import AuthLayout from '@layouts/authLayout'
import Button from '@components/common/common-button'
import Checkbox from '@components/common/common-checkbox'
import ROUTES from '@routes/routes'
import { usePrivacyConsent } from './privacyConsent.helper'

const CONSENT_OPTIONS = [
    {
        id: 'privacy-policy',
        title: 'Privacy Policy Agreement',
        description: 'I have read and agree to the privacy policy regarding how my personal data will be processed.'
    },
    {
        id: 'data-collection',
        title: 'Data Collection Consent',
        description: 'I consent to the collection and processing of my cycle and health data for app functionality.'
    },
    {
        id: 'sensitive-health',
        title: 'Sensitive Health Information',
        description: 'I understand that I will be logging sensitive health information and consent to its secure storage.'
    },
    {
        id: 'terms-of-service',
        title: 'Terms of Service',
        description: 'I agree to the terms of service and understand my rights regarding data deletion and access.'
    }
]

export default function PrivacyConsent() {
    const { selectedConsents, handleConsentChange, handleContinue } = usePrivacyConsent(CONSENT_OPTIONS.length)

    return (
        <AuthLayout>
            {/* Page container with card-like styling (self-contained, no layout props) */}
            <div className="prvc-page privacy-consent">
                {/* Title and subtitle rendered locally (nothing passed via props) */}
                <div >
                    <h1
                        className='auth-title'
                    >
                        Privacy & Consent
                    </h1>
                    <p
                        className='auth-subtitle'
                    >
                        Your privacy matters. Please review and accept our terms to continue.
                    </p>
                </div>

                <div className="consent-list">
                    {CONSENT_OPTIONS.map((option) => (
                        <label
                            key={option.id}
                            className="consent-item"
                        >
                            <Checkbox
                                checked={selectedConsents.has(option.id)}
                                onChange={() => handleConsentChange(option.id)}
                                size="medium"
                            />
                            <div className="consent-item__content">
                                <div className="consent-item__title">
                                    {option.title}
                                </div>
                                <div
                                    className='sub'
                                >
                                    {option.description}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

                <div className="divider" />

                <div className="footer">
                    <div className="sub">
                        You can withdraw your consent at any time in the app settings. Your data will be securely deleted upon request.
                    </div>
                    <Button
                        onClick={handleContinue}

                        full

                    >
                        Continue
                    </Button>
                </div>
            </div>
        </AuthLayout>
    )
}


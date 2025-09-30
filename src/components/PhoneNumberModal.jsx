import { useState, useEffect } from 'react'
import PhoneVerificationModal from './PhoneVerificationModal.jsx'
import MUITextField from './MUITextField.jsx'
import InputAdornment from '@mui/material/InputAdornment'
import Popper from '@mui/material/Popper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'

const COUNTRY_OPTIONS = [
  { code: '+1', name: 'US/Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+86', name: 'China' },
  { code: '+49', name: 'Germany' },
  { code: '+33', name: 'France' },
  { code: '+81', name: 'Japan' }
]

export default function PhoneNumberModal({ open, onClose, onVerify, initialValue = '' }) {
  const [countryCode, setCountryCode] = useState('+1')
  const [phoneNumber, setPhoneNumber] = useState(initialValue)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('')
  const [countryAnchorEl, setCountryAnchorEl] = useState(null)

  useEffect(() => {
    if (open) {
      if (initialValue) {
        const matchedCountry = COUNTRY_OPTIONS.find((country) => initialValue.startsWith(country.code))
        if (matchedCountry) {
          setCountryCode(matchedCountry.code)
          setPhoneNumber(initialValue.slice(matchedCountry.code.length))
        } else {
          setCountryCode('+1')
          setPhoneNumber(initialValue)
        }
      } else {
        setCountryCode('+1')
        setPhoneNumber('')
      }
    }
  }, [open, initialValue])


  const handleVerify = () => {
    if (phoneNumber.trim()) {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`
      setCurrentPhoneNumber(fullPhoneNumber)
      setShowVerificationModal(true)
    }
  }

  const handleClose = () => {
    setPhoneNumber('')
    setShowCountryDropdown(false)
    setShowVerificationModal(false)
    setCurrentPhoneNumber('')
    onClose()
  }

  const handleVerificationSuccess = (verificationCode) => {
    console.log('Verification code:', verificationCode)
    onVerify(currentPhoneNumber)
    handleClose()
  }

  const handleVerificationClose = () => {
    setShowVerificationModal(false)
  }

  const isValidPhone = phoneNumber.trim().length >= 10

  const DropdownIcon = () => (
    <svg width="10" height="6" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.17719 5.91141L0.206445 1.37271C-0.262163 0.838692 0.118684 3.04434e-07 0.829874 3.04434e-07H8.77136C8.93053 -0.000136161 9.08636 0.0456088 9.22019 0.131757C9.35403 0.217906 9.46019 0.340806 9.52598 0.48574C9.59176 0.630674 9.61437 0.791498 9.59111 0.948953C9.56784 1.10641 9.49968 1.25382 9.39479 1.37353L5.42405 5.91058C5.34634 5.99951 5.2505 6.07078 5.14297 6.11961C5.03545 6.16845 4.91872 6.19371 4.80062 6.19371C4.68252 6.19371 4.56579 6.16845 4.45826 6.11961C4.35073 6.07078 4.2549 5.99951 4.17719 5.91058V5.91141Z" fill="#1A1A1A"/>
    </svg>
  )

  if (!open && !showVerificationModal) return null

  return (
    <>
      {open && !showVerificationModal && (
        <div className="phone-modal-backdrop" onClick={handleClose}>
          <div className="phone-modal" onClick={(e) => e.stopPropagation()}>
            <div className="phone-modal-content">
              <h3 className="phone-modal-title">Add Phone Number</h3>

              <div className="phone-input-container">
                <label className="phone-input-label">Phone Number</label>
                <div className="phone-input-wrapper">
                  <div style={{ flex: 1 }}>
                    <MUITextField
                      type="tel"
                      label={"Add Phone Number"}
                      value={phoneNumber}
                      onChange={setPhoneNumber}
                      placeholder="Enter Phone Number"
                      sx={{
                        '& .MuiFilledInput-root': { overflow: 'visible' },
                      }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" disablePointerEvents={false} onMouseDown={(e) => e.preventDefault()}>
                            <div
                              className="country-code-selector"
                              onClick={(e) => { setCountryAnchorEl(e.currentTarget); setShowCountryDropdown((p) => !p) }}
                              style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 8, paddingRight: 8, cursor: 'pointer', borderRight: '1px solid #E5E9EB', height: '100%' }}
                            >
                              <span className="country-code">{countryCode}</span>
                              <DropdownIcon />
                            </div>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Popper open={showCountryDropdown} anchorEl={countryAnchorEl} placement="bottom-start" style={{ zIndex: 1600 }}>
                      <ClickAwayListener onClickAway={() => setShowCountryDropdown(false)}>
                        <Paper elevation={3} sx={{ mt: 1, maxHeight: 240, overflowY: 'auto', borderRadius: '8px' }}>
                          <div className="country-dropdown" style={{ position: 'relative', top: 0, left: 0, zIndex: 'auto' }}>
                            {COUNTRY_OPTIONS.map((country) => (
                              <div
                                key={country.code}
                                className="country-option"
                                onClick={() => {
                                  setCountryCode(country.code)
                                  setShowCountryDropdown(false)
                                }}
                              >
                                <span>{country.code} {country.name}</span>
                              </div>
                            ))}
                          </div>
                        </Paper>
                      </ClickAwayListener>
                    </Popper>
                  </div>
                </div>
              </div>

              <div className="phone-modal-actions">
                <button className="phone-modal-button cancel" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className={`phone-modal-button verify ${isValidPhone ? 'enabled' : 'disabled'}`}
                  onClick={handleVerify}
                  disabled={!isValidPhone}
                >
                  Verify Phone Number
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PhoneVerificationModal
        open={showVerificationModal}
        onClose={handleVerificationClose}
        onConfirm={handleVerificationSuccess}
        phoneNumber={currentPhoneNumber}
      />
    </>
  )
}

import { useState, useRef, useEffect } from 'react'

export default function PhoneVerificationModal({ open, onClose, onConfirm, phoneNumber }) {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (open) {
      setCode(['', '', '', '', '', ''])
      // Focus first input when modal opens
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus()
        }
      }, 100)
    }
  }, [open])

  const handleInputChange = (index, value) => {
    // Only allow single digit
    if (value.length > 1) return

    const newCode = [...code]
    newCode[index] = value

    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6)
    
    if (pastedData) {
      const newCode = Array(6).fill('').map((_, i) => pastedData[i] || '')
      setCode(newCode)
      
      // Focus the next empty input or last input
      const nextIndex = Math.min(pastedData.length, 5)
      inputRefs.current[nextIndex]?.focus()
    }
  }

  const handleConfirm = async () => {
    const verificationCode = code.join('')
    if (verificationCode.length === 6) {
      setIsLoading(true)
      try {
        await onConfirm(verificationCode)
        handleClose()
      } catch (error) {
        console.error('Verification failed:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleResendCode = () => {
    // Reset code and show loading state
    setCode(['', '', '', '', '', ''])
    console.log('Resending code to:', phoneNumber)
    // Here you would typically call an API to resend the code
  }

  const handleClose = () => {
    setCode(['', '', '', '', '', ''])
    setIsLoading(false)
    onClose()
  }

  const isCodeComplete = code.every(digit => digit !== '') && code.join('').length === 6

  if (!open) return null

  return (
    <div className="phone-modal-backdrop" onClick={handleClose}>
      <div className="phone-verification-modal" onClick={(e) => e.stopPropagation()}>
        <div className="phone-verification-content">
          <h3 className="phone-verification-title">Verify Phone Number</h3>
          <p className="phone-verification-subtitle">
            Please enter the code sent to your phone number.
          </p>

          <div className="verification-code-container">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength="1"
                className="verification-code-input"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="phone-verification-actions">
            <button className="phone-modal-button cancel" onClick={handleClose} disabled={isLoading}>
              Cancel
            </button>
            <button 
              className={`phone-modal-button verify ${isCodeComplete ? 'enabled' : 'disabled'}`}
              onClick={handleConfirm}
              disabled={!isCodeComplete || isLoading}
            >
              {isLoading ? 'Confirming...' : 'Confirm Code'}
            </button>
          </div>

          <div className="resend-code-section">
            <span className="resend-text">Didn't get a code?</span>
            <button className="resend-link" onClick={handleResendCode} disabled={isLoading}>
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailLogo from '../assets/Images/email_logo.png'

export default function HelpSupport() {
  const navigate = useNavigate()
  const [issueText, setIssueText] = useState('')

  const handleSendIssue = () => {
    // Here you would typically send the issue to your backend
    console.log('Issue submitted:', issueText)
    // For now, just show an alert
    alert('Issue submitted successfully! We will get back to you soon.')
    setIssueText('')
  }

  const handleFAQsClick = () => {
    navigate('/faqs')
  }

  return (
    <div className="help-support-container">
      <div className="help-support-content">
        <h1 className="help-support-title">Contact Us</h1>
        <p className="help-support-subtitle">How can we help you?</p>
        
        <p className="help-support-instruction">
          Before reaching out to us check out our{' '}
          <span className="faq-link" onClick={handleFAQsClick}>
            FAQ's
          </span>
        </p>

        <div className="support-sections">
          {/* Support Email Section */}
          <div className="support-email-section">
            <div className="email-logo-container">
              <img src={emailLogo} alt="Email" className="email-icon" />
            </div>
            <div className="email-content-container">
              <h3 className="section-title">Support Email</h3>
              <p className="email-address">admin@cwcnfp.com</p>
            </div>
          </div>

          {/* Issue Submission Section */}
          <div className="issue-submission-section">
            <p className="issue-description">
              You can write your issue and it will be sent to the admin to get resolved
            </p>
            <textarea
              className="issue-textarea"
              placeholder="Please write your issue here"
              value={issueText}
              onChange={(e) => setIssueText(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <div className="send-button-container">
          <button 
            className="send-button"
            onClick={handleSendIssue}
            disabled={!issueText.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

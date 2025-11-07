import useHelpSupportHelper from './help&Support.helper'
import { EmailLogo } from '@assets/index'

export default function HelpSupport() {
  const { issueText, setIssueText, handleSendIssue, handleFAQsClick } = useHelpSupportHelper()

  return (
    <div className="home-container">
    
        <h1 className="title-style">Contact Us</h1>
       
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
              <img src={EmailLogo} alt="Email" className="email-icon" />
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
 
  )
}

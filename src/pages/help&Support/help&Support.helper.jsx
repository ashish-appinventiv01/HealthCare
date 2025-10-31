import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routes.jsx'
export default function useHelpSupportHelper() {
  const navigate = useNavigate()
  const [issueText, setIssueText] = useState('')

  const handleSendIssue = () => {
    console.log('Issue submitted:', issueText)
    alert('Issue submitted successfully! We will get back to you soon.')
    setIssueText('')
  }

  const handleFAQsClick = () => {
    navigate(ROUTES.FEATURE_ROUTES.STATIC_CONTENT.BASE_ROUTE)
  }

  return {
    issueText,
    setIssueText,
    handleSendIssue,
    handleFAQsClick
  }
}



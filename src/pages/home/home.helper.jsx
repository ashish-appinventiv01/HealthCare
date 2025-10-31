import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes/routes.jsx'
import { HomePlaceholder } from '../../assets/index.js'
const PlaceholderIcon = () => (
  <img src={HomePlaceholder} width="16" height="16" alt="Placeholder" />
)

const useHomeHelper = () => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState('03')

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleRecommendedClick = () => {
    navigate(ROUTES.FEATURE_ROUTES.EDUCATIONAL_CONTENT)
  }

  return {
    selectedDate,
    handleDateChange,
    PlaceholderIcon,
    handleRecommendedClick
    
  }
}

export default useHomeHelper




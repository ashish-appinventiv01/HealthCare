import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '@routes/routes'
import type { UseHomeHelperReturn } from './home.interface'

const useHomeHelper = (): UseHomeHelperReturn => {
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState<string>('03')

  const handleDateChange = (date: string) => {
    setSelectedDate(date)
  }

  const handleRecommendedClick = () => {
    navigate(ROUTES.FEATURE_ROUTES.EDUCATIONAL_CONTENT)
  }

  return {
    selectedDate,
    handleDateChange,
    handleRecommendedClick,
  }
}

export default useHomeHelper



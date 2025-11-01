import { useRef, useState } from 'react'
import type { DashboardFormData, UseDashboardHelperReturn } from './dashboard.interface'

const useDashboardHelper = (): UseDashboardHelperReturn => {
  const [formData, setFormData] = useState<DashboardFormData>({
    name: 'Maria Johns',
    email: 'Mariajons983@gmail.com',
    phone: '',
    dob: '1997-11-10',
  })

  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false)
  const dobInputRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = <K extends keyof DashboardFormData>(field: K, value: DashboardFormData[K]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePhoneClick = () => {
    setShowPhoneModal(true)
  }

  const handlePhoneVerify = (phoneNumber: string) => {
    setFormData(prev => ({
      ...prev,
      phone: phoneNumber,
    }))
    setShowPhoneModal(false)
  }

  const openDobPicker = () => {}

  return {
    formData,
    setFormData,
    showPhoneModal,
    setShowPhoneModal,
    dobInputRef,
    handleInputChange,
    handlePhoneClick,
    handlePhoneVerify,
    openDobPicker,
  }
}

export default useDashboardHelper



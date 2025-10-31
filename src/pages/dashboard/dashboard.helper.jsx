import { useRef, useState } from 'react'
import { CameraIcon as CameraIconUrl, EditIcon as EditIconUrl, CalendarIcon as CalendarIconUrl , ProfileAvatar} from '../../assets/index.js'

const CameraIcon = () => (
  <img src={CameraIconUrl} width="15" height="15" alt="Camera" />
)

const EditIcon = () => (
  <img src={EditIconUrl} width="18" height="18" alt="Edit" />
)

const CalendarIcon = () => (
  <img src={CalendarIconUrl} width="20" height="20" alt="Calendar" />
)

const useDashboardHelper = () => {
  const [formData, setFormData] = useState({
    name: 'Maria Johns',
    email: 'Mariajons983@gmail.com',
    phone: '',
    dob: '1997-11-10'
  })
  const [showPhoneModal, setShowPhoneModal] = useState(false)
  const dobInputRef = useRef(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePhoneClick = () => {
    setShowPhoneModal(true)
  }

  const handlePhoneVerify = (phoneNumber) => {
    setFormData(prev => ({
      ...prev,
      phone: phoneNumber
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
    CameraIcon,
    EditIcon,
    CalendarIcon,
    ProfileAvatar
  }
}

export default useDashboardHelper



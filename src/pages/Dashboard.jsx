import { useState, useRef } from 'react'
import PhoneNumberModal from '../components/PhoneNumberModal.jsx'
import DatePicker from '../components/DatePicker.jsx'
import MUITextField from '../components/MUITextField.jsx'

export default function Dashboard() {
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

  const CameraIcon = () => (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_167_3384)">
        <path d="M13.3462 3.72319H11.781L10.9169 2.41884C10.5908 1.92971 10.0201 1.63623 9.43316 1.63623H5.8462C5.25924 1.63623 4.68859 1.92971 4.3625 2.41884L3.49837 3.72319H1.93316C0.938592 3.72319 0.139679 4.5221 0.139679 5.51666V11.8428C0.139679 12.8373 0.938592 13.6362 1.93316 13.6362H13.3462C14.3408 13.6362 15.1397 12.8373 15.1397 11.8428V5.51666C15.1397 4.5221 14.3408 3.72319 13.3462 3.72319ZM7.63968 12.1688C5.40598 12.1688 3.5962 10.3591 3.5962 8.12536C3.5962 5.89166 5.40598 4.09819 7.63968 4.09819C9.87337 4.09819 11.6832 5.90797 11.6832 8.14166C11.6832 10.3591 9.87337 12.1688 7.63968 12.1688ZM13.1179 6.25036C13.1016 6.25036 13.0853 6.25036 13.0527 6.25036H12.4005C12.1071 6.23406 11.8788 5.98949 11.8951 5.69601C11.9114 5.41884 12.1234 5.20688 12.4005 5.19058H13.0527C13.3462 5.17427 13.5908 5.40253 13.6071 5.69601C13.6234 5.98949 13.4114 6.23406 13.1179 6.25036Z" fill="white"/>
        <path d="M7.63968 5.89014C6.40055 5.89014 5.38968 6.90101 5.38968 8.14014C5.38968 9.37927 6.40055 10.3738 7.63968 10.3738C8.87881 10.3738 9.88968 9.36296 9.88968 8.12383C9.88968 6.8847 8.87881 5.89014 7.63968 5.89014Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_167_3384">
          <rect width="15" height="15" fill="white" transform="translate(0.139679 0.13623)"/>
        </clipPath>
      </defs>
    </svg>
  )

  const EditIcon = () => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_167_3404)">
        <path d="M12.75 18.0342H2.25C1.00951 18.0342 0 17.0247 0 15.7842V5.28418C0 4.04369 1.00951 3.03418 2.25 3.03418H8.25005C8.66478 3.03418 9 3.37022 9 3.78427C9 4.19818 8.66478 4.53423 8.25005 4.53423H2.25C1.83595 4.53423 1.50005 4.87096 1.50005 5.28418V15.7842C1.50005 16.1974 1.83595 16.5342 2.25 16.5342H12.75C13.164 16.5342 13.5 16.1974 13.5 15.7842V9.78418C13.5 9.37027 13.8352 9.03423 14.25 9.03423C14.6647 9.03423 15 9.37027 15 9.78418V15.7842C15 17.0247 13.9905 18.0342 12.75 18.0342Z" fill="#2483C5"/>
        <path d="M12.9657 2.41699L7.03161 8.35098C6.97915 8.40344 6.94385 8.47018 6.92888 8.54214L6.39866 11.1942C6.37394 11.3172 6.41294 11.4439 6.50138 11.5332C6.57265 11.6044 6.66865 11.6426 6.76697 11.6426C6.79087 11.6426 6.81573 11.6404 6.84044 11.6352L9.49172 11.105C9.56519 11.0899 9.63193 11.0547 9.68371 11.0021L15.6177 5.06813L12.9657 2.41699Z" fill="#2483C5"/>
        <path d="M17.4507 0.582638C16.7195 -0.14864 15.53 -0.14864 14.7994 0.582638L13.7615 1.62057L16.4128 4.27185L17.4507 3.23378C17.8047 2.88057 17.9997 2.40953 17.9997 1.90855C17.9997 1.40757 17.8047 0.936535 17.4507 0.582638Z" fill="#2483C5"/>
      </g>
      <defs>
        <clipPath id="clip0_167_3404">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )

  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.8333 15.8335H4.16667V6.66683H15.8333M13.3333 0.833496V2.50016H6.66667V0.833496H5V2.50016H4.16667C3.24167 2.50016 2.5 3.24183 2.5 4.16683V15.8335C2.5 16.2755 2.67559 16.6994 2.98816 17.012C3.30072 17.3246 3.72464 17.5002 4.16667 17.5002H15.8333C16.2754 17.5002 16.6993 17.3246 17.0118 17.012C17.3244 16.6994 17.5 16.2755 17.5 15.8335V4.16683C17.5 3.7248 17.3244 3.30088 17.0118 2.98832C16.6993 2.67576 16.2754 2.50016 15.8333 2.50016H15V0.833496M14.1667 10.0002H10V14.1668H14.1667V10.0002Z" fill="#2483C5"/>
    </svg>
  )

  return (
    <div className="reminders-shell">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48.7812" fill="white" stroke="#2483C5" strokeWidth="2.4375"/>
                <circle cx="50" cy="36.4582" r="13.5417" fill="#2483C5"/>
                <path d="M69.3861 78.125H29.7521C26.8521 78.125 24.677 75.5901 25.0395 72.6931C26.0062 66.1749 28.0604 55.794 31.4438 53.1384C33.3772 51.6899 36.2772 50.7242 39.5398 50C41.1106 56.1561 44.6149 61.8294 49.4483 67.382C54.2817 61.9501 57.7859 56.1561 59.3568 50C62.7402 50.7242 65.6402 51.6899 67.4527 53.1384C70.957 55.794 73.0112 66.1749 73.857 72.6931C74.4612 75.5901 72.2862 78.125 69.3861 78.125Z" fill="#2483C5"/>
              </svg>
              <button className="camera-button">
                <CameraIcon />
              </button>
            </div>
            <h2 className="profile-name">Maria Johns</h2>
          </div>
        </div>

        {/* Profile Form */}
        <div className="profile-form">
          <div className="form-row">
            <div className="form-field">
            
            <MUITextField
              label={"Name"}
              value={formData.name}
              onChange={(val) => handleInputChange('name', val)}
              placeholder="Enter name"
              type="text"
            />
            </div>
            <div className="form-field">
            
            <MUITextField
              label={"Email"}
              value={formData.email}
              onChange={(val) => handleInputChange('email', val)}
              placeholder="Enter email"
              type="email"
            />
            </div>
            <div className="form-field">
              
            <div className="input-with-icon" onClick={handlePhoneClick}>
              <MUITextField
                label={"Phone Number"}
                value={formData.phone}
                onChange={() => {}}
                placeholder="Add Phone Number"
                type="tel"
                readOnly
                onClick={handlePhoneClick}
                InputProps={{
                  sx: { cursor: 'pointer' }
                }}
              />
              <EditIcon />
            </div>
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">

              <DatePicker
                label={"DOB"}
                value={formData.dob}
                onChange={(newVal) => handleInputChange('dob', newVal)}
                maxDate={new Date().toISOString().slice(0,10)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phone Number Modal */}
      <PhoneNumberModal
        open={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onVerify={handlePhoneVerify}
        initialValue={formData.phone}
      />
    </div>
  )
}

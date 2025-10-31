import useDashboardHelper from './dashboard.helper.jsx'

import PhoneNumberModal from '../../components/Modals/phoneNumberModal/index.jsx' 
import DatePicker from '../../components/common/common-datepicker/index.jsx'
import MUITextField from '../../components/common/common-textfield/index.jsx'

export default function Dashboard() {
  const { formData, setFormData, showPhoneModal, setShowPhoneModal, dobInputRef, handleInputChange, handlePhoneClick, handlePhoneVerify, openDobPicker, CameraIcon, EditIcon, CalendarIcon, ProfileAvatar } = useDashboardHelper()

  return (
    <div className="reminders-shell">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={ProfileAvatar} width="100" height="100" alt="Profile Avatar" />
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
                  sx: { cursor: 'pointer' },
                  endAdornment: <EditIcon />
                }}
              />
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

import useDashboardHelper from './dashboard.helper'

import PhoneNumberModal from '@/components/modals/phoneNumberModal'
import DatePicker from '@components/common/common-datepicker'
import MUITextField from '@components/common/common-textfield'
import { CameraIcon as CameraIconUrl, EditIcon as EditIconUrl, ProfileAvatar } from '@assets/index'

export default function Dashboard() {
  const { formData, showPhoneModal, setShowPhoneModal, handleInputChange, handlePhoneClick, handlePhoneVerify } = useDashboardHelper()

  return (
    <div className="home-container">
      <div className="profile-card">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              <img src={ProfileAvatar} width="100" height="100" alt="Profile Avatar" />
              <button className="camera-button">
                <img src={CameraIconUrl} width="15" height="15" alt="Camera" />
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
              onChange={(val) => handleInputChange('name', String(val))}
              placeholder="Enter name"
              type="text"
            />
            </div>
            <div className="form-field">
            
            <MUITextField
              label={"Email"}
              value={formData.email}
              onChange={(val) => handleInputChange('email', String(val))}
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
                  endAdornment: <img src={EditIconUrl} alt="Edit" />
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

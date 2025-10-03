import { useState, useEffect } from 'react'
import MUITextField from '../common/MUITextField.jsx'
import MUISelect from '../common/MUISelect.jsx'

export default function AddMedicationModal({ open, onClose, onSave }) {
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [time, setTime] = useState('')

  // Time options for medication timing
  const timeOptions = [
    { value: 'day', label: 'Day' },
    { value: 'light', label: 'Light' },
    { value: 'evening', label: 'Evening' }
  ]

  useEffect(() => {
    if (open) {
      setName('')
      setDosage('')
      setTime('')
    }
  }, [open])

  const canSave = name.trim().length > 0 && dosage.trim().length > 0 && time

  const handleSave = () => {
    if (!canSave) return
    const medication = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim(),
      time: time
    }
    onSave?.(medication)
    onClose?.()
  }

  if (!open) return null

  return (
    <div className="medication-modal-backdrop" onClick={onClose}>
      <div className="medication-modal" onClick={(e) => e.stopPropagation()}>
        <div className="medication-modal-content">
          <h3 className="medication-modal-title">Add Medication</h3>

          <div className="medication-form">
            {/* Name Field */}
            <div className="medication-field">
              <MUITextField
                label="Name"
                value={name}
                onChange={setName}
                placeholder="Enter New Medication"
              />
            </div>

            {/* Dosage Field */}
            <div className="medication-field">
              <MUITextField
                label="Dosage"
                value={dosage}
                onChange={setDosage}
                placeholder="e.g. 250mg"
              />
            </div>

            {/* Time Field */}
            <div className="medication-field">
              <MUISelect
                label="Time"
                value={time}
                onChange={setTime}
                options={timeOptions}
                placeholder="Select Time"
              />
            </div>
          </div>

          <div className="medication-modal-actions">
            <button className="medication-modal-button cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`medication-modal-button save ${canSave ? 'enabled' : 'disabled'}`}
              onClick={handleSave}
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

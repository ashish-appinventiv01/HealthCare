import { useState } from 'react'
import TrackingSection from '../components/TrackingSection.jsx'
import AddMedicationModal from '../components/Modals/AddMedicationModal.jsx'
import DateSelector from '../components/common/DateSelector.jsx'

export default function Logs() {
  const [selectedDate, setSelectedDate] = useState('03')
  const [showMedicationModal, setShowMedicationModal] = useState(false)
  const [trackingData, setTrackingData] = useState({
    bleeding: { heavy: false, medium: false, light: false, spotting: false, none: false },
    vulvalSensation: { dry: false, moist: false, wet: false, slippery: false, sticky: false, none: false },
    cervicalFluid: { white: false, yellow: false, thick: false, thin: false, watery: false, clear: false, lotion: false, pasty: false, streaked: false, cloudy: false, stretchy: false, none: false },
    mood: { happy: false, relaxed: false, anxious: false, irritable: false, tired: false, energetic: false, none: false },
    symptoms: { breastTenderness: false, cramps: false, bloating: false, perinealPain: false, acne: false, exercise: false, sleep: false, cravings: false, none: false },
    sleepDisturbances: { troubleSleeping: false, frequentWaking: false, restlessSleep: false, earlyWaking: false, insomnia: false, nightSweats: false, none: false },
    basalBodyTemperature: '',
    temperatureUnit: 'F',
    urinaryHormones: { lh: 'positive', fsh: '', estrogen: '', progesterone: '' },
    medications: [
      { name: 'Paracetamol', dosage: '650mg', frequency: 'Daily' }
    ],
    notes: ''
  })


  const handleTrackingChange = (section, key, value) => {
    setTrackingData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
  }

  const handleHormoneChange = (hormone, value) => {
    setTrackingData(prev => ({
      ...prev,
      urinaryHormones: {
        ...prev.urinaryHormones,
        [hormone]: value
      }
    }))
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleAddMedication = () => {
    setShowMedicationModal(true)
  }

  const handleSaveMedication = (medication) => {
    setTrackingData(prev => ({
      ...prev,
      medications: [...prev.medications, medication]
    }))
  }

  const handleCloseMedicationModal = () => {
    setShowMedicationModal(false)
  }

  const handleEditMedication = (index) => {
    // TODO: Implement edit medication functionality
    console.log('Edit medication at index:', index)
  }

  const handleDeleteMedication = (index) => {
    setTrackingData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, i) => i !== index)
    }))
  }

  const bleedingOptions = [
    { key: 'heavy', label: 'Heavy' },
    { key: 'medium', label: 'Medium' },
    { key: 'light', label: 'Light' },
    { key: 'spotting', label: 'Spotting' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]

  const vulvalSensationOptions = [
    { key: 'dry', label: 'Dry' },
    { key: 'moist', label: 'Moist' },
    { key: 'wet', label: 'Wet' },
    { key: 'slippery', label: 'Slippery' },
    { key: 'sticky', label: 'Sticky' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]

  const cervicalFluidOptions = [
    { key: 'white', label: 'White' },
    { key: 'yellow', label: 'Yellow' },
    { key: 'thick', label: 'Thick' },
    { key: 'thin', label: 'Thin' },
    { key: 'watery', label: 'Watery' },
    { key: 'clear', label: 'Clear' },
    { key: 'lotion', label: 'Lotion' },
    { key: 'pasty', label: 'Pasty' },
    { key: 'streaked', label: 'Streaked' },
    { key: 'cloudy', label: 'Cloudy' },
    { key: 'stretchy', label: 'Stretchy' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]

  const moodOptions = [
    { key: 'happy', label: 'Happy' },
    { key: 'relaxed', label: 'Relaxed' },
    { key: 'anxious', label: 'Anxious' },
    { key: 'irritable', label: 'Irritable' },
    { key: 'tired', label: 'Tired' },
    { key: 'energetic', label: 'Energetic' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]

  const symptomsOptions = [
    { key: 'breastTenderness', label: 'Breast\nTenderness' },
    { key: 'cramps', label: 'Cramps' },
    { key: 'bloating', label: 'Bloating' },
    { key: 'perinealPain', label: 'Perineal\nPain' },
    { key: 'acne', label: 'Acne' },
    { key: 'exercise', label: 'Exercise' },
    { key: 'sleep', label: 'Sleep' },
    { key: 'cravings', label: 'Cravings' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]

  const sleepDisturbancesOptions = [
    { key: 'troubleSleeping', label: 'Trouble\nSleeping' },
    { key: 'frequentWaking', label: 'Frequent\nWaking' },
    { key: 'restlessSleep', label: 'Restless\nSleep' },
    { key: 'earlyWaking', label: 'Early\nWaking' },
    { key: 'insomnia', label: 'Insomnia' },
    { key: 'nightSweats', label: 'Night\nSweats' },
    { key: 'none', label: 'None' },
    { key: 'add', label: 'Add', isAdd: true }
  ]


  return (
    <div className="reminders-shell">
      <div className="logs-content">
        {/* Header */}
        <div className="logs-header">
          <h1 className="logs-title">Logs</h1>
          <div className="logs-navigation">
         
          
          </div>
        </div>

        {/* Date Selector */}
        <DateSelector
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          dateDisplayText="Today, 03 September, 2025"
          showCalendarIcon={true}
        />

        {/* Tracking Sections */}
        <div className="tracking-sections">
        <TrackingSection
          title="Bleeding"
          options={bleedingOptions}
          type="circular"
          onChange={(key, value) => handleTrackingChange('bleeding', key, value)}
        />

        <TrackingSection
          title="Vulval Sensation"
          options={vulvalSensationOptions}
          type="circular"
          hasInfoIcon={true}
          onChange={(key, value) => handleTrackingChange('vulvalSensation', key, value)}
        />

        <TrackingSection
          title="Cervical Fluid Appearance"
          options={cervicalFluidOptions}
          type="circular"
          hasInfoIcon={true}
          isTwoRow={true}
          onChange={(key, value) => handleTrackingChange('cervicalFluid', key, value)}
        />

        <TrackingSection
          title="Mood"
          options={moodOptions}
          type="circular"
          onChange={(key, value) => handleTrackingChange('mood', key, value)}
        />

        <TrackingSection
          title="Symptoms"
          options={symptomsOptions}
          type="circular"
          onChange={(key, value) => handleTrackingChange('symptoms', key, value)}
        />

        <TrackingSection
          title="Sleep Disturbances"
          options={sleepDisturbancesOptions}
          type="circular"
          onChange={(key, value) => handleTrackingChange('sleepDisturbances', key, value)}
        />

        {/* Basal Body Temperature */}
        <div className="tracking-section basal-temperature">
          <div className="section-header">
            <h3 className="section-title">Basal Body Temperature</h3>
            <div className="info-icon">
              <img src="/src/assets/icons/Icon.svg" alt="info" width="15" height="15" />
            </div>
          </div>
          <div className="temperature-input">
            <input
              type="number"
              step="0.1"
              placeholder="--.-"
              className="temperature-field"
              value={trackingData.basalBodyTemperature}
              onChange={(e) => setTrackingData(prev => ({ ...prev, basalBodyTemperature: e.target.value }))}
            />
            <span className="temperature-unit">°F/°C</span>
            <svg className="temperature-dropdown" width="8" height="5" viewBox="0 0 8 5" fill="none">
              <path d="M147.571 68.2852L151 71.7137L154.429 68.2852" stroke="#2483C5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Urinary Hormones */}
        <div className="tracking-section urinary-hormones">
          <h3 className="section-title">Urinary Hormones</h3>
          <div className="hormone-grid">
            <div className="hormone-headers">
              <span className="positive-header">+ve</span>
              <span className="negative-header">-ve</span>
            </div>
            <div className="hormone-row">
              <span className="hormone-label">LH</span>
              <div className="hormone-options">
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="lh" 
                    value="positive"
                    checked={trackingData.urinaryHormones.lh === 'positive'}
                    onChange={() => handleHormoneChange('lh', 'positive')}
                  />
                  <span className="radio-custom"></span>
                </label>
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="lh" 
                    value="negative"
                    checked={trackingData.urinaryHormones.lh === 'negative'}
                    onChange={() => handleHormoneChange('lh', 'negative')}
                  />
                  <span className="radio-custom"></span>
                </label>
              </div>
            </div>
            <div className="hormone-row">
              <span className="hormone-label">FSH</span>
              <div className="hormone-options">
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="fsh" 
                    value="positive"
                    checked={trackingData.urinaryHormones.fsh === 'positive'}
                    onChange={() => handleHormoneChange('fsh', 'positive')}
                  />
                  <span className="radio-custom"></span>
                </label>
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="fsh" 
                    value="negative"
                    checked={trackingData.urinaryHormones.fsh === 'negative'}
                    onChange={() => handleHormoneChange('fsh', 'negative')}
                  />
                  <span className="radio-custom"></span>
                </label>
              </div>
            </div>
            <div className="hormone-row">
              <span className="hormone-label">Estrogen</span>
              <div className="hormone-options">
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="estrogen" 
                    value="positive"
                    checked={trackingData.urinaryHormones.estrogen === 'positive'}
                    onChange={() => handleHormoneChange('estrogen', 'positive')}
                  />
                  <span className="radio-custom"></span>
                </label>
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="estrogen" 
                    value="negative"
                    checked={trackingData.urinaryHormones.estrogen === 'negative'}
                    onChange={() => handleHormoneChange('estrogen', 'negative')}
                  />
                  <span className="radio-custom"></span>
                </label>
              </div>
            </div>
            <div className="hormone-row">
              <span className="hormone-label">Progesterone</span>
              <div className="hormone-options">
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="progesterone" 
                    value="positive"
                    checked={trackingData.urinaryHormones.progesterone === 'positive'}
                    onChange={() => handleHormoneChange('progesterone', 'positive')}
                  />
                  <span className="radio-custom"></span>
                </label>
                <label className="hormone-radio-label">
                  <input 
                    type="radio" 
                    name="progesterone" 
                    value="negative"
                    checked={trackingData.urinaryHormones.progesterone === 'negative'}
                    onChange={() => handleHormoneChange('progesterone', 'negative')}
                  />
                  <span className="radio-custom"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Medications */}
        <div className="tracking-section medications">
          <h3 className="section-title">Medications</h3>
          <div className="medications-list">
            {/* Add Medication Button */}
            <button className="add-medication-btn" onClick={handleAddMedication}>
              <div className="add-medication-icon">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.75 10.5C1.75 5.66738 5.66738 1.75 10.5 1.75C15.3326 1.75 19.25 5.66738 19.25 10.5C19.25 15.3326 15.3326 19.25 10.5 19.25C5.66738 19.25 1.75 15.3326 1.75 10.5ZM10.5 3.5C8.64348 3.5 6.86301 4.2375 5.55025 5.55025C4.2375 6.86301 3.5 8.64348 3.5 10.5C3.5 12.3565 4.2375 14.137 5.55025 15.4497C6.86301 16.7625 8.64348 17.5 10.5 17.5C12.3565 17.5 14.137 16.7625 15.4497 15.4497C16.7625 14.137 17.5 12.3565 17.5 10.5C17.5 8.64348 16.7625 6.86301 15.4497 5.55025C14.137 4.2375 12.3565 3.5 10.5 3.5Z" fill="#2483C5"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.375 6.125C11.375 5.89294 11.2828 5.67038 11.1187 5.50628C10.9546 5.34219 10.7321 5.25 10.5 5.25C10.2679 5.25 10.0454 5.34219 9.88128 5.50628C9.71719 5.67038 9.625 5.89294 9.625 6.125V9.625H6.125C5.89294 9.625 5.67038 9.71719 5.50628 9.88128C5.34219 10.0454 5.25 10.2679 5.25 10.5C5.25 10.7321 5.34219 10.9546 5.50628 11.1187C5.67038 11.2828 5.89294 11.375 6.125 11.375H9.625V14.875C9.625 15.1071 9.71719 15.3296 9.88128 15.4937C10.0454 15.6578 10.2679 15.75 10.5 15.75C10.7321 15.75 10.9546 15.6578 11.1187 15.4937C11.2828 15.3296 11.375 15.1071 11.375 14.875V11.375H14.875C15.1071 11.375 15.3296 11.2828 15.4937 11.1187C15.6578 10.9546 15.75 10.7321 15.75 10.5C15.75 10.2679 15.6578 10.0454 15.4937 9.88128C15.3296 9.71719 15.1071 9.625 14.875 9.625H11.375V6.125Z" fill="#2483C5"/>
                </svg>
              </div>
              <span className="add-medication-text">Add Medication</span>
            </button>

            {/* Medication List */}
            {trackingData.medications.map((medication, index) => (
              <div key={index} className="medication-item">
                <div className="medication-icon">
                  <img src="/src/assets/icons/list_prefix.svg" alt="medication" width="11" height="11" />
                </div>
                <div className="medication-details">
                  <span className="medication-name">{medication.name}</span>
                  <span className="medication-dosage">{medication.dosage}</span>
                  <span className="medication-frequency">{medication.frequency}</span>
                </div>
                <div className="medication-actions">
                  <button className="medication-action-btn edit-btn" onClick={() => handleEditMedication(index)}>
                    <img src="/src/assets/icons/edit.svg" alt="edit" width="12" height="12" />
                  </button>
                  <button className="medication-action-btn delete-btn" onClick={() => handleDeleteMedication(index)}>
                    <img src="/src/assets/icons/delete_icon.svg" alt="delete" width="12" height="12" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="tracking-section notes">
          <h3 className="section-title">Notes</h3>
          <div className="notes-input-container">
            <textarea 
              className="notes-input"
              placeholder="Enter notes"
              value={trackingData.notes}
              onChange={(e) => setTrackingData(prev => ({ ...prev, notes: e.target.value }))}
              maxLength="500"
            />
            <span className="character-count">{trackingData.notes.length}/500</span>
          </div>
        </div>
      </div>

      {/* Add Medication Modal */}
      <AddMedicationModal
        open={showMedicationModal}
        onClose={handleCloseMedicationModal}
        onSave={handleSaveMedication}
      />
    </div>
    </div>
  )
}

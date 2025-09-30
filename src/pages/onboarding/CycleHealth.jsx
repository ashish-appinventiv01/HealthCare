import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import TextField from '../../components/TextField.jsx'
import Button from '../../components/Button.jsx'

export default function CycleHealth() {
  const navigate = useNavigate()
  const [lactating, setLactating] = useState('')
  const [contraceptive, setContraceptive] = useState('')
  const [bleedTimeline, setBleedTimeline] = useState('')
  const [cycleLength, setCycleLength] = useState('')
  const [openField, setOpenField] = useState(null)

  const toggleField = (key) => {
    setOpenField((prev) => (prev === key ? null : key))
  }

  const closeField = () => setOpenField(null)

  // Mock options
  const lactatingOptions = ['Yes', 'No']
  const contraceptiveOptions = ['None', 'Pill', 'IUD', 'Implant', 'Condoms']
  const bleedTimelineOptions = ['Currently bleeding', 'Last week', '2-4 weeks ago', '>1 month ago']
  const cycleLengthOptions = ['<21 days', '21-28 days', '29-35 days', '>35 days', 'Irregular']

  const ArrowCircle = ({ rotated }) => (
    <div
      aria-hidden
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#2483C5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )

  const renderSelect = ({
    label,
    value,
    onChange,
    fieldKey,
    placeholder,
    options,
  }) => (
    <div style={{ position: 'relative' }}>
      <TextField
        label={label}
        placeholder={placeholder}
        variant="filled"
        fullWidth
        value={value}
        onChange={() => {}}
        readOnly
        InputProps={{
          endAdornment: (
            <button
              type="button"
              onClick={() => toggleField(fieldKey)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer'
              }}
              aria-label={`Toggle ${label} options`}
            >
              <ArrowCircle rotated={openField === fieldKey} />
            </button>
          )
        }}
      />
      {openField === fieldKey && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 8,
            marginTop: 6,
            boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
            zIndex: 20,
            overflow: 'hidden'
          }}
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                closeField()
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 14px',
                background: value === opt ? 'rgba(36,131,197,0.08)' : '#fff',
                border: 'none',
                cursor: 'pointer',
                color: '#374151',
                fontFamily: 'inherit',
                fontSize: 14
              }}
              role="option"
              aria-selected={value === opt}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <AuthLayout>
      <div className="ob-parent">
        <div className="ob-header">
          <div className="ob-step">Step 2 of 3</div>
          <div className="ob-title">Your Cycle & Health Details</div>
          <div className="ob-sub">Help us personalize your experience by sharing a few details about your cycle and current status.</div>
        </div>

        <div style={{ width: '69%', marginTop: 24, display: 'grid', gap: 12 }}>
          {renderSelect({
            label: 'Lactating Status',
            placeholder: 'Select',
            value: lactating,
            onChange: setLactating,
            fieldKey: 'lactating',
            options: lactatingOptions,
          })}
          {renderSelect({
            label: 'Contraceptive Status',
            placeholder: 'Select Status',
            value: contraceptive,
            onChange: setContraceptive,
            fieldKey: 'contraceptive',
            options: contraceptiveOptions,
          })}
          {renderSelect({
            label: 'Bleed Timeline',
            placeholder: 'Select',
            value: bleedTimeline,
            onChange: setBleedTimeline,
            fieldKey: 'bleedTimeline',
            options: bleedTimelineOptions,
          })}
          {renderSelect({
            label: 'Cycle Length',
            placeholder: 'Select Length',
            value: cycleLength,
            onChange: setCycleLength,
            fieldKey: 'cycleLength',
            options: cycleLengthOptions,
          })}
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <Button onClick={() => navigate('/onboarding/step-1')} style={{ width: 200 }}>Back</Button>
          <Button onClick={() => navigate('/onboarding/step-3')} style={{ width: 200 }}>Next</Button>
        </div>
      </div>
    </AuthLayout>
  )
}



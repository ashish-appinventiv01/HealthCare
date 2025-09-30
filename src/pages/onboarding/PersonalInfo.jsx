import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import TextField from '../../components/TextField.jsx'
import Button from '../../components/Button.jsx'

export default function PersonalInfo() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [dob, setDob] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const canNext = !!name && !!dob && !!height && !!weight

  return (
    <AuthLayout>
      <div className="ob-parent">
        {/* Header block */}
        <div className="ob-header">
          <div className="ob-step">Step 1 of 3</div>
          <div className="ob-title">Personal Information</div>
          <div className="ob-sub">Let’s start by setting up your profile with a few basic details.</div>
        </div>

        {/* Fields block */}
        <div className="ob-fields">
          <TextField label="Name" placeholder="Enter Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} inputClassName="ob-input" />
          <TextField label="DOB" placeholder="Select Your DOB" type="date" variant="outlined" value={dob} onChange={(e) => setDob(e.target.value)} inputClassName="ob-input" />
          <TextField label="Height" placeholder="Select Your Height" variant="outlined" value={height} onChange={(e) => setHeight(e.target.value)} inputClassName="ob-input" />
          <TextField label="Weight" placeholder="Select Your Weight" variant="outlined" value={weight} onChange={(e) => setWeight(e.target.value)} inputClassName="ob-input" />
        </div>

        <div className="ob-actions">
          <Button disabled style={{ width: 200 }}>Back</Button>
          <Button onClick={() => navigate('/onboarding/step-2')} disabled={!canNext} style={{ width: 200 }}>Next</Button>
        </div>
      </div>
    </AuthLayout>
  )
}



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '@layouts/authLayout'
import Button from '@components/common/common-button'
import MUISelect from '@components/common/common-mui-select'
import MUITextField from '@components/common/common-textfield'
import ROUTES from '@routes/routes'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { ArrowCircle } from '@/assets'
import { ArrowCircle as ArrowCircleIcon } from '@assets/index'
export default function Community() {
  
  const navigate = useNavigate()
  const [belongsToCommunity, setBelongsToCommunity] = useState<'yes' | 'no'>('no')
  const [selectedState, setSelectedState] = useState<string | number>('')
  const [selectedCity, setSelectedCity] = useState<string | number>('')
  const [communityName, setCommunityName] = useState('')
  const [selectedParish, setSelectedParish] = useState<string | number>('')
  const [pastorName, setPastorName] = useState('')
  const [commitment, setCommitment] = useState<string | number>('')

  // demo options; integrate with real lists later
  const stateOptions: Array<string | { value: string; label: string }> = [
    { value: 'state-1', label: 'State 1' },
    { value: 'state-2', label: 'State 2' },
  ]
  const cityOptions: Array<string | { value: string; label: string }> = [
    { value: 'city-1', label: 'City 1' },
    { value: 'city-2', label: 'City 2' },
  ]
  const parishOptions: Array<string | { value: string; label: string }> = [
    { value: 'parish-1', label: 'St. Luke' },
    { value: 'parish-2', label: 'St. Mary' },
  ]
  const commitmentOptions: Array<string | { value: string; label: string }> = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ]

  const canSave =
    belongsToCommunity === 'no' ||
    (belongsToCommunity === 'yes'
      && Boolean(selectedState)
      && Boolean(selectedCity)
      && Boolean(selectedParish)
      && Boolean(pastorName.trim())
      && Boolean(commitment))

  const onSelect = (value: 'yes' | 'no') => {
    setBelongsToCommunity(value)
    if (value === 'no') {
      setSelectedState('')
      setSelectedCity('')
      setSelectedParish('')
      setPastorName('')
      setCommitment('')
    } else {
      setCommunityName('')
    }
  }
  const ArrowCircle = ({ className }) => (
    <img aria-hidden className={className} src={ArrowCircleIcon} width="28" height="28" alt="open" style={{ top: '14px' }} />
  )

  return (
    <AuthLayout
      step="Step 4 of 4"
      title="Catholic Community or Local Parish"
      subtitle="Tell us which local community or group you are associated with."
    >
      <div className="ob-parent">
        <div className="ob-community-fields">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontWeight: 600 }}>Do you belong to any catholic community?</div>
            <RadioGroup
              row
              aria-label="belongs-to-community"
              name="belongs-to-community"
              value={belongsToCommunity}
              onChange={(e) => onSelect((e.target as HTMLInputElement).value as 'yes' | 'no')}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </div>

          <div style={{ width: '95%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {belongsToCommunity === 'yes' && (
              <>
                <MUISelect
                label="State"
                value={selectedState}
                onChange={(v) => {
                  setSelectedState(v)
                  // reset dependent selections when state changes
                  setSelectedCity('')
                  setSelectedParish('')
                  setPastorName('')
                  setCommitment('')
                }}
                options={stateOptions}
                placeholder="Select"
                disabled={belongsToCommunity !== 'yes'}
                SelectProps={{ IconComponent: ArrowCircle }}
                />
                <MUISelect
                label="City"
                value={selectedCity}
                onChange={(v) => setSelectedCity(v)}
                options={cityOptions}
                placeholder="Select"
                disabled={belongsToCommunity !== 'yes'}
                SelectProps={{ IconComponent: ArrowCircle }}
                />
                {Boolean(selectedCity) && (
                  <>
                    <MUISelect
                    label="Parish"
                    value={selectedParish}
                    onChange={(v) => setSelectedParish(v)}
                    options={parishOptions}
                    placeholder="Select"
                    disabled={belongsToCommunity !== 'yes'}
                    SelectProps={{ IconComponent: ArrowCircle }}
                    />
                    <MUITextField
                    label="Pastor"
                    type="text"
                    value={pastorName}
                    onChange={(v) => setPastorName(String(v))}
                    placeholder="Enter"
                    disabled={belongsToCommunity !== 'yes'}
                    />
                    <MUISelect
                    label="Are you committed to watch videos or receive news about Catholic Teachings?"
                    value={commitment}
                    onChange={(v) => setCommitment(v)}
                    options={commitmentOptions}
                    placeholder="Select"
                    disabled={belongsToCommunity !== 'yes'}
                    SelectProps={{ IconComponent: ArrowCircle }}
                    />
                  </>
                )}
              </>
            )}

            {belongsToCommunity === 'no' && (
              <MUITextField
                label="Community"
                type="text"
                value={communityName}
                onChange={(v) => setCommunityName(String(v))}
                placeholder="Enter"
              />
            )}
          </div>
        </div>

        <div className="ob-actions">
          <Button onClick={() => navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_3)} style={{ width: 200 }}>Back</Button>
          <Button onClick={() => navigate(ROUTES.AUTH_ROUTES.LOGIN)} disabled={!canSave} style={{ width: 200 }}>Save</Button>
        </div>
      </div>
    </AuthLayout>
  )
}



import { useNavigate } from 'react-router-dom'
import { useFormik, FormikProvider, Form } from 'formik'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUISelect from '../../components/MUISelect.jsx'
import Button from '../../components/Button.jsx'

export default function CycleHealth() {
  const navigate = useNavigate()

  // Mock options
  const lactatingOptions = ['Yes', 'No']
  const contraceptiveOptions = ['None', 'Pill', 'IUD', 'Implant', 'Condoms']
  const bleedTimelineOptions = ['Currently bleeding', 'Last week', '2-4 weeks ago', '>1 month ago']
  const cycleLengthOptions = ['<21 days', '21-28 days', '29-35 days', '>35 days', 'Irregular']

  const formik = useFormik({
    initialValues: {
      lactating: '',
      contraceptive: '',
      bleedTimeline: '',
      cycleLength: '',
    },
    onSubmit: () => {
      navigate('/onboarding/step-3')
    },
  })

  const canNext = !!formik.values.lactating && !!formik.values.contraceptive && !!formik.values.bleedTimeline && !!formik.values.cycleLength

  const ArrowCircle = ({ className }) => (
    <div
      aria-hidden
      className={className}
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#2483C5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
        top: '14px'
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <Form>
          <div className="ob-parent">
            <div className="ob-header">
              <div className="ob-step">Step 2 of 3</div>
              <div className="ob-title">Your Cycle & Health Details</div>
              <div className="ob-sub">Help us personalize your experience by sharing a few details about your cycle and current status.</div>
            </div>

            <div style={{ width: '69%', marginTop: 24, display: 'grid', gap: 20 }}>
              <MUISelect
                label="Lactating Status"
                value={formik.values.lactating}
                onChange={(v) => formik.setFieldValue('lactating', v)}
                options={lactatingOptions}
                placeholder="Select"
                SelectProps={{ IconComponent: ArrowCircle }}
              />
              <MUISelect
                label="Contraceptive Status"
                value={formik.values.contraceptive}
                onChange={(v) => formik.setFieldValue('contraceptive', v)}
                options={contraceptiveOptions}
                placeholder="Select Status"
                SelectProps={{ IconComponent: ArrowCircle }}
              />
              <MUISelect
                label="Bleed Timeline"
                value={formik.values.bleedTimeline}
                onChange={(v) => formik.setFieldValue('bleedTimeline', v)}
                options={bleedTimelineOptions}
                placeholder="Select"
                SelectProps={{ IconComponent: ArrowCircle }}
              />
              <MUISelect
                label="Cycle Length"
                value={formik.values.cycleLength}
                onChange={(v) => formik.setFieldValue('cycleLength', v)}
                options={cycleLengthOptions}
                placeholder="Select Length"
                SelectProps={{ IconComponent: ArrowCircle }}
              />
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
              <Button onClick={() => navigate('/onboarding/step-1')} style={{ width: 200 }}>Back</Button>
              <Button type="submit" disabled={!canNext} style={{ width: 200 }}>Next</Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </AuthLayout>
  )
}



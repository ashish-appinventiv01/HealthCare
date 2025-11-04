import { useNavigate } from 'react-router-dom'
import { useFormik, FormikProvider, Form } from 'formik'
import AuthLayout from '@layouts/authLayout'
import MUISelect from '@components/common/common-mui-select'
import Button from '@components/common/common-button'
import ROUTES from '@routes/routes'
import { ArrowCircle as ArrowCircleIcon } from '@assets/index'


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
      navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_3)
    },
  })

  const canNext = !!formik.values.lactating && !!formik.values.contraceptive && !!formik.values.bleedTimeline && !!formik.values.cycleLength

  const ArrowCircle = ({ className }) => (
    <img aria-hidden className={className} src={ArrowCircleIcon} width="28" height="28" alt="open" style={{ top: '14px' }} />
  )

  return (
    <AuthLayout
      step="Step 2 of 4"
      title="Your Cycle & Health Details"
      subtitle="Help us personalize your experience by sharing a few details about your cycle and current status."
    >
      <FormikProvider value={formik}>
        <Form>
          <div className="ob-parent">
            <div className="ob-fields">
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

            <div className="ob-actions">
              <Button onClick={() => navigate(ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_1)} style={{ width: 200 }}>Back</Button>
              <Button type="submit" disabled={!canNext} style={{ width: 200 }}>Next</Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </AuthLayout>
  )
}



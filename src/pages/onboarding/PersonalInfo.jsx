import { useNavigate } from 'react-router-dom'
import { useFormik, FormikProvider, Form } from 'formik'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import MUITextField from '../../components/MUITextField.jsx'
import DatePicker from '../../components/DatePicker.jsx'
import Button from '../../components/Button.jsx'

export default function PersonalInfo() {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { name: '', dob: '', height: '', weight: '' },
    onSubmit: () => {
      navigate('/onboarding/step-2')
    },
  })

  const canNext = !!formik.values.name && !!formik.values.dob && !!formik.values.height && !!formik.values.weight

  return (
    <AuthLayout>
      <FormikProvider value={formik}>
        <Form>
          <div className="ob-parent">
            {/* Header block */}
            <div className="ob-header">
              <div className="ob-step">Step 1 of 3</div>
              <div className="ob-title">Personal Information</div>
              <div className="ob-sub">Let’s start by setting up your profile with a few basic details.</div>
            </div>

            {/* Fields block */}
            <div className="ob-fields">
              <MUITextField
                label="Name"
                type="text"
                value={formik.values.name}
                onChange={(v) => formik.setFieldValue('name', v)}
                placeholder="Enter Name"
              />
              <DatePicker
                label="DOB"
                value={formik.values.dob}
                onChange={(v) => formik.setFieldValue('dob', v)}
                placeholder="Select Your DOB"
              />
              <MUITextField
                label="Height"
                type="text"
                value={formik.values.height}
                onChange={(v) => formik.setFieldValue('height', v)}
                placeholder="Select Your Height"
              />
              <MUITextField
                label="Weight"
                type="text"
                value={formik.values.weight}
                onChange={(v) => formik.setFieldValue('weight', v)}
                placeholder="Select Your Weight"
              />
            </div>

            <div className="ob-actions">
              <Button disabled style={{ width: 200 }}>Back</Button>
              <Button type="submit" disabled={!canNext} style={{ width: 200 }}>Next</Button>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </AuthLayout>
  )
}



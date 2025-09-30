import { Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/auth/Login.jsx'
import LanguageSelect from '../pages/auth/LanguageSelect.jsx'
import Register from '../pages/auth/Register.jsx'
import ForgotPassword from '../pages/auth/ForgotPassword.jsx'
import VerifyCode from '../pages/auth/VerifyCode.jsx'
import ResetPassword from '../pages/auth/ResetPassword.jsx'
import PersonalInfo from '../pages/onboarding/PersonalInfo.jsx'
import CycleHealth from '../pages/onboarding/CycleHealth.jsx'
import Preferences from '../pages/onboarding/Preferences.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import DashboardLayout from '../layouts/DashboardLayout.jsx'
import Settings from '../pages/Settings.jsx'
import LanguagePreference from '../pages/LanguagePreference.jsx'
import TrackingPreference from '../pages/TrackingPreference.jsx'
import ManageConsent from '../pages/ManageConsent.jsx'
import Reminders from '../pages/Reminders.jsx'
import FAQs from '../pages/FAQs.jsx'
import LegalContent from '../pages/LegalContent.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import PublicRoute from './PublicRoute.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes - visible only when NOT authenticated */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LanguageSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Route>

      {/* Private routes - require authentication */}
      <Route element={<PrivateRoute />}>
        {/* Onboarding */}
        <Route path="/onboarding/step-1" element={<PersonalInfo />} />
        <Route path="/onboarding/step-2" element={<CycleHealth />} />
        <Route path="/onboarding/step-3" element={<Preferences />} />
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/reminders" element={<DashboardLayout><Reminders /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/settings/manage-consent" element={<DashboardLayout><ManageConsent /></DashboardLayout>} />
        <Route path="/settings/language" element={<DashboardLayout><LanguagePreference /></DashboardLayout>} />
        <Route path="/settings/tracking-preference" element={<DashboardLayout><TrackingPreference /></DashboardLayout>} />
        <Route path="/faqs" element={<DashboardLayout><FAQs /></DashboardLayout>} />
        <Route
          path="/legal/terms"
          element={
            <DashboardLayout>
              <LegalContent
                title="Terms of Use"
                content={[
                  'Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites.',
                  'These terms outline acceptable use, user responsibilities, limitations of liability, and other important legal points. By using the service, you agree to these terms.'
                ]}
              />
            </DashboardLayout>
          }
        />
        <Route
          path="/legal/privacy"
          element={
            <DashboardLayout>
              <LegalContent
                title="Privacy Policy"
                content={[
                  'We value your privacy and are committed to protecting your personal information. This policy explains what data we collect, how we use it, and your rights regarding your data.',
                  'We only collect information necessary to provide and improve our services and we implement appropriate safeguards to protect your data.'
                ]}
              />
            </DashboardLayout>
          }
        />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}



import React, { lazy } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ROUTES from './routes.jsx'
const DashboardLayout = lazy(() => import('../layouts/dashboardLayout/index.jsx'))

const withDashboard = (Component) => (
  <DashboardLayout>
    <Component />
  </DashboardLayout>
)

const PersonalInfo = lazy(() => import('../pages/onboarding/PersonalInfo.jsx'))
const CycleHealth = lazy(() => import('../pages/onboarding/CycleHealth.jsx'))
const Preferences = lazy(() => import('../pages/onboarding/Preferences.jsx'))

const Dashboard = lazy(() => import('../pages/Dashboard/index.jsx'))
const Home = lazy(() => import('../pages/Home/index.jsx'))
const LanguagePreference = lazy(() => import('../pages/settings/language-prefernce/index.jsx'))
const TrackingPreference = lazy(() => import('../pages/settings/tracking-prefernce/index.jsx'))
const ManageConsent = lazy(() => import('../pages/settings/manage-consent/index.jsx'))
const Reminders = lazy(() => import('../pages/settings/reminders/index.jsx'))
const ManageGoal = lazy(() => import('../pages/settings/manage-goal/index.jsx'))
const Logs = lazy(() => import('../pages/logs/index.jsx'))
const Insights = lazy(() => import('../pages/insights/index.jsx'))
const StaticContent = lazy(() => import('../pages/static-content/index.jsx'))
const FAQs = lazy(() => import('../pages/static-content/faq/FAQs.jsx'))
const Privacy = lazy(() => import('../pages/static-content/Privacy.jsx'))
const Terms = lazy(() => import('../pages/static-content/Terms.jsx'))
const HelpSupport = lazy(() => import('../pages/help&Support/index.jsx'))
const LegalContent = lazy(() => import('../pages/static-content/commonLegalContent/LegalContent.jsx'))
const EducationalContent = lazy(() => import('../pages/Home/RecomendedContent/index.jsx'))

const privateRoute = {
  path: ROUTES.BASE_ROUTE,
  element: (
    <PrivateGate />
  ),
  children: [
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_1, element: <PersonalInfo /> },
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_2, element: <CycleHealth /> },
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_3, element: <Preferences /> },

    { path: ROUTES.FEATURE_ROUTES.HOME, element: withDashboard(Home) },
    { path: ROUTES.FEATURE_ROUTES.DASHBOARD, element: withDashboard(Dashboard) },
    { path: ROUTES.FEATURE_ROUTES.INSIGHTS, element: withDashboard(Insights) },
    { path: ROUTES.FEATURE_ROUTES.LOGS, element: withDashboard(Logs) },
   
    {
      path: ROUTES.FEATURE_ROUTES.SETTINGS.BASE_ROUTE,
      element: withDashboard(() => (
        <div style={{ width: '100%' }}>
          <Outlet />
        </div>
      )),
      children: [

        { index: true, element: <Navigate to={ROUTES.FEATURE_ROUTES.SETTINGS.LANGUAGE} replace /> },
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.MANAGE_CONSENT, element: <ManageConsent /> },
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.REMINDERS, element: <Reminders />  },
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.LANGUAGE, element: <LanguagePreference /> },
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.TRACKING_PREFERENCE, element: <TrackingPreference /> },
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.MANAGE_GOAL, element: <ManageGoal /> }
      ]
    },
    {
      path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.BASE_ROUTE,
      element: withDashboard(() => (
        <div style={{ width: '100%' }}>
          <Outlet />
        </div>
      )),
      children: [
        { index: true, element: <Navigate to={ROUTES.FEATURE_ROUTES.STATIC_CONTENT.FAQS} replace /> },
        { path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.FAQS, element: <FAQs /> },
        { path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.LEGAL.TERMS, element: <Terms /> },
        { path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.LEGAL.PRIVACY, element: <Privacy /> },
        { path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.PAGE, element: <StaticContent /> }
      ]
    },
    { path: ROUTES.FEATURE_ROUTES.HELP_SUPPORT, element: withDashboard(HelpSupport) },
    { path: ROUTES.FEATURE_ROUTES.EDUCATIONAL_CONTENT, element: withDashboard(EducationalContent) }
  ]
}

export default privateRoute

function isAuthenticated() {
  return !!localStorage.getItem('auth')
}

function PrivateGate() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.AUTH_ROUTES.LOGIN} replace />
}




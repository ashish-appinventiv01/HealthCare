/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import ROUTES from './routes'
import CommonLoader from '@components/common/common-loader'

const DashboardLayout = lazy(() => import('@layouts/dashboardLayout'))

const withDashboard = (Component) => (
  <DashboardLayout>
    <Suspense fallback={<CommonLoader />}>
      <Component />
    </Suspense>
  </DashboardLayout>
)

const PersonalInfo = lazy(() => import('@pages/onboarding/PersonalInfo'))
const CycleHealth = lazy(() => import('@pages/onboarding/CycleHealth'))
const Preferences = lazy(() => import('@pages/onboarding/Preferences'))
const Community = lazy(() => import('@pages/onboarding/Community'))

const Dashboard = lazy(() => import('@pages/dashboard'))
const Home = lazy(() => import('@pages/home'))
const LanguagePreference = lazy(() => import('@pages/settings/language-prefernce'))
const TrackingPreference = lazy(() => import('@pages/settings/tracking-prefernce'))
const ManageConsent = lazy(() => import('@pages/settings/manage-consent'))
const Reminders = lazy(() => import('@pages/settings/reminders'))
const ManageGoal = lazy(() => import('@pages/settings/manage-goal'))
const Logs = lazy(() => import('@pages/logs'))
const Insights = lazy(() => import('@pages/insights'))
const StaticContent = lazy(() => import('@pages/static-content'))
const FAQs = lazy(() => import('@pages/static-content/faq/FAQs'))
const Privacy = lazy(() => import('@pages/static-content/Privacy'))
const Terms = lazy(() => import('@pages/static-content/Terms'))
const HelpSupport = lazy(() => import('@pages/help&Support'))
const LegalContent = lazy(() => import('@pages/static-content/commonLegalContent/LegalContent'))
const EducationalContent = lazy(() => import('@pages/home/RecomendedContent'))

function isAuthenticated() {
  return !!localStorage.getItem('auth')
}

function PrivateGate() {
  return isAuthenticated() ? <Outlet /> : <Navigate to={ROUTES.AUTH_ROUTES.LOGIN} replace />
}

const privateRoute = {
  path: ROUTES.BASE_ROUTE,
  element: <PrivateGate />,
  children: [
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_1, element: <PersonalInfo /> },
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_2, element: <CycleHealth /> },
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_3, element: <Preferences /> },
    { path: ROUTES.FEATURE_ROUTES.ONBOARDING.STEP_4, element: <Community /> },

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
        { path: ROUTES.FEATURE_ROUTES.SETTINGS.REMINDERS, element: <Reminders /> },
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


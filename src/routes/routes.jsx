const ROUTES = {
  BASE_ROUTE: '/',
  AUTH_ROUTES: {
    LANGUAGE_SELECT: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot',
    VERIFY_CODE: '/verify'
  },
  FEATURE_ROUTES: {
    ONBOARDING: {
      STEP_1: '/onboarding/step-1',
      STEP_2: '/onboarding/step-2',
      STEP_3: '/onboarding/step-3'
    },
    HOME: '/home',
    DASHBOARD: '/dashboard',
    INSIGHTS: '/insights',
    LOGS: '/logs',
   
    SETTINGS: {
    REMINDERS: '/settings/reminders',
      BASE_ROUTE: '/settings',
      LANGUAGE: '/settings/language',
      TRACKING_PREFERENCE: '/settings/tracking-preference',
      MANAGE_CONSENT: '/settings/manage-consent',
      MANAGE_GOAL: '/settings/manage-goal'
    },
    STATIC_CONTENT: {
      BASE_ROUTE: '/static-content',
      FAQS: '/static-content/faqs',
      LEGAL: {
        TERMS: '/static-content/legal/terms',
        PRIVACY: '/static-content/legal/privacy'
      },
      PAGE: '/static-content/:page'
    },
    HELP_SUPPORT: '/help-support',
    EDUCATIONAL_CONTENT: '/educational-content'
  }
}

export default ROUTES



import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'
import ROUTES from '@routes/routes'

// Default helper hook following the pattern of other helpers
export default function useDashboardLayoutHelper() {
  const navigate = useNavigate()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeSubItem, setActiveSubItem] = useState('Manage Goals')
  const [isStaticOpen, setIsStaticOpen] = useState(false)
  const [activeStaticItem, setActiveStaticItem] = useState('FAQs')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate(ROUTES.AUTH_ROUTES.LOGIN)
  }

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true)
  }

  const handleDeleteAccount = () => {
    console.log('Account deletion confirmed')
    setIsDeleteModalOpen(false)
  }

  const menuItems = [
    { label: 'Home', path: ROUTES.FEATURE_ROUTES.HOME },
    { label: 'Logs', path: ROUTES.FEATURE_ROUTES.LOGS },
    { label: 'Insights', path: ROUTES.FEATURE_ROUTES.INSIGHTS },
    { label: 'Static Content', path: ROUTES.FEATURE_ROUTES.DASHBOARD },
    { label: 'Help & Support', path: ROUTES.FEATURE_ROUTES.HELP_SUPPORT },
    { label: 'Logout', path: null }
  ]

  const settingsItems = [
    { label: 'Manage Goals', path: ROUTES.FEATURE_ROUTES.SETTINGS.MANAGE_GOAL },
    { label: 'Reminders', path: ROUTES.FEATURE_ROUTES.SETTINGS.REMINDERS },
    { label: 'Tracking Preference', path: ROUTES.FEATURE_ROUTES.SETTINGS.TRACKING_PREFERENCE },
    { label: 'Language Preference', path: ROUTES.FEATURE_ROUTES.SETTINGS.LANGUAGE },
    { label: 'Manage Connected Device' },
    { label: 'Manage Your Consent', path: ROUTES.FEATURE_ROUTES.SETTINGS.MANAGE_CONSENT }
  ]

  const staticItems = [
    { label: 'FAQs', path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.FAQS },
    { label: 'Terms of Use', path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.LEGAL.TERMS },
    { label: 'Privacy Policy', path: ROUTES.FEATURE_ROUTES.STATIC_CONTENT.LEGAL.PRIVACY }
  ]

  return {
    // state
    isSettingsOpen,
    setIsSettingsOpen,
    activeSubItem,
    setActiveSubItem,
    isStaticOpen,
    setIsStaticOpen,
    activeStaticItem,
    setActiveStaticItem,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isLogoutModalOpen,
    setIsLogoutModalOpen,
    isNotificationModalOpen,
    setIsNotificationModalOpen,
    // handlers
    handleLogout,
    handleLogoutClick,
    handleDeleteAccount,
    // data
    menuItems,
    settingsItems,
    staticItems,
  }
}

// Named export maintained for backward compatibility where navigate is passed in
export function handleLogout(navigate: NavigateFunction) {
  localStorage.removeItem('auth')
  navigate(ROUTES.AUTH_ROUTES.LOGIN)
}

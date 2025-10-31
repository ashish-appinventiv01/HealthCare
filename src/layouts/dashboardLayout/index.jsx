import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../components/Modals/deleteAccountModal/index.jsx'
import NotificationModal from '../../components/Modals/notificationModal/index.jsx'
import logoutIcon from '../../assets/icons/logout.svg'
import ROUTES from '../../routes/routes.jsx'
import { ArrowRight as arrowRight, Chevron as chevron, Notification as notification } from '../../assets/index.js'

export default function DashboardLayout({ children }) {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Home', path: '/home' },
    { label: 'Logs', path: '/logs' },
    { label: 'Insights', path: '/insights' },
    // Settings rendered as expandable group below
    { label: 'Static Content', path: '/dashboard' },
    { label: 'Help & Support', path: '/help-support' },
    { label: 'Logout', path: null }
  ]

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeSubItem, setActiveSubItem] = useState('Manage Goals')
  const [isStaticOpen, setIsStaticOpen] = useState(false)
  const [activeStaticItem, setActiveStaticItem] = useState('FAQs')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)

  const settingsItems = [
    { label: 'Manage Goals', path: '/settings/manage-goal' },
    { label: 'Reminders', path: ROUTES.FEATURE_ROUTES.SETTINGS.REMINDERS },
    { label: 'Tracking Preference', path: '/settings/tracking-preference' },
    { label: 'Language Preference', path: '/settings/language' },
    { label: 'Manage Connected Device' },
    { label: 'Manage Your Consent', path: '/settings/manage-consent' }
  ]

  const staticItems = [
    { label: 'FAQs', path: '/static-content/faqs' },
    { label: 'Terms of Use', path: '/static-content/legal/terms' },
    { label: 'Privacy Policy', path: '/static-content/legal/privacy' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate(ROUTES.AUTH_ROUTES.LOGIN)
  }

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true)
  }

  const handleDeleteAccount = () => {
    // Add your delete account logic here
    console.log('Account deletion confirmed')
    setIsDeleteModalOpen(false)
    // You might want to call an API to delete the account
    // and then redirect to login or a confirmation page
  }

  const ArrowIcon = () => (
    <img src={arrowRight} alt="" width={24} height={24} />
  )

  const ChevronIcon = ({ rotated = false }) => (
    <img src={chevron} alt="" className={rotated ? 'chevron rotated' : 'chevron'} width={20} height={20} />
  )

  const NotificationIcon = () => (
    <img src={notification} alt="" width={30} height={30} />
  )

  return (
    <div className="dashboard-shell">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-brand">CWCNFP</div>
        <div className="dashboard-header-actions">
          <div 
            className="notification-icon-wrapper" 
            onClick={() => setIsNotificationModalOpen(!isNotificationModalOpen)}
            style={{ cursor: 'pointer' }}
          >
            <NotificationIcon />
          </div>
          <div className="user-avatar-small" onClick={() => navigate(ROUTES.FEATURE_ROUTES.DASHBOARD)} style={{ cursor: 'pointer' }}>
            <span>MJ</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* User Profile Section */}
        <div className="sidebar-profile" onClick={() => navigate(ROUTES.FEATURE_ROUTES.DASHBOARD)} style={{ cursor: 'pointer' }}>
          <div className="user-avatar-large">
            <span>MJ</span>
          </div>
          <div className="user-info">
            <h3 className="user-name">Maria Johns</h3>
            <p className="user-email">Mariajons983@gmail.com</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {/* Top-level before Settings */}
          {menuItems.slice(0, 3).map((item, index) => (
            <button
              key={index}
              className={`nav-item`}
              onClick={item.label === 'Logout' ? handleLogoutClick : () => {
                setIsSettingsOpen(false)
                setIsStaticOpen(false)
                if (item.path) navigate(item.path)
              }}
            >
              <span>{item.label}</span>
              <ArrowIcon />
            </button>
          ))}

          {/* Settings expandable group */}
          <div className={`nav-group ${isSettingsOpen ? 'open' : ''}`}>
            <button
              className="nav-item nav-group-header"
              onClick={() => {
                if (!isSettingsOpen) {
                  setIsSettingsOpen(true)
                  setIsStaticOpen(false)
                  setActiveSubItem('Manage Goals')
                  navigate(ROUTES.FEATURE_ROUTES.SETTINGS.BASE_ROUTE)
                }
              }}
            >
              <span>Settings</span>
              <ChevronIcon rotated={isSettingsOpen} />
            </button>
            {isSettingsOpen && (
              <div className="nav-submenu">
                {settingsItems.map((s, i) => (
                  <button
                    key={s.label}
                    className={`submenu-item ${activeSubItem === s.label ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSubItem(s.label)
                      if (s.path) navigate(s.path)
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Static Content expandable group */}
          <div className={`nav-group ${isStaticOpen ? 'open' : ''}`}>
            <button
              className="nav-item nav-group-header"
              onClick={() => {
                if (!isStaticOpen) {
                  setIsStaticOpen(true)
                  setIsSettingsOpen(false)
                  setActiveStaticItem('FAQs')
                  navigate(ROUTES.FEATURE_ROUTES.STATIC_CONTENT.BASE_ROUTE)
                }
              }}
            >
              <span>Static Content</span>
              <ChevronIcon rotated={isStaticOpen} />
            </button>
            {isStaticOpen && (
              <div className="nav-submenu">
                {staticItems.map((s) => (
                  <button
                    key={s.label}
                    className={`submenu-item ${activeStaticItem === s.label ? 'active' : ''}`}
                    onClick={() => {
                      setActiveStaticItem(s.label)
                      if (s.path) navigate(s.path)
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Remaining items after Settings (excluding Static Content which is now a group) */}
          {menuItems.slice(3).filter((item) => item.label !== 'Static Content').map((item, index) => (
            <button
              key={`after-${index}`}
              className={`nav-item`}
              onClick={item.label === 'Logout' ? handleLogoutClick : () => {
                setIsSettingsOpen(false)
                setIsStaticOpen(false)
                if (item.path) navigate(item.path)
              }}
            >
              <span>{item.label}</span>
              {item.label !== 'Logout' ? <ArrowIcon /> : null}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="version-info">Version 9.86.01</div>
          <button 
            className="delete-account"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Account
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {children}
      </main>

      {/* Delete Account Modal */}
      <ConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        title="Delete"
        subtitle="Are you sure you want to Delete your account?"
        confirmButtonText="Delete"
      />

      {/* Logout Modal */}
      <ConfirmationModal
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Logout"
        subtitle="Are you sure you want to logout"
        icon={logoutIcon}
        confirmButtonText="Logout"
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </div>
  )
}

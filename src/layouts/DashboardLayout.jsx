import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../components/DeleteAccountModal'
import NotificationModal from '../components/NotificationModal'
import logoutIcon from '../assets/icons/logout.svg'

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

  const [isSettingsOpen, setIsSettingsOpen] = useState(true)
  const [activeSubItem, setActiveSubItem] = useState('Manage Goals')
  const [isStaticOpen, setIsStaticOpen] = useState(false)
  const [activeStaticItem, setActiveStaticItem] = useState('FAQs')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)

  const settingsItems = [
    { label: 'Manage Goals', path: '/settings' },
    { label: 'Reminders', path: '/reminders' },
    { label: 'Tracking Preference', path: '/settings/tracking-preference' },
    { label: 'Language Preference', path: '/settings/language' },
    { label: 'Manage Connected Device' },
    { label: 'Manage Your Consent', path: '/settings/manage-consent' }
  ]

  const staticItems = [
    { label: 'FAQs', path: '/faqs' },
    { label: 'Terms of Use', path: '/legal/terms' },
    { label: 'Privacy Policy', path: '/legal/privacy' }
  ]

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
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
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5601 12.8278L8.61035 7.87808L10.0246 6.46387L16.3885 12.8278L10.0246 19.1917L8.61035 17.7775L13.5601 12.8278Z" fill="#191919"/>
    </svg>
  )

  const ChevronIcon = ({ rotated = false }) => (
    <svg
      className={rotated ? 'chevron rotated' : 'chevron'}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z" fill="#191919"/>
    </svg>
  )

  const NotificationIcon = () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_167_3315)">
        <path d="M19.003 25.6447C19.003 28.4061 16.7643 30.6446 14.0029 30.6446C11.2414 30.6446 9.00293 28.4061 9.00293 25.6447C9.00293 22.8832 11.2414 20.6445 14.0029 20.6445C16.7643 20.6445 19.003 22.8832 19.003 25.6447Z" fill="white"/>
        <path d="M22.7628 15.5458C18.5253 14.9406 15.253 11.2968 15.253 6.89453C15.253 5.64438 15.5203 4.45831 15.9941 3.38188C15.3542 3.23196 14.6893 3.14453 14.0029 3.14453C9.17802 3.14453 5.25293 7.0694 5.25293 11.8945V15.3794C5.25293 17.8532 4.16917 20.1882 2.26785 21.7957C1.78171 22.2106 1.50293 22.8169 1.50293 23.4569C1.50293 24.6633 2.48415 25.6445 3.69035 25.6445H24.3154C25.5218 25.6445 26.503 24.6633 26.503 23.4569C26.503 22.8169 26.2242 22.2106 25.7255 21.7844C23.8805 20.2232 22.8105 17.9568 22.7628 15.5458Z" fill="white"/>
        <path d="M30.2531 6.89461C30.2531 10.3464 27.4548 13.1445 24.003 13.1445C20.5512 13.1445 17.7529 10.3464 17.7529 6.89461C17.7529 3.44284 20.5512 0.644531 24.003 0.644531C27.4548 0.644531 30.2531 3.44284 30.2531 6.89461Z" fill="#F81713"/>
      </g>
      <defs>
        <clipPath id="clip0_167_3315">
          <rect width="30" height="30" fill="white" transform="translate(0.858398 0.644531)"/>
        </clipPath>
      </defs>
    </svg>
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
          <div className="user-avatar-small" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <span>MJ</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        {/* User Profile Section */}
        <div className="sidebar-profile" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
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
              onClick={item.label === 'Logout' ? handleLogoutClick : () => item.path && navigate(item.path)}
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
                const next = !isSettingsOpen
                setIsSettingsOpen(next)
                if (next) setIsStaticOpen(false)
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
                const next = !isStaticOpen
                setIsStaticOpen(next)
                if (next) setIsSettingsOpen(false)
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
              onClick={item.label === 'Logout' ? handleLogoutClick : () => item.path && navigate(item.path)}
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

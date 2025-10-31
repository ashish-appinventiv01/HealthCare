import React from 'react'

const NotificationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const notifications = [
    {
      id: 1,
      type: 'Update',
      message: 'Your mensuration may began today',
      timestamp: '2 minutes ago',
      isUnread: true
    },
    {
      id: 2,
      type: 'Update',
      message: 'Your ovulation period has ended.',
      timestamp: '45 minutes ago',
      isUnread: false
    },
    {
      id: 3,
      type: 'Update',
      message: 'Your fertile window is closing soon.',
      timestamp: '5 hour ago',
      isUnread: false
    }
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className="notification-backdrop" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="notification-modal">
        <div className="notification-title">Notifications</div>
        
        <div className="notification-content">
          <div className="notification-list">
            {notifications.map((notification, index) => (
              <div key={notification.id}>
                <div className="notification-item">
                  <div className="notification-item-content">
                    <div className="notification-type-row">
                      <div className="notification-type">{notification.type}</div>
                      {notification.isUnread && (
                        <div className="notification-dot"></div>
                      )}
                    </div>
                    <div className="notification-message">{notification.message}</div>
                  </div>
                  <div className="notification-timestamp-row">
                    <div className="notification-timestamp">{notification.timestamp}</div>
                  </div>
                </div>
                {index < notifications.length - 1 && (
                  <div className="notification-divider"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationModal


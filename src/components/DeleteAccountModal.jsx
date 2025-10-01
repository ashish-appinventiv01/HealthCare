import Modal from './Modal'
import deleteUserIcon from '../assets/icons/delete_user.svg'
import logoutIcon from '../assets/icons/logout.svg'

export default function ConfirmationModal({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Delete",
  subtitle = "Are you sure you want to Delete your account?",
  icon = deleteUserIcon,
  confirmButtonText = "Delete",
  cancelButtonText = "Cancel"
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="delete-account-modal">
        {/* Icon Container */}
        <div className="delete-icon-container">
          <img 
            src={icon} 
            alt={title} 
            className={icon === logoutIcon ? "delete-icon logout-icon" : "delete-icon"} 
          />
        </div>
        
        {/* Title */}
        <h2 className="delete-modal-title">{title}</h2>
        
        {/* Description */}
        <p className="delete-modal-description">
          {subtitle}
        </p>
        
        {/* Action Buttons */}
        <div className="delete-modal-actions">
          <button 
            className="delete-modal-cancel-btn"
            onClick={onClose}
          >
            {cancelButtonText}
          </button>
          <button 
            className="delete-modal-delete-btn"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

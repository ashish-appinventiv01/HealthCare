import type { ReactNode, MouseEvent } from 'react'

interface ModalProps {
  title?: ReactNode
  children?: ReactNode
  open: boolean
  onClose: (e?: MouseEvent<HTMLDivElement>) => void
  footer?: ReactNode
}

export default function Modal({ title, children, open, onClose, footer }: ModalProps) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          {title && <h3 className="modal-heading">{title}</h3>}
          <div>{children}</div>
          {footer}
        </div>

      </div>
    </div>
  )
}


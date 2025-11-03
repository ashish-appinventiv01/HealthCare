import { useState } from 'react'
import type { ReactElement, ReactNode } from 'react'

type CommonTooltipProps = {
  content: ReactNode
  iconSrc?: string
  iconAlt?: string
  iconWidth?: number
  iconHeight?: number
  className?: string
}

export default function CommonTooltip({
  content,
  iconSrc = '/src/assets/icons/Icon.svg',
  iconAlt = 'info',
  iconWidth = 15,
  iconHeight = 15,
  className
}: CommonTooltipProps): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div
      className={`info-icon-container${className ? ` ${className}` : ''}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
      {isOpen && (
        <div className="tooltip">
          <div className="tooltip-content">
            {content}
          </div>
        </div>
      )}
    </div>
  )
}



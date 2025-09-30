import blueBg from '../assets/Images/blue_background.png'
import mask from '../assets/Images/mask.png'
import { Outlet } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, contentClassName }) {
  return (
    <div className="auth-shell">
      <div
        className="auth-left"
        style={{
          backgroundImage: `url(${blueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <img
          src={mask}
          alt="mask"
          style={{
            position: 'absolute',
            left: '50%',
            top: '35%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            objectFit: 'contain',
            pointerEvents: 'none',
          }}
        />
        <div className="mark">Cwcnfp</div>
      </div>
      <div className="auth-right">
        <div className={`panel${contentClassName ? ' ' + contentClassName : ''}`}>
          {title && <h1>{title}</h1>}
          {subtitle && <p className="sub">{subtitle}</p>}
          {children || <Outlet />}
        </div>
      </div>
    </div>
  )
}


import blueBg from '../assets/Images/blue_background.png'
import mask from '../assets/Images/mask.png'
import { Outlet } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, contentClassName }) {
  return (
    <div className="auth-shell">
      <div
        className="auth-left"
        style={{
          position: 'relative',
          backgroundImage: `url(${blueBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '5vw',
            left: 0,
            width: '100%',
            height: '50%', // top half
          }}
        >
          <img
      src={mask}
      alt="mask"
      style={{
        width: '100%',
        height: '100%',
        // objectFit: 'contain', // image scales to fit inside child div
        pointerEvents: 'none',
      }}
    />
   <span
    style={{
      position: 'absolute',
      bottom: '1.25vw',  // changed from 1.25rem to vw
      right: '1.25vw',   // changed from 1.25rem to vw
      fontFamily: 'Poppins',
      fontWeight: 600,
      fontStyle: 'normal',
      fontSize: '2.5vw',
      lineHeight: '125%',
      letterSpacing: '0px',
      textAlign: 'center',
      color: '#fff',
  }}
  
    >
      Cwcnfp
    </span>
          {/* Content of top half div */}
        </div>
        
        
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


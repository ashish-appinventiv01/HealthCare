import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import './App.css'

import Login from './pages/auth/Login.jsx'
import LanguageSelect from './pages/auth/LanguageSelect.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import VerifyCode from './pages/auth/VerifyCode.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'
import PersonalInfo from './pages/onboarding/PersonalInfo.jsx'
import CycleHealth from './pages/onboarding/CycleHealth.jsx'
import Preferences from './pages/onboarding/Preferences.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/" element={<LanguageSelect />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/reset" element={<ResetPassword />} />
        {/* Onboarding */}
        <Route path="/onboarding/step-1" element={<PersonalInfo />} />
        <Route path="/onboarding/step-2" element={<CycleHealth />} />
        <Route path="/onboarding/step-3" element={<Preferences />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  )
}

export default App

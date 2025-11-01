import useManageConsentHelper from './manage-consent.helper'

export default function ManageConsent() {
  const { consentItems } = useManageConsentHelper()

  return (
    <div className="reminders-shell">
      <div className="consent-shell">
        <h2 className="consent-title">Manage Consent</h2>

        <div className="consent-content">
          {consentItems.map((item) => (
            <label key={item.title} className="consent-item-row">
              <input type="checkbox" className="consent-checkbox" defaultChecked />
              <div className="consent-stack">
                <div className="consent-item-title">{item.title}</div>
                <div className="consent-item-desc">{item.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}



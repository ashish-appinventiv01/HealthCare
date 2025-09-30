export default function ManageConsent() {
  const consentItems = [
    {
      title: "Privacy Policy Agreement",
      description:
        "I have read and agree to the privacy policy regarding how my personal data will be processed.",
    },
    {
      title: "Data Collection Consent",
      description:
        "I consent to the collection and processing of my cycle and health data for app functionality.",
    },
    {
      title: "Sensitive Health Information",
      description:
        "I understand that I will be logging sensitive health information and consent to its secure storage.",
    },
    {
      title: "Terms of Service",
      description:
        "I agree to the terms of service and understand my rights regarding data deletion and access.",
    },
  ];

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



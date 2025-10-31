import useLanguagePreferenceHelper from "./language-prefernce.helper.jsx";
import { Card } from "@/components/ui/card";

const LanguagePreference = () => {
  const { language, handleChange } = useLanguagePreferenceHelper();

  return (
    <div className="reminders-shell">
      <Card className="settings-card">
        <h2 style={{ margin: '16px 0 24px 0', color: '#1a79bd' }}>Language Preference</h2>
        <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 8px', cursor: 'pointer' }}>
            <span style={{ fontWeight: 600 }}>English</span>
            <input
              type="radio"
              name="language"
              value="en"
              checked={language === "en"}
              onChange={() => handleChange("en")}
            />
          </label>
          <div style={{ height: 1, background: '#E7E9EF' }} />
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 8px', cursor: 'pointer' }}>
            <span style={{ fontWeight: 600 }}>Español</span>
            <input
              type="radio"
              name="language"
              value="es"
              checked={language === "es"}
              onChange={() => handleChange("es")}
            />
          </label>
        </div>
      </Card>
    </div>
  );
};

export default LanguagePreference;



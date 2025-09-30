import { useState } from "react";
import { GoalToggle } from "@/components/GoalToggle";
import { Card } from "@/components/ui/card";

const TrackingPreference = () => {
  const [preferences, setPreferences] = useState({
    basalBodyTemperature: true,
    fshTestResult: true,
    lhTestResult: true,
    estrogenLevelTest: false,
    progesteroneTestResult: false,
    insightsWithHcp: false,
  });

  const toggle = (key) => {
    setPreferences((p) => ({ ...p, [key]: !p[key] }));
  };

  const items = [
    { key: "basalBodyTemperature", label: "Basal Body Temperature" },
    { key: "fshTestResult", label: "FSH Test Result" },
    { key: "lhTestResult", label: "LH Test Result" },
    { key: "estrogenLevelTest", label: "Estrogen Level Test" },
    { key: "progesteroneTestResult", label: "Progesterone Test Result" },
    { key: "insightsWithHcp", label: "My Insights with HCP" },
  ];

  return (
    <div className="reminders-shell">
      <Card className="settings-card">
        <h2 style={{ margin: '16px 0 24px 0', color: '#1a79bd' }}>Tracking Preference</h2>
        <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 16 }}>
          {items.map((item, idx) => (
            <GoalToggle
              key={item.key}
              label={item.label}
              checked={preferences[item.key]}
              onChange={() => toggle(item.key)}
              isLast={idx === items.length - 1}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TrackingPreference;



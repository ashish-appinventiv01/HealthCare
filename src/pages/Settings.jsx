import { useState } from "react";
import { GoalToggle } from "@/components/GoalToggle";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [goals, setGoals] = useState({
    periodPredictions: false,
    periodNotifications: false,
    fertilityEstimation: false,
    fertilityNotification: false,
    cycleDeviation: false,
    manageSymptoms: false,
  });

  const toggle = (key) => {
    setGoals((g) => ({ ...g, [key]: !g[key] }));
  };

  const items = [
    { key: "periodPredictions" , label: "Period Predictions" },
    { key: "periodNotifications" , label: "Period Notifications" },
    { key: "fertilityEstimation", label: "Fertility Status Estimation" },
    { key: "fertilityNotification" , label: "Fertility Status Notification" },
    { key: "cycleDeviation" , label: "Cycle Deviation" },
    { key: "manageSymptoms", label: "Manage Symptoms" },
  ];

  return (
    <div className="reminders-shell">
     
      <Card className="settings-card" >
      <h2 style={{ margin: '16px 0 24px 0', color: '#1a79bd' }}>Manage Goals</h2>
        <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 16 }}>
       
          {items.map((item, idx) => (
            <GoalToggle
              key={item.key}
              label={item.label}
              checked={goals[item.key]}
              onChange={() => toggle(item.key)}
              isLast={idx === items.length - 1}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Index;
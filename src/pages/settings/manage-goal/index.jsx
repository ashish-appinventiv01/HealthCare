import { GoalToggle } from "@/components/common/common-goaltoggle/index.jsx";
import { Card } from "@/components/ui/card";
import useManageGoalHelper from "./manage-goal.helper.jsx";

const Index = () => {
  const { goals, toggle, items } = useManageGoalHelper();

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
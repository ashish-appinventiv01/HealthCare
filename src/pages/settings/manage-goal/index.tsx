import { GoalToggle } from "@components/common/common-goaltoggle";
import { Card } from "@components/ui/card";
import useManageGoalHelper from "./manage-goal.helper";

const Index = () => {
  const { goals, toggle, items } = useManageGoalHelper();

  return (
    <div className="home-container">
     
      <Card >
        <div className="pages-header">
          <h2 className="title-style">Manage Goals</h2>
        </div>
        <div className="pages-list">
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
        </div>
      </Card>
      
    </div>
  );
};

export default Index;
import { GoalToggle } from "@components/common/common-goaltoggle";
import { Card } from "@components/ui/card";
import useTrackingPreferenceHelper from "./tracking-predernce.helper";

const TrackingPreference = () => {
  const { preferences, toggle, items } = useTrackingPreferenceHelper();

  return (
    <div className="home-container">
      <Card >
        <div className="pages-header">
          <h2 className="title-style">Tracking Preference</h2>
        </div>
        <div className="pages-list">
        <div style={{ border: '1px solid #E7E9EF', borderRadius: 8, padding: 16}}>
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
        </div>
      </Card>
    </div>
  );
};

export default TrackingPreference;



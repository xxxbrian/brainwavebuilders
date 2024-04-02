import { UserSevenDayActivity } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import React, { useEffect, useState } from "react";

// Define and export the ActivityProps type

interface Props {
  activities?: UserSevenDayActivity;
}

// The Activity component now takes ActivityProps as props
export const UserSevenDayActivitiesDisplay: React.FC<Props> = ({
  activities,
}) => {
  const getHeights = () => {
    return {
      Mon: (activities?.activities[0] ?? 0 / 12) * 8,
      Tues: (activities?.activities[1] ?? 0 / 12) * 8,
      Wed: (activities?.activities[2] ?? 0 / 12) * 8,
      Thurs: (activities?.activities[3] ?? 0 / 12) * 8,
      Fri: (activities?.activities[4] ?? 0 / 12) * 8,
      Sat: (activities?.activities[5] ?? 0 / 12) * 8,
      Sun: (activities?.activities[6] ?? 0 / 12) * 8,
    };
  };

  // Function to determine the bar color
  const barColor = (day: string) => {
    return "bg-blue-200";
  };

  return (
    <div className="flex flex-col ml-1 font-bold">
      <div className="flex mt-4 px-5 h-48">
        {Object.entries(getHeights()).map(([day, height]) => (
          <div
            key={day}
            className="px-3 py-1.5 flex flex-col mx-auto justify-end"
          >
            <div
              style={{ height: `${height}rem` }}
              className={`${barColor(day)} w-8 rounded-xl`}
            ></div>
            <p className="mx-auto mt-1">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const StatefulUserSevenDayActivitiesDisplay: React.FC = () => {
  const [activities, setActivities] = useState<UserSevenDayActivity>();

  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      // Fetch the user's activities
      const { activity } = await backend.fetchUserSevenDayActivity({});
      setActivities(activity);
    };

    void inner();
  }, [backend]);

  return <UserSevenDayActivitiesDisplay activities={activities} />;
};

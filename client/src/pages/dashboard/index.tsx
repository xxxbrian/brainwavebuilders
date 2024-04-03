import React, { PropsWithChildren } from "react";
import { StatefulUserStatsDisplay } from "../../components/dashboard/Stats";
import { StatefulUserSevenDayActivitiesDisplay } from "../../components/dashboard/Activity";
import { PageFrame } from "@/components/structural/PageFrame";
import { CreateCourseButton } from "@/components/dashboard/CreateCoursePopup";
import { JoinCourseButton } from "@/components/dashboard/JoinCoursePopup";
import { Card, Heading } from "@radix-ui/themes";
import { StatefulUpcomingDueDatesDisplay } from "@/components/dashboard/UpcomingDueDates";
import { CoursesContainer } from "@/components/dashboard/Courses";
import { CourseData } from "@/utils/data";

interface DashboardItemProps extends PropsWithChildren {
  className?: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  className,
  children,
}) => {
  return <div className={`m-4 ${className}`}>{children}</div>;
};

export const Dashboard: React.FC = () => {
  // Example data for stats

  const dashboardButtons = (
    <>
      <CreateCourseButton />
      <JoinCourseButton />
    </>
  );

  return (
    <PageFrame title="Dashboard" right={dashboardButtons}>
      <div className="flex flex-col space-y-12 py-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap">
          <DashboardItem className="flex flex-col m-4">
            <Heading>Activity</Heading>
            <div className="flex flex-col space-x-4 w-fit object-center justify-center items-center">
              <StatefulUserStatsDisplay className="mx-auto" />
              <StatefulUserSevenDayActivitiesDisplay />
            </div>
          </DashboardItem>
          <DashboardItem className="flex-1 flex flex-col flex-shrink-0 m-4 space-y-4">
            <Heading>Upcoming Due Dates</Heading>
            <Card className="h-full">
              <StatefulUpcomingDueDatesDisplay />
            </Card>
          </DashboardItem>
        </div>

        <DashboardItem className="flex flex-col space-y-4">
          <Heading>Starred</Heading>
          <CoursesContainer
            courses={[
              CourseData,
              CourseData,
              CourseData,
              CourseData,
              CourseData,
            ]}
          />
        </DashboardItem>

        <DashboardItem className="flex flex-col space-y-4">
          <Heading>My Courses</Heading>
          <CoursesContainer courses={[CourseData]} />
        </DashboardItem>
      </div>
    </PageFrame>
  );
};

export default Dashboard;

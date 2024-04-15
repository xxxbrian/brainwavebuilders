"use client";

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { StatefulUserStatsDisplay } from "../../components/dashboard/Stats";
import { StatefulUserSevenDayActivitiesDisplay } from "../../components/dashboard/Activity";
import { PageFrame } from "@/components/structural/PageFrame";
import { CreateCourseButton } from "@/components/dashboard/CreateCoursePopup";
import { JoinCourseButton } from "@/components/dashboard/JoinCoursePopup";
import { Card, Heading } from "@radix-ui/themes";
import { CoursesContainer } from "@/components/dashboard/Courses";
import { UpcomingEvents } from "@/components/calendar/UpcomingEvents";
import { Course } from "@/backend";
import { useRouter } from "next/navigation";
import { useBackend } from "@/hooks/useBackend";
import { type Event } from "@/components/calendar/Calendar";
import { StatefulAnnouncementsWidget } from "@/components/announcements/AnnouncementsWidget";

interface DashboardItemProps extends PropsWithChildren {
  className?: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({
  className,
  children,
}) => {
  return <div className={`p-4 ${className}`}>{children}</div>;
};

export const Dashboard: React.FC = () => {
  // Example data for stats

  const dashboardButtons = (
    <>
      <CreateCourseButton />
      <JoinCourseButton />
    </>
  );

  const router = useRouter();

  const onClickOpenCourse = useCallback(
    (course: Course) => {
      router.push(`/course/${course.id}`);
    },
    [router],
  );

  const [courses, setCourses] = useState<Course[]>([]);

  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      const { courses } = await backend.getUserCourses({});
      setCourses(courses);
    };

    void inner();
  }, [backend]);

  const [events, setEvents] = useState<Record<string, Event[]>>({});
  useEffect(() => {
    const inner = async () => {
      const { events } = await backend.getUserEvents({});
      setEvents(events);
    };

    void inner();
  }, [backend]);

  return (
    <PageFrame title="Dashboard" right={dashboardButtons} standardWidth>
      <div className="flex flex-col space-y-12">
        <div className="flex flex-wrap">
          {/* <DashboardItem className="flex flex-col m-4">
            <Heading>Activity</Heading>
            <div className="flex flex-col space-x-4 w-fit object-center justify-center items-center">
              <StatefulUserStatsDisplay className="mx-auto" />
              <StatefulUserSevenDayActivitiesDisplay />
            </div>
          </DashboardItem> */}
          <DashboardItem className="flex flex-col w-1/2 space-y-4">
            <Heading>Announcements</Heading>
            <StatefulAnnouncementsWidget className="w-full" />
          </DashboardItem>
          <DashboardItem className="w-1/2 flex flex-col flex-shrink-0 space-y-4 h-fit min-h-64">
            <Heading>Key Dates</Heading>
            <Card className="h-full">
              <UpcomingEvents
                today={new Date()}
                events={events}
                showEventNumber={4}
              />
            </Card>
          </DashboardItem>
        </div>

        {/* <DashboardItem className="flex flex-col space-y-4">
          <Heading>Starred</Heading>
          <CoursesContainer
            courses={[
              CourseData,
              CourseData,
              CourseData,
              CourseData,
              CourseData,
            ]}
            onClickCourse={onClickOpenCourse}
          />
        </DashboardItem> */}

        <DashboardItem className="flex flex-col space-y-4">
          <Heading>My Courses</Heading>
          <CoursesContainer
            courses={courses}
            onClickCourse={onClickOpenCourse}
          />
        </DashboardItem>
      </div>
    </PageFrame>
  );
};

export default Dashboard;

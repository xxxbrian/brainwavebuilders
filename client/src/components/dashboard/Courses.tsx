import React, { useMemo } from "react";
import { CourseCard } from "./CourseCard";
import { Course, CourseMembership } from "@/backend";

type CourseContainerProps = {
  courses: Course[];
  onClickCourse?: (course: Course) => void;
  courseMemberships?: CourseMembership[];
};

export const CoursesContainer: React.FC<CourseContainerProps> = ({
  courses,
  onClickCourse,
  courseMemberships,
}) => {
  const membershipMap = useMemo(() => {
    const m: Record<string, string> = {};
    courseMemberships?.forEach((cm) => {
      m[cm.courseId] = cm.role;
    });

    return m;
  }, [courseMemberships]);

  return (
    <div
      className={`flex flex-col justify-center md:justify-normal md:flex-row md:space-x-4 flex-wrap space-y-4 md:space-y-0`}
    >
      {courses.map((c) => (
        <CourseCard
          course={c}
          key={c.id}
          onClick={onClickCourse}
          role={membershipMap[c.id] ?? undefined}
        ></CourseCard>
      ))}
    </div>
  );
};

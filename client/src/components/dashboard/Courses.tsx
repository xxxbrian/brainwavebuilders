import React from "react";
import CourseCard from "./CourseCard";
import { Course } from "@/backend";

type CourseContainerProps = {
  courses: Course[];
  onClickCourse?: (course: Course) => void;
};

export const CoursesContainer: React.FC<CourseContainerProps> = ({
  courses,
  onClickCourse,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50 p-3 rounded-xl">
      {courses.map((c) => (
        <CourseCard course={c} key={c.id} onClick={onClickCourse}></CourseCard>
      ))}
    </div>
  );
};

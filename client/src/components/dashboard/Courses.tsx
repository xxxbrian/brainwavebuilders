import React from "react";
import CourseCard from "./CourseCard";
import { Card } from "@radix-ui/themes";
import { Course } from "@/backend";

type CourseContainerProps = {
  courses: Course[];
};

export const CoursesContainer: React.FC<CourseContainerProps> = ({
  courses,
}) => {
  return (
    <Card>
      {courses.map((c) => (
        <CourseCard course={c} key={c.id}></CourseCard>
      ))}
    </Card>
  );
};

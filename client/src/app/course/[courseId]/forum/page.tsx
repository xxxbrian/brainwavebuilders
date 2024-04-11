"use client";

import { useCourse } from "@/contexts/CourseContext";
import { WithStudentRole, WithTeacherRole } from "@/contexts/CourseRoleContext";

export const ForumPage: React.FC = () => {
  const course = useCourse();

  return (
    <div>
      <h1>Forum {course.id}</h1>
      <WithTeacherRole>
        <p>Only teachers can see this</p>
      </WithTeacherRole>

      <WithStudentRole>
        <p>Only students can see this</p>
      </WithStudentRole>
    </div>
  );
};

export default ForumPage;

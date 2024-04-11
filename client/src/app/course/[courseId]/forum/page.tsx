"use client";

import { useCourse } from "@/contexts/CourseContext";
import { WithStudentRole, WithTeacherRole } from "@/contexts/CourseRoleContext";
import AdvancedEditor from "@/components/editor/advanced-editor";

export const ForumPage: React.FC = () => {
  const course = useCourse();

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1>Forum {course.id}</h1>
      <WithTeacherRole>
        <p>Only teachers can see this</p>
      </WithTeacherRole>

      <WithStudentRole>
        <p>Only students can see this</p>
      </WithStudentRole>
      <AdvancedEditor />
    </div>
  );
};

export default ForumPage;

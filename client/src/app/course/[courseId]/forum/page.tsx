"use client";

import { useCourse } from "@/contexts/CourseContext";
import { WithStudentRole, WithTeacherRole } from "@/contexts/CourseRoleContext";
import AdvancedEditor from "@/components/editor/advanced-editor";
import { useEffect, useState } from "react";
import { CenteredLoading } from "@/components/loading";
import { useBackend } from "@/hooks/useBackend";

export const ForumPage: React.FC = () => {
  const course = useCourse();

  const [forumId, setForumId] = useState<string | null>(null);

  const backend = useBackend();

  useEffect(() => {
    if (course === null) return;

    const inner = async () => {
      const { forum } = await backend.getForumByCourseID({
        courseID: course.id,
      });

      setForumId(forum.id);
    };

    void inner();
  }, [backend, course]);

  if (forumId === null) return <CenteredLoading />;

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1>
        Forum CourseID={course.id} ForumID={forumId}
      </h1>
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

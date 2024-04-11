"use client";

import { useCourse } from "@/contexts/CourseContext";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { useCallback, useEffect, useState } from "react";
import { CenteredLoading } from "@/components/loading";
import { useBackend } from "@/hooks/useBackend";
import { StatefulForum } from "@/components/forum/Forum";

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

  const [activeThreadId, setActiveThreadId] = useState<string>("");

  const onChangeActiveThreadId = useCallback((threadId: string) => {
    setActiveThreadId(threadId);
  }, []);

  if (forumId === null) return <CenteredLoading />;

  return (
    <div className="flex flex-col space-y-4 h-full">
      <h1>
        Forum CourseID={course.id} ForumID={forumId}
      </h1>
      <StatefulForum
        forumId={forumId}
        activeThreadId={activeThreadId}
        onChangeActiveThreadId={onChangeActiveThreadId}
      />
    </div>
  );
};

export default ForumPage;

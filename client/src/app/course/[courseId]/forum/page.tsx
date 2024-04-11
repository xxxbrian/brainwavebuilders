"use client";

import AdvancedEditor from "@/components/editor/advanced-editor";
import { useCourseFromLayout } from "../layout";

export const ForumPage: React.FC = () => {
  const course = useCourseFromLayout();

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h1>Forum {course.id}</h1>
      <AdvancedEditor />
    </div>
  );
};

export default ForumPage;

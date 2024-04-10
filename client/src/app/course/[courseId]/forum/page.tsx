"use client";

import { useCourseFromLayout } from "../layout";

export const ForumPage: React.FC = () => {
  const course = useCourseFromLayout();

  return (
    <div>
      <h1>Forum {course.id}</h1>
    </div>
  );
};

export default ForumPage;

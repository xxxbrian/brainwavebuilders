"use client";

import { CourseMembership, User } from "@/backend";
import { useCourse } from "@/contexts/CourseContext";
import { useBackend } from "@/hooks/useBackend";
import { useEffect, useState } from "react";

const CourseMembersPage = () => {
  const course = useCourse();

  const [users, setUsers] = useState<Record<string, User>>({});

  const backend = useBackend();

  useEffect(() => {
    const fetchMembers = async () => {
      const { memberships, users } = await backend.getCourseMembers({
        courseID: course.id,
      });

      const userMap = users.reduce(
        (acc, user) => {
          acc[user.id] = user;
          return acc;
        },
        {} as Record<string, User>,
      );

      setUsers(userMap);
    };

    void fetchMembers();
  }, [backend, course.id]);

  return (
    <div className="flex flex-col space-y-8">
      <div>
        fetched {Object.keys(users).length} users (TODO: Add them to list)
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-bold">Teachers</div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="text-lg font-bold">Students</div>
      </div>
    </div>
  );
};

export default CourseMembersPage;

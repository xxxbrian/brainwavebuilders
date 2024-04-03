"use client";

import { APIError, Course } from "@/backend";
import { StatefulInviteMembersForm } from "@/components/course/InviteMembersForm";
import { CenteredLoading } from "@/components/loading";
import { PageFrame } from "@/components/structural/PageFrame";
import { useBackend } from "@/hooks/useBackend";
import { Heading } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdAssignment, MdOutlinePersonAddAlt1 } from "react-icons/md";

interface ApplicationProps {
  icon: React.ReactNode;
  title: string;
  onClick?: (title: string) => void;
}

export const ApplicationIcon: React.FC<ApplicationProps> = ({
  icon,
  title,
  onClick,
}) => {
  const onclickInner = useCallback(() => {
    onClick?.(title);
  }, [onClick, title]);

  return (
    <div
      className="flex flex-col space-y-4 justify-center w-36 h-36 bg-gray-100 items-center rounded-md select-none cursor-pointer flex-shrink-0 m-2"
      onClick={onclickInner}
    >
      <div className="bg-indigo-500 w-fit h-fit p-3 text-white rounded-md text-4xl">
        {icon}
      </div>
      <div className="text-xs uppercase text-gray-600">{title}</div>
    </div>
  );
};

export const CoursesPage: React.FC<{ params: { courseId: string } }> = ({
  params: { courseId },
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  const onClickAssignments = useCallback(async () => {
    router.push(`/course/${courseId}/assignment`);
  }, [courseId, router]);

  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      setError(null);
      setIsLoading(true);
      setCourse(null);

      try {
        const { courses } = await backend.getCourses({ courseIds: [courseId] });
        const course = courses[0];

        if (!course) {
          setError("Course not found");
          return;
        }

        setCourse(course);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof APIError) {
          setError(e.message);
        } else {
          setError("An unexpected error occurred.");
        }

        setCourse(null);
        setIsLoading(false);
      }
    };

    void inner();
  }, [backend, courseId]);

  if (isLoading) {
    return (
      <PageFrame title="Course Overview">
        <CenteredLoading />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame title="Course Overview">
        <div>{error}</div>
      </PageFrame>
    );
  }

  if (!course) {
    return (
      <PageFrame title="Course Overview">
        <div>An unexpected error occurred.</div>
      </PageFrame>
    );
  }

  return (
    <PageFrame title={`${course.name}`}>
      <div className="flex flex-col space-y-8">
        <div
          className="bg-orange-800 border border-gray-400 rounded-lg py-8 px-12 flex flex-col space-y-2 min-h-60 justify-end text-white bg-opacity-80"
          style={{
            background: course.imageURL ? `url(${course.imageURL})` : "",
          }}
        >
          {course.code && (
            <Heading className="text-white" size={"4"}>
              {course.code}
            </Heading>
          )}
          <Heading className="text-white" size={"8"}>
            {course.name}
          </Heading>

          <div>{course.description}</div>
        </div>
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-4 w-1/2">
            <Heading size={"5"}>Course Applications</Heading>
            <div className="flex flex-wrap">
              <ApplicationIcon
                icon={<MdAssignment />}
                title="Assignments"
                onClick={onClickAssignments}
              />
              <StatefulInviteMembersForm course={course}>
                <ApplicationIcon
                  icon={<MdOutlinePersonAddAlt1 />}
                  title="Invite Member"
                />
              </StatefulInviteMembersForm>
            </div>
          </div>
          <div className="w-1/2">
            <Heading size={"5"}>Calendar</Heading>
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default CoursesPage;

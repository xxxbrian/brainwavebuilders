"use client";

import { APIError, Course } from "@/backend";
import { CenteredLoading } from "@/components/loading";
import { PageFrame } from "@/components/structural/PageFrame";
import { useBackend } from "@/hooks/useBackend";
import { createContext, useContext, useEffect, useState } from "react";

export const CourseContext = createContext<Course | null>(null);

export const useCourseFromLayout = () => {
  const course = useContext(CourseContext);

  if (!course) throw new Error("Cannot use course outside of course context");

  return course;
};

export default function ClassroomPageLayout({
  children,
  params: { courseId },
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
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
    <CourseContext.Provider value={course}>
      <PageFrame title={`${course.name}`} standardWidth={false}>
        {children}
      </PageFrame>
    </CourseContext.Provider>
  );
}

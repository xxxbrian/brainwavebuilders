import { Course } from "@/backend";
import { CenteredLoading } from "@/components/loading";
import { PageFrame } from "@/components/structural/PageFrame";
import { useBackend } from "@/hooks/useBackend";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const CoursesPage: React.FC = () => {
  const router = useRouter();
  const courseId = router.query.courseId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course | null>(null);

  const backend = useBackend();

  useEffect(() => {
    const inner = async () => {
      setError(null);
      setIsLoading(true);
      setCourse(null);

      const { courses } = await backend.getCourses({ courseIds: [courseId] });

      const course = courses[0];

      if (!course) {
        setError("Course not found");
        return;
      }

      setCourse(course);
      setIsLoading(false);
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
      <div className="flex flex-col">
        <div>{course.name}</div>
      </div>
    </PageFrame>
  );
};

export default CoursesPage;

import { Course } from "@/backend";
import { CenteredLoading } from "@/components/loading";
import { PageFrame } from "@/components/structural/PageFrame";
import { useBackend } from "@/hooks/useBackend";
import { Heading, TabNav, Tabs } from "@radix-ui/themes";
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

        <TabNav.Root>
          <TabNav.Link href="#" active>
            Classroom
          </TabNav.Link>
          <TabNav.Link href="#">Documents</TabNav.Link>
          <TabNav.Link href="#">Settings</TabNav.Link>
        </TabNav.Root>
      </div>
    </PageFrame>
  );
};

export default CoursesPage;

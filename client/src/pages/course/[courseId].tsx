import { PageFrame } from "@/components/structural/PageFrame";
import { useRouter } from "next/router";

export const CoursesPage: React.FC = () => {
  const router = useRouter();

  return <PageFrame title="Course Overview">{router.query.courseId}</PageFrame>;
};

export default CoursesPage;

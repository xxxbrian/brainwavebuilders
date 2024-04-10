import { CreateCourseRequest, CreateCourseResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { courseWithCreatedByDBToAPI } from "@/converts/course";
import { createCourse as createCourseDB, joinCourse } from "@/data/course";
import { createForum } from "@/data/forum";
import { CourseRole } from "@prisma/client";

// createCourse implements the createCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createCourse = async (
  ctx: any,
  { name, description, code, imageURL }: CreateCourseRequest,
): Promise<CreateCourseResponse> => {
  const user = useCurrentUser(ctx)!;
  const course = await createCourseDB({
    name,
    description,
    code,
    imageURL,
    createdByID: user.id,
  });

  // Join the course as teacher
  await joinCourse(user.id, course.id, CourseRole.TEACHER);

  await createForum(user.id, course.id, `${name} (Forum)`);

  return {
    course: courseWithCreatedByDBToAPI(course),
  };
};

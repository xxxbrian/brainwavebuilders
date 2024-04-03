import { CreateCourseRequest, CreateCourseResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { courseWithCreatedByDBToAPI } from "@/converts/course";
import { createCourse as createCourseDB } from "@/data/course";

// createCourse implements the createCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createCourse = async (
  ctx: any,
  { name, description, code, imageURL }: CreateCourseRequest,
): Promise<CreateCourseResponse> => {
  const user = useCurrentUser(ctx);
  const course = await createCourseDB({
    name,
    description,
    code,
    imageURL,
    createdByID: user!.id,
  });

  return {
    course: courseWithCreatedByDBToAPI(course),
  };
};

import { APIError, LeaveCourseRequest, LeaveCourseResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { getCourseByID } from "@/data/course";
import { leaveCourse as leaveCourseDB } from "@/data/course";

// leaveCourse implements the leaveCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const leaveCourse = async (
  ctx: any,
  request: LeaveCourseRequest,
): Promise<LeaveCourseResponse> => {
  const user = useCurrentUser(ctx)!;
  const course = await getCourseByID(request.courseId);

  if (!course) {
    throw new APIError("Course not found.");
  }

  await leaveCourseDB(user.id, course.id);

  return {};
};

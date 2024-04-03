import { APIError, GetCoursesRequest, GetCoursesResponse } from "@/apis";
import { courseWithCreatedByDBToAPI } from "@/converts/course";
import { getCoursesByIDs } from "@/data/course";

// getCourses implements the getCourses endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getCourses = async (
  ctx: any,
  request: GetCoursesRequest,
): Promise<GetCoursesResponse> => {
  // TODO: Add in permissions so users can only get courses they have access to.
  const courses = await getCoursesByIDs(request.courseIds);

  if (!courses) {
    throw new APIError("Not all courses can be retrieved");
  }

  return {
    courses: courses?.map((c) => courseWithCreatedByDBToAPI(c)),
  };
};

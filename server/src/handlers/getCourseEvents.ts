import { GetCourseEventsRequest, GetCourseEventsResponse } from "@/apis";
import { fetchAllEventByCourse } from "@/data/calendar";

// getCourseEvents implements the getCourseEvents endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getCourseEvents = async (
  ctx: any,
  request: GetCourseEventsRequest,
): Promise<GetCourseEventsResponse> => {
  let { courseId } = request;
  let events = await fetchAllEventByCourse(courseId);
  return {
    events,
  };
};

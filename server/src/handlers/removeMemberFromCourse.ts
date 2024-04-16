import {
  APIError,
  RemoveMemberFromCourseRequest,
  RemoveMemberFromCourseResponse,
} from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { leaveCourse } from "@/data/course";
import { hasTeacherRoleInCourse } from "@/data/permissions";

// removeMemberFromCourse implements the removeMemberFromCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const removeMemberFromCourse = async (
  ctx: any,
  { userID, courseID }: RemoveMemberFromCourseRequest,
): Promise<RemoveMemberFromCourseResponse> => {
  const user = useCurrentUser(ctx)!;

  // Check if the user is an admin
  if (!(await hasTeacherRoleInCourse(user, courseID))) {
    throw new APIError(
      "You do not have permission to remove a member from this course",
    );
  }

  // Remove the user from the course
  await leaveCourse(userID, courseID);

  return {};
};
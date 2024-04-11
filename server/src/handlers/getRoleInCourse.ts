import { GetRoleInCourseRequest, GetRoleInCourseResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { getRoleInCourse as getRoleInCourseDB } from "@/data/course";

// getRoleInCourse implements the getRoleInCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getRoleInCourse = async (
  ctx: any,
  { courseId }: GetRoleInCourseRequest,
): Promise<GetRoleInCourseResponse> => {
  const user = useCurrentUser(ctx)!;

  const role = await getRoleInCourseDB(user.id, courseId);

  return { role };
};

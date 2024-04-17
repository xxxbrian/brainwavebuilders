import { UpdateCourseRequest, UpdateCourseResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { getCourseByID } from "@/data/course";
import { hasTeacherRoleInCourse } from "@/data/permissions";
import { updateCourse as updateCourseDB } from "@/data/course";
import { courseWithCreatedByDBToAPI } from "@/converts/course";

// updateCourse implements the updateCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const updateCourse = async (
  ctx: any,
  { description, id, code, imageURL, name }: UpdateCourseRequest,
): Promise<UpdateCourseResponse> => {
  const user = useCurrentUser(ctx)!;

  if (!(await hasTeacherRoleInCourse(user, id))) {
    throw new Error("You do not have permission to update this course.");
  }

  await updateCourseDB({ description, id, code, imageURL, name });

  const c = (await getCourseByID(id))!;

  return {
    course: courseWithCreatedByDBToAPI(c),
  };
};

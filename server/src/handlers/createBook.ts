import { APIError, CreateBookRequest, CreateBookResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { courseBookWithCourseAndTreeDBToAPI } from "@/converts/books";
import { createBook as createBookDB } from "@/data/books";
import { hasTeacherRoleInCourse } from "@/data/permissions";

// createBook implements the createBook endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createBook = async (
  ctx: any,
  { courseID, title, content, parentID }: CreateBookRequest,
): Promise<CreateBookResponse> => {
  const user = useCurrentUser(ctx)!;

  if (!(await hasTeacherRoleInCourse(user, courseID))) {
    throw new APIError(
      "You don't have the permission to create a book in this course.",
    );
  }

  const book = await createBookDB({
    courseID,
    title,
    content,
    parentID,
  });

  return { book: courseBookWithCourseAndTreeDBToAPI(book) };
};
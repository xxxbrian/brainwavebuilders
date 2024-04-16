import { APIError, UpdateBookRequest, UpdateBookResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { courseBookWithCourseAndTreeDBToAPI } from "@/converts/books";
import { getBookByID, updateBook as updateBookDB } from "@/data/books";
import { hasTeacherRoleInCourse } from "@/data/permissions";

// updateBook implements the updateBook endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const updateBook = async (
  ctx: any,
  { id, title, content }: UpdateBookRequest,
): Promise<UpdateBookResponse> => {
  const user = useCurrentUser(ctx)!;

  const current = await getBookByID(id);

  if (!current) {
    throw new APIError("Book not found");
  }

  if (!(await hasTeacherRoleInCourse(user, current.courseID))) {
    throw new APIError(
      "You don't have the permission to create a book in this course.",
    );
  }

  const book = await updateBookDB({
    id,
    title,
    content,
  });

  return { book: courseBookWithCourseAndTreeDBToAPI(book) };
};

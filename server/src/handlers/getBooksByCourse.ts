import {
  APIError,
  GetBooksByCourseRequest,
  GetBooksByCourseResponse,
} from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { courseBookWithCourseAndTreeDBToAPI } from "@/converts/books";
import { getBooksByCourseID } from "@/data/books";
import { userInCourse } from "@/data/permissions";

// getBooksByCourse implements the getBooksByCourse endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getBooksByCourse = async (
  ctx: any,
  { courseID }: GetBooksByCourseRequest,
): Promise<GetBooksByCourseResponse> => {
  const user = useCurrentUser(ctx)!;

  if (!(await userInCourse(user, courseID))) {
    throw new APIError("You don't have the permission to view this resource.");
  }

  const books = await getBooksByCourseID(courseID);

  return {
    books: books.map((b) => courseBookWithCourseAndTreeDBToAPI(b)),
  };
};
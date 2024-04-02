import { Course as CourseAPI } from "@/apis";
import { userDBToAPI } from "./user";
import { CourseWithCreatedBy } from "@/data/course";

export const courseWithCreatedByDBToAPI = (
  course: CourseWithCreatedBy,
): CourseAPI => {
  return {
    id: course.id,
    name: course.name,
    description: course.description ?? undefined,
    code: course.code ?? undefined,
    imageURL: course.imageURL ?? undefined,
    createdAt: course.createdAt.getTime(),
    createdBy: userDBToAPI(course.createdBy),
  };
};

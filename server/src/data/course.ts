import { db } from "@/globals";
import { Course, Prisma } from "@prisma/client";

export type CourseWithCreatedBy = Prisma.CourseGetPayload<{
  include: {
    createdBy: true;
  };
}>;

export const getCoursesByIDs = async (
  ids: string[],
): Promise<CourseWithCreatedBy[] | null> => {
  ids = [...new Set(ids)];

  const courses = await db.course.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      createdBy: true,
    },
  });

  if (courses.length !== ids.length) return null;

  return courses;
};

export const getCourseByID = async (
  id: string,
): Promise<CourseWithCreatedBy | null> => {
  const course = await db.course.findUnique({
    where: {
      id: id,
    },
    include: {
      createdBy: true,
    },
  });

  return course;
};

export const hasCourse = async (id: string): Promise<boolean> => {
  const course = await getCourseByID(id);
  return course !== null;
};

export interface CreateCourseRequest {
  name: string;
  description: string;
  createdByID: string;
  code?: string;
  imageURL?: string;
}

export const createCourse = async ({
  name,
  description,
  createdByID,
  code,
  imageURL,
}: CreateCourseRequest): Promise<CourseWithCreatedBy> => {
  const course = await db.course.create({
    data: {
      name,
      description,
      createdByID: createdByID,
      code,
      imageURL,
      createdAt: new Date(),
    },
    include: {
      createdBy: true,
    },
  });

  return course;
};

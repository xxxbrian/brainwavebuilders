import { db } from "@/globals";
import { CourseBook, Prisma } from "@prisma/client";

export type CourseBookWithCourseAndTree = Prisma.CourseBookGetPayload<{
  include: {
    course: {
      include: {
        createdBy: true;
      };
    };
    parent: true;
    children: true;
  };
}>;

export const getBookByIDs = async (
  bookIDs: string[],
): Promise<CourseBookWithCourseAndTree[]> => {
  return db.courseBook.findMany({
    where: {
      id: {
        in: bookIDs,
      },
    },
    include: {
      course: {
        include: {
          createdBy: true,
        },
      },
      parent: true,
      children: true,
    },
  });
};

export const getBookByParentIDs = async (
  parentBookIDs: string[],
): Promise<CourseBookWithCourseAndTree[]> => {
  return db.courseBook.findMany({
    where: {
      parentID: {
        in: parentBookIDs,
      },
    },
    include: {
      course: {
        include: {
          createdBy: true,
        },
      },
      parent: true,
      children: true,
    },
  });
};

export const getBookByChildIDs = async (
  childBookIDs: string[],
): Promise<CourseBookWithCourseAndTree[]> => {
  return db.courseBook.findMany({
    where: {
      children: {
        some: {
          id: {
            in: childBookIDs,
          },
        },
      },
    },
    include: {
      course: {
        include: {
          createdBy: true,
        },
      },
      parent: true,
      children: true,
    },
  });
};

export const deleteBook = async (bookID: string): Promise<void> => {
  await db.courseBook.delete({
    where: {
      id: bookID,
    },
  });
};

export const getBooksByCourseID = async (
  courseID: string,
): Promise<CourseBookWithCourseAndTree[]> => {
  return db.courseBook.findMany({
    where: {
      courseID,
    },
    include: {
      course: {
        include: {
          createdBy: true,
        },
      },
      parent: true,
      children: true,
    },
  });
};

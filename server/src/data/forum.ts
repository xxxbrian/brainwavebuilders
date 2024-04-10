import { ForumWithCreatedBy, ThreadWithPosts } from "@/converts/forum";
import { db } from "@/globals";
import { Forum, Prisma, Thread } from "@prisma/client";

export const createForum = async (
  createdByID: string,
  courseID: string,
  name: string,
): Promise<Forum> => {
  const forum = await db.forum.create({
    data: {
      courseID,
      name,
      createdByID,
      createdAt: new Date(),
    },
  });

  return forum;
};

export const getForumByCourseID = async (
  courseID: string,
): Promise<ForumWithCreatedBy | null> => {
  const forum = await db.forum.findUnique({
    where: {
      courseID,
    },
    include: {
      createdBy: true,
    },
  });

  return forum;
};

export const getForumByID = async (
  id: string,
): Promise<ForumWithCreatedBy | null> => {
  const forum = await db.forum.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
    },
  });

  return forum;
};

export const getThreadsByForumID = async (
  forumID: string,
  userID: string,
): Promise<ThreadWithPosts[]> => {
  const threads = await db.thread.findMany({
    where: {
      forumID,
    },
    include: {
      createdBy: true,
      posts: {
        include: {
          createdBy: true,
        },
      },
    },
  });
  return threads;
};

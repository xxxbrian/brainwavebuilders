import {
  ForumWithCreatedBy,
  PostWithCreatedBy,
  ThreadWithPosts,
} from "@/converts/forum";
import { db } from "@/globals";
import { Forum, Post, Prisma, Thread } from "@prisma/client";

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
      deletedAt: null,
    },
    include: {
      createdBy: true,
      posts: {
        include: {
          createdBy: true,
        },
        where: {
          deletedAt: null,
        },
      },
    },
  });
  return threads;
};

export const deleteThread = async (id: string): Promise<Thread> => {
  return await db.thread.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

interface ThreadUpdatable {
  title: string;
}

interface ThreadCreatable {
  forumID: string;
  title: string;
  createdByID: string;
}

export const createThread = async ({
  createdByID,
  forumID,
  title,
}: ThreadCreatable): Promise<Thread> => {
  return await db.thread.create({
    data: {
      forumID,
      title,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdByID,
      deletedAt: null,
    },
  });
};

export const updateThread = async (
  id: string,
  thread: ThreadUpdatable,
): Promise<Thread> => {
  return await db.thread.update({
    where: {
      id,
    },
    data: {
      title: thread.title,
      updatedAt: new Date(),
    },
  });
};

interface PostUpdatable {
  content: string;
}

interface PostCreatable {
  threadID: string;
  content: string;
  createdByID: string;
}

export const createPost = async ({
  createdByID,
  threadID,
  content,
}: PostCreatable): Promise<Post> => {
  return await db.post.create({
    data: {
      threadID,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdByID: createdByID,
      deletedAt: null,
    },
  });
};

export const updatePost = async (
  id: string,
  post: PostUpdatable,
): Promise<Post> => {
  return await db.post.update({
    where: {
      id,
    },
    data: {
      content: post.content,
      updatedAt: new Date(),
    },
  });
};

export const deletePost = async (id: string): Promise<Post> => {
  return await db.post.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

export const getThreadByID = async (
  id: string,
): Promise<ThreadWithPosts | null> => {
  const thread = await db.thread.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
      posts: {
        include: {
          createdBy: true,
        },
        where: {
          deletedAt: null,
        },
      },
    },
  });

  return thread;
};

export const getPostByID = async (
  id: string,
): Promise<PostWithCreatedBy | null> => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      createdBy: true,
    },
  });

  return post;
};

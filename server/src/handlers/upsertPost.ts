import { APIError, UpsertPostRequest, UpsertPostResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { postWithCreatedByDBToAPI } from "@/converts/forum";
import { getUsersByIDs } from "@/data/auth";
import { getCourseByID } from "@/data/course";
import {
  createPost,
  getCourseByForumID,
  getPostByID,
  getThreadByID,
  updatePost,
} from "@/data/forum";
import { sendEmailFromTemplate } from "@/data/mailer";
import { canCreatePostInThread, canModifyPost } from "@/data/permissions";
import { threadReplyEmail } from "@/mailerTemplates/forumThreadReply";
import { Post } from "@prisma/client";

// upsertPost implements the upsertPost endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const upsertPost = async (
  ctx: any,
  { post }: UpsertPostRequest,
): Promise<UpsertPostResponse> => {
  const user = useCurrentUser(ctx)!;
  let postID = post.id;

  if (post.id) {
    if (!(await canModifyPost(user, post.id))) {
      throw new APIError("You are not authorized to modify this post.");
    }

    await updatePost(post.id, {
      content: post.content,
    });
  } else {
    if (!(await canCreatePostInThread(user, post.threadID))) {
      throw new APIError("You are not authorized to create posts.");
    }

    const { id } = await createPost({
      createdByID: user.id,
      threadID: post.threadID,
      content: post.content,
    });

    postID = id;
  }

  const p = await getPostByID(postID);

  notifyPostUpdate(p!);

  return {
    post: postWithCreatedByDBToAPI(p!),
  };
};

export const notifyPostUpdate = async (post: Post) => {
  const thread = (await getThreadByID(post.threadID))!;

  const users = new Set([thread.createdByID]);

  thread.posts.forEach((p) => {
    users.add(p.createdByID);
  });

  const usersResolved = await getUsersByIDs([...users]);

  const course = (await getCourseByForumID(thread.forumID))!;

  const sender = usersResolved.find((u) => u.id === post.createdByID)!;
  const recipients = usersResolved.filter((u) => u.id !== post.createdByID);

  recipients.forEach(async (user) => {
    console.log(`Notifying user ${user.email} about post update.`);
    await sendEmailFromTemplate(user.email, threadReplyEmail, {
      course: course,
      post: post,
      thread: thread,
      recipient: user,
      sender: sender,
      title: thread.title,
    });
  });
};

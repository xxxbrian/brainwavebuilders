import { createThread, getThreadByID, updateThread } from "@/data/forum";
import { APIError, UpsertThreadRequest, UpsertThreadResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { canCreateThreadInForum, canModifyThread } from "@/data/permissions";
import { threadWithPostsDBToAPI } from "@/converts/forum";
import { kForumNotFoundOrDeniedError } from "./getForumByCourseID";

export const kThreadNotFoundOrDeniedError =
  "Forum not found, or you are not authorized to access it.";

// upsertThread implements the upsertThread endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const upsertThread = async (
  ctx: any,
  { thread }: UpsertThreadRequest,
): Promise<UpsertThreadResponse> => {
  const user = useCurrentUser(ctx)!;
  let threadID = thread.id;

  if (thread.id) {
    if (!canModifyThread(user, thread.id)) {
      throw new APIError(kThreadNotFoundOrDeniedError);
    }

    await updateThread(thread.id, {
      title: thread.title,
    });
  } else {
    if (!(await canCreateThreadInForum(user, thread.forumID))) {
      throw new APIError(kForumNotFoundOrDeniedError);
    }

    const { id } = await createThread({
      createdByID: user.id,
      forumID: thread.forumID,
      title: thread.title,
    });
  }

  return {
    thread: threadWithPostsDBToAPI((await getThreadByID(threadID))!),
  };
};

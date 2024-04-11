import { APIError, UpsertPostRequest, UpsertPostResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { postWithCreatedByDBToAPI } from "@/converts/forum";
import { createPost, getPostByID, updatePost } from "@/data/forum";
import { canCreatePostInThread, canModifyPost } from "@/data/permissions";

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

  return {
    post: postWithCreatedByDBToAPI(p!),
  };
};

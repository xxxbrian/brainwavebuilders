import { DeletePostRequest, DeletePostResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { canModifyPost } from "@/data/permissions";
import { deletePost as deletePostDB } from "@/data/forum";

// deletePost implements the deletePost endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const deletePost = async (
  ctx: any,
  request: DeletePostRequest,
): Promise<DeletePostResponse> => {
  const user = useCurrentUser(ctx);

  if (!user) {
    throw new Error("You are not authorized to delete this post.");
  }

  if (!(await canModifyPost(user, request.postID))) {
    throw new Error("You are not authorized to delete this post.");
  }

  await deletePostDB(request.postID);

  return {};
};

import {
  getPostByID,
  getPostsReactions,
  toggleLikePost as toggleLikePostDB,
} from "@/data/forum";
import {
  APIError,
  ToggleLikePostRequest,
  ToggleLikePostResponse,
} from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { canViewPost } from "@/data/permissions";

export const kPostAccessDenied =
  "Post not found, or you are not authorized to access it.";

// toggleLikePost implements the toggleLikePost endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const toggleLikePost = async (
  ctx: any,
  { postID }: ToggleLikePostRequest,
): Promise<ToggleLikePostResponse> => {
  const user = useCurrentUser(ctx)!;

  if (!(await canViewPost(user, postID))) {
    throw new APIError(kPostAccessDenied);
  }

  await toggleLikePostDB(postID, user.id);

  return {};
};

import {
  APIError,
  IncrementThreadViewRequest,
  IncrementThreadViewResponse,
} from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { incrementView } from "@/data/forum";
import { canViewThread } from "@/data/permissions";

// incrementThreadView implements the incrementThreadView endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const incrementThreadView = async (
  ctx: any,
  { threadID }: IncrementThreadViewRequest,
): Promise<IncrementThreadViewResponse> => {
  const user = await useCurrentUser(ctx)!;

  if (!(await canViewThread(user, threadID))) {
    throw new APIError(
      "Thread not found, or you are not authorized to access it.",
    );
  }

  await incrementView(threadID, user.id!);

  return {};
};

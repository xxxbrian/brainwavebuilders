import { SetUserProfileRequest, SetUserProfileResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { getUserByToken } from "@/data/auth";
import { updateUserProfile } from "@/data/profile";

// setUserProfile implements the setUserProfile endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const setUserProfile = async (
  ctx: any,
  request: SetUserProfileRequest,
): Promise<SetUserProfileResponse> => {
  let askUser = useCurrentUser(ctx);

  let { user } = request;
  if (askUser!.email !== user.email) {
    throw new Error("No permission to update other user's profile");
  }
  await updateUserProfile(user);
  return {};
};

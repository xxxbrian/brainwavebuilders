import { SetUserProfileRequest, SetUserProfileResponse } from "@/apis";
import { getUserByToken } from "@/data/auth";
import { updateUserProfile } from "@/data/profile";

// setUserProfile implements the setUserProfile endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const setUserProfile = async (
  request: SetUserProfileRequest,
): Promise<SetUserProfileResponse> => {
  let { user, token } = request;
  let askUser = await getUserByToken(token);
  if (askUser === null) {
    throw new Error("Invalid token");
  }
  if (askUser.email !== user.email) {
    throw new Error("Invalid user");
  }
  await updateUserProfile(user);
  return {};
};

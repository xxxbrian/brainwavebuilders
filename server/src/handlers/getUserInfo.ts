import { GetUserInfoRequest, GetUserInfoResponse } from "@/apis";
import { getUserByToken } from "@/data/auth";

// getUserInfo implements the getUserInfo endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserInfo = async (
  request: GetUserInfoRequest,
): Promise<GetUserInfoResponse> => {
  let { email, token } = request;
  if ((await getUserByToken(token)) === null) {
    throw new Error("Invalid token");
  }
  const user = await getUserByToken(token);
  if (user === null) {
    throw new Error("User not found");
  }
  return { user };
};

import { GetUserInfoRequest, GetUserInfoResponse } from "@/apis";
import { getUserByEmail, getUserByToken } from "@/data/auth";
import { userDBToAPI } from "@/converts/user";

// getUserInfo implements the getUserInfo endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserInfo = async (
  ctx: {},
  request: GetUserInfoRequest,
): Promise<GetUserInfoResponse> => {
  let { email, token } = request;
  let asker = await getUserByToken(token);
  if (asker === null) {
    throw new Error("Invalid token");
  }
  if (email) {
    const user = await getUserByEmail(email);
    if (user === null) {
      throw new Error("User not found");
    }
    return { user: userDBToAPI(user) };
  }
  return { user: userDBToAPI(asker) };
};

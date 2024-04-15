import {
  GetUserInfoByIDsRequest,
  GetUserInfoByIDsResponse,
  User,
} from "@/apis";
import { userDBToAPI } from "@/converts/user";
import { getUsersByIDs } from "@/data/auth";

// getUserInfoByIDs implements the getUserInfoByIDs endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserInfoByIDs = async (
  ctx: any,
  request: GetUserInfoByIDsRequest,
): Promise<GetUserInfoByIDsResponse> => {
  const users = await getUsersByIDs(request.ids);
  const map: Record<string, User> = {};

  users.forEach((user) => {
    map[user.id] = userDBToAPI(user);
  });

  return { users: map };
};

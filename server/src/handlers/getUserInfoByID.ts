import {
  GetUserInfoByIDRequest,
  GetUserInfoByIDResponse,
  APIError,
} from "@/apis";
import { getUserInfoByID as getUserInfoByIDData } from "@/data/auth";
import { userDBToAPI } from "@/converts/user";

// getUserInfoByID implements the getUserInfoByID endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserInfoByID = async (
  ctx: any,
  request: GetUserInfoByIDRequest,
): Promise<GetUserInfoByIDResponse> => {
  try {
    const user = await getUserInfoByIDData(request.id);
    return { user: userDBToAPI(user!) };
  } catch (error) {
    console.error("Error in getUsersByID handler:", error);
    throw new APIError("Failed to fetch user", "FETCH_ERROR");
  }
};

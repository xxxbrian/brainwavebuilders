import { GetUserInfoRequest, GetUserInfoResponse } from "@/apis";

// getUserInfo implements the getUserInfo endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserInfo = async (
  request: GetUserInfoRequest,
): Promise<GetUserInfoResponse> => {
  console.log("getUserInfo", request);
  return { user: { email: request.email, firstName: "John", lastName: "Doe" } };
};

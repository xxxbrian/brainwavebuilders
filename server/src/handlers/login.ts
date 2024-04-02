import { LoginRequest, LoginResponse } from "@/apis";
import { userDBToAPI } from "@/converts/user";
import { checkPassword, generateToken } from "@/data/auth";

// login implements the login endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const login = async (
  ctx: {},
  request: LoginRequest,
): Promise<LoginResponse> => {
  const user = await checkPassword(request.email, request.password);
  const token = await generateToken(user);
  return {
    user: userDBToAPI(user),
    token,
  };
};

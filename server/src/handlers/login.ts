import { LoginRequest, LoginResponse } from "@/apis";
import { checkPassword, generateToken } from "@/data/auth";

// login implements the login endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  const user = await checkPassword(request.email, request.password);
  const token = await generateToken(user);
  return { user, token };
};

import { RegisterRequest, RegisterResponse } from "@/apis";
import { createUser, generateAndSendOTP, verifyOTP } from "@/data/auth";
import { verifyEmail } from "./verifyEmail";

// register implements the register endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const register = async (
  ctx: {},
  { email, firstName, lastName, password, otp }: RegisterRequest,
): Promise<RegisterResponse> => {
  if (await verifyOTP(email, otp)) {
    await createUser({ email, firstName, lastName, password });
  }
  return {};
};

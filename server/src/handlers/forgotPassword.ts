import { ForgotPasswordRequest, ForgotPasswordResponse } from "@/apis";
import { updatePassword, verifyOTP } from "@/data/auth";

// forgotPassword implements the forgotPassword endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const forgotPassword = async (
  ctx: any,
  request: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  let { email, newPassword, otp } = request;
  if (await verifyOTP(email, otp)) {
    await updatePassword(email, newPassword);
  }
  return {};
};

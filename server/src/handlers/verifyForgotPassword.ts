import {
  VerifyForgotPasswordRequest,
  VerifyForgotPasswordResponse,
} from "@/apis";
import {
  generateAndSendForgotPasswordOTP,
  generateAndSendOTP,
  isCanResetPassword,
} from "@/data/auth";

// verifyForgotPassword implements the verifyForgotPassword endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const verifyForgotPassword = async (
  ctx: any,
  request: VerifyForgotPasswordRequest,
): Promise<VerifyForgotPasswordResponse> => {
  let { email } = request;
  await isCanResetPassword(email);

  await generateAndSendForgotPasswordOTP(email);
  return {};
};

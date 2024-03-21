import { APIError, VerifyEmailRequest, VerifyEmailResponse } from "@/apis";
import { generateAndSendOTP, isEmailTaken } from "@/data/auth";
// verifyEmail implements the verifyEmail endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const verifyEmail = async (
  request: VerifyEmailRequest,
): Promise<VerifyEmailResponse> => {
  let { email } = request;
  await isEmailTaken(email);
  await generateAndSendOTP(email);
  return {};
};

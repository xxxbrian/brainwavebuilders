import { VerifyEmailRequest, VerifyEmailResponse } from "@/apis";
import { generateAndSendOTP, isEmailTaken } from "@/data/auth";

// verifyEmail implements the verifyEmail endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const verifyEmail = async (
  ctx: any,
  request: VerifyEmailRequest,
): Promise<VerifyEmailResponse> => {
  let { email } = request;
  await isEmailTaken(email);
  const generateHtml = (code: string) => `
        <h1>Verify your email address</h1>
        <p>Enter the following code to verify your email address:</p>
        <h2>${code}</h2>
        `;
  await generateAndSendOTP(email, generateHtml);
  return {};
};

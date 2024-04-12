import { ResetPasswordRequest, ResetPasswordResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { checkPassword, updatePassword } from "@/data/auth";

// resetPassword implements the resetPassword endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const resetPassword = async (
  ctx: any,
  request: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  let user = useCurrentUser(ctx)!;
  let { password, newPassword } = request;
  await checkPassword(user.email, password);
  await updatePassword(user.email, newPassword);
  return {};
};

import { CheckEmailRequest, CheckEmailResponse } from "@/apis";
import { isEmailTaken } from "@/data/auth";

// checkEmail implements the checkEmail endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const checkEmail = async (
  request: CheckEmailRequest,
): Promise<CheckEmailResponse> => {
  return {
    taken: await isEmailTaken(request.email),
  };
};

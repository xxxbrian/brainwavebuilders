import { RegisterRequest, RegisterResponse } from "@/apis";
import { createUser, generateAndSendOTP } from "@/data/auth";

// register implements the register endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const register = async ({
  email,
  firstName,
  lastName,
  password,
}: RegisterRequest): Promise<RegisterResponse> => {
  await createUser({ email, firstName, lastName, password });
  await generateAndSendOTP(email);

  return {};
};

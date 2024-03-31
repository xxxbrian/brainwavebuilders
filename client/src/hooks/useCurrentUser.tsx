import { User } from "@/backend";

// TODO: Complete
export const useCurrentUser = (): User | null => {
  return {
    email: "test@test.com",
    firstName: "Test",
    lastName: "User",
  };
};

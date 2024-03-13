import { User as UserAPI } from "@/apis";
import { User as UserDB } from "@prisma/client";

export const userDBToAPI = (user: UserDB): UserAPI => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
};

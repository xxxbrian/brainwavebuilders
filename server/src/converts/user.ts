import { User as UserAPI } from "@/apis";
import { User as UserDB } from "@prisma/client";

export const userDBToAPI = (user: UserDB): UserAPI => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    // TODO: RPC current not support string | null
    avatar: user.avatar ? user.avatar : undefined,
    gender: user.gender ? user.gender : undefined,
    title: user.title ? user.title : undefined,
    bio: user.bio ? user.bio : undefined,
  };
};

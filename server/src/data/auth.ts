import { User } from "@prisma/client";
import { db } from "@/globals";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const isEmailTaken = async (email: string): Promise<boolean> => {
  const user = await getUserByEmail(email);
  return !!user;
};

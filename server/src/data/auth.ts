import { User } from "@prisma/client";
import { db } from "@/globals";
import { makeID } from "./utils";
import { sendEmail } from "./mailer";
import { APIError } from "@/apis";

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

export const generateAndSendOTP = async (email: string): Promise<string> => {
  const subject = "Verify your email address";
  const code = makeID(6);

  const html = `
      <h1>Verify your email address</h1>
      <p>Enter the following code to verify your email address:</p>
      <h2>${code}</h2>
      `;
  console.log("Sending email to", email);
  await sendEmail(email, subject, html);

  return code;
};

// TODO: Implement a real password hashing function
const hashPassword = (password: string): string => {
  return password;
};

interface CreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export const createUser = async (req: CreateUserRequest): Promise<User> => {
  if (await isEmailTaken(req.email)) {
    throw new APIError("Email already taken");
  }

  const { email, firstName, lastName, password } = req;

  if (!email || !firstName || !lastName || !password) {
    throw new APIError("You need to fill in all fields.");
  }

  const user = await db.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashPassword(password),
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  return user;
};

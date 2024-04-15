import { authenticator } from "@/middlewares/authenticator";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import express from "express";

const kPublicAPIs = [
  "/api/getFeatured",
  "/api/login",
  "/api/checkEmail",
  "/api/register",
  "/api/verifyEmail",
  "/api/verifyForgotPassword",
  "/api/forgotPassword",
];

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(authenticator(kPublicAPIs));

export const db = new PrismaClient();

export const getEnvOr = (key: string, defaultValue: string) => {
  return process.env[key] || defaultValue;
};

export const FRONTEND_ADDRESS = getEnvOr(
  "FRONTEND_ADDRESS",
  "http://localhost:3900",
);

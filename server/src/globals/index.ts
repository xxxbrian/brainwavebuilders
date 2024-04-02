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
];

export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(authenticator(kPublicAPIs));

export const db = new PrismaClient();

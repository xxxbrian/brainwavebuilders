import { PrismaClient } from "@prisma/client";
import express from "express";

export const app = express();
app.use(express.json());

export const db = new PrismaClient();

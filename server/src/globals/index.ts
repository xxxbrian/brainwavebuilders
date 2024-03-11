import express from "express";
import { createServer } from "node:http";

export const app = express();
app.use(express.json());

export const server = createServer(app);

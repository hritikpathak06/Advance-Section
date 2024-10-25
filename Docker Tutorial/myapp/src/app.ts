import express from "express";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import morgan from "morgan";
import dotenv from "dotenv";
import User from "./models/user.model.js";
import connectDB from "./db/db.js";

dotenv.config({ path: "./.env" });

export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = process.env.PORT || 3000;

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: " * ", credentials: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

import { Request, Response } from "express";

// Updated createUser function
const createUser = async (name: string, email: string) => {
  return await User.create({
    name,
    email,
  });
};

// Update the types for req and res in the route handler
app.get("/api/newuser", async (req: any, res: any) => {
  try {
    const name = req.query.name as string;
    const email = req.query.email as string;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const user = await createUser(name, email);

    return res.json({
      success: true,
      user,
    });
  } catch (error:any) {
    return res.status(500).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
});

// createUser();

// your routes here

app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is working on Port:" + port + " in " + envMode + " Mode.")
);

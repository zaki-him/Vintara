import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./Routers/authRouter.js";

dotenv.config();

const server = express();

server.use(express.json())

server.use('/auth', authRouter)

connectDB().then(() => {
  server.listen(3000, () => {
    console.log("Server is listening");
  });
});

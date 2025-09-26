import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const server = express();

connectDB().then(() => {
  server.listen(3000, () => {
    console.log("Server is listening");
  });
});

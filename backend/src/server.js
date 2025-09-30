import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRouter from "./Routers/authRouter.js";
import userRouter from "./Routers/userRouter.js";
import productRouter from "./Routers/productRouter.js";
import cartRouter from "./Routers/cartRouter.js";

dotenv.config();

const server = express();

server.use(express.json())

server.use('/auth', authRouter)
server.use('/users', userRouter)
server.use('/products', productRouter)
server.use('/cart', cartRouter)

connectDB().then(() => {
  server.listen(3000, () => {
    console.log("Server is listening");
  });
});

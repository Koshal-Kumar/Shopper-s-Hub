import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./router/userRouter.js";
import itemRouter from "./router/itemRouter.js";
import categoryRouter from "./router/categoryRouter.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

//routers
app.use("/user",userRouter)
app.use("/item", itemRouter)
app.use("/category",categoryRouter);



const PORT = process.env.PORT;
app.listen(PORT , function () {
    console.log(`Server running on port ${PORT}`.bgCyan.white);
})
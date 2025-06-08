import { Router } from "express";
import { authRoute } from "./auth.route.js";
import { productRouter } from "./product.route.js";
import { bidRoute } from "./bid.route.js";

const api = Router();

api.use("/auth", authRoute);
api.use("/product", productRouter);
api.use("/bid", bidRoute);

export { api };

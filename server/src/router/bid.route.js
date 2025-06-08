import { Router } from "express";
import { bidOnProduct } from "../controller/bid.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const bidRoute = Router();

bidRoute.post("/:productId", verifyJWT, bidOnProduct);

export { bidRoute };

import { Router } from "express";
import {
    addNewProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProductById,
} from "../controller/product.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const productRouter = Router();

productRouter.get("/all", getAllProducts);

productRouter.get("/:productId", getProductById);

productRouter.post("/", verifyJWT, addNewProduct);

productRouter.patch("/:productId", verifyJWT, updateProductById);

productRouter.delete("/:productId", verifyJWT, deleteProductById);

// TODO: Admin Dashboard
// Add all auctions that admin added

export { productRouter };

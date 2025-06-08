import Product from "../model/product.model.js";
import User from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllProducts = asyncHandler(async (req, res) => {
    const allProducts = await Product.find({}).sort({ createAt: "desc" });
    return res.send(
        new ApiResponse(200, allProducts, "Products fetched successfully")
    );
});

const addNewProduct = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(403, "Unauthorized to add a product");
    }

    const { name, endingBidDate, basePrice, detail } = req.body;
    if ([name, endingBidDate, basePrice, detail].some((value) => !value)) {
        throw new ApiResponse(400, "All fields are required");
    }

    const user = await User.findOne({ _id: req.user?._id });

    if (!user || user.role != "admin") {
        throw new ApiError(403, "Unauthorized request");
    }

    const newProduct = await Product.create({
        userId: user?._id,
        name,
        endingBidDate,
        basePrice,
        detail,
    });

    if (!newProduct) {
        throw new ApiError(500, "Unable to create new Product");
    }

    return res.send(
        new ApiResponse(200, newProduct, "Product created successfully")
    );
});

const getProductById = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById({ _id: productId });
    if (!product) {
        throw new ApiError(404, "Product not found");
    }
    return res.send(
        new ApiResponse(200, product, "Product fetched successfully")
    );
});

const updateProductById = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { name, endingBidDate, basePrice, detail } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: productId },
        { name, endingBidDate, basePrice, detail }
    );

    if (!updatedProduct) {
        throw new ApiError(404, "Product not found");
    }

    return res.send(
        new ApiResponse(
            204,
            updatedProduct,
            "Your product updated successfully"
        )
    );
});

const deleteProductById = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete({
        _id: productId,
    });

    return res.send(
        new ApiResponse(204, deletedProduct, "Product deleted successfully")
    );
});

export {
    getAllProducts,
    addNewProduct,
    getProductById,
    updateProductById,
    deleteProductById,
};

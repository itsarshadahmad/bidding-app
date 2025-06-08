import Product from "../model/product.model.js";
import User from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const bidOnProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const userId = req.user._id || req.body.userId;

    if (!userId || !productId) {
        throw new ApiError(401, "Unauthorized request");
    }

    const product = await Product.findById({ _id: productId });
    const user = await User.findById({ _id: userId });

    if (!product || !user) {
        throw new ApiError(404, "Product or user not found");
    }

    if (product.sold) {
        return res.send(
            new ApiResponse(403, product, "Product has already been!")
        );
    }

    let currentHighBid = product.basePrice;

    if (product.bids?.length > 0) {
        currentHighBid = product.bids[product.bids?.length - 1];
    }

    const newBid = {
        amount: Number(req.body?.amount),
        userId,
        productId,
    };

    if (newBid.amount == 0 || newBid.amount <= currentHighBid.amount) {
        return res.send(
            new ApiResponse(
                400,
                product,
                "Your bid should be higher than the current highest bid!"
            )
        );
    }

    product.bids.push(newBid);
    await product.save();
    return res.send(
        new ApiResponse(200, newBid, "Your bid added successfully")
    );
});

export { bidOnProduct };

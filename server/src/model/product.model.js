import { Schema, model } from "mongoose";

const BidSchema = new Schema(
    {
        userId: { type: String },
        productId: { type: String },
        amount: { type: Number },
    },
    { timestamps: true }
);

const ProductSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        endingBidDate: {
            type: Number,
            default: new Date().getTime(),
            required: true,
        },
        images: { type: String },
        detail: { type: String, required: true },
        basePrice: { type: Number, required: true },
        bids: { type: [BidSchema] },
        sold: { type: Boolean, default: false },
    },
    { timestamps: true }
);

let Product = model("Product", ProductSchema);

export default Product;

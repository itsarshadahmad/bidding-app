import fs from "fs";
import { asyncHandler } from "./asyncHandler.js";

const removeImage = asyncHandler(async (url) => {
    if (!url) return;
    const filePath = process.cwd() + url.substring(url.indexOf("/uploads"));
    return fs.unlinkSync(filePath, (err) => {
        if (err) {
            console.error(`Error removing image: ${err}`);
        }
    });
});

export { removeImage };

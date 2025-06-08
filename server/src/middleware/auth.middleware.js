import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { decodeToken } from "../utils/token.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
    const token =
        req.body?.authToken ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = await decodeToken(token);
    req.user = {
        _id: decodedToken._id,
        email: decodedToken.email,
    };
    return next();
});

export { verifyJWT };

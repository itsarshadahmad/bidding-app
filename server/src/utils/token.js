import jwt from "jsonwebtoken";

async function decodeToken(token) {
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        return decoded;
    } catch (error) {
        if (err.name !== "TokenExpiredError") {
            console.error(err);
        }
        return null;
    }
}

async function generateToken(fields) {
    const token = await jwt.sign(fields, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
    });
    return token;
}

export { decodeToken, generateToken };

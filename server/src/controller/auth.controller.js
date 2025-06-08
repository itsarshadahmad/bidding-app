import User from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const handleUserLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if ([email, password].some((value) => !value)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email: email });
    if (!user || !(await user.validatePassword(password))) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = await user.generateAuthToken();

    return res.status(200).send(
        new ApiResponse(
            200,
            {
                authToken: token,
            },
            "User authenticated successfully!"
        )
    );
});

const handleUserSignup = asyncHandler(async (req, res) => {
    const { fullName, email, password, role } = req.body;
    if ([fullName, email, password, role].some((value) => !value)) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        role,
    });
    if (!user) {
        throw new ApiError(401, "Something went wrong in creating the user");
    }

    const token = await user.generateAuthToken();

    return res.status(201).send(
        new ApiResponse(
            201,
            {
                authToken: token,
            },
            "User created successfully!"
        )
    );
});

export { handleUserLogin, handleUserSignup };

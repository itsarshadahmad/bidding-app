import { Router } from "express";
import {
    handleUserLogin,
    handleUserSignup,
} from "../controller/auth.controller.js";

const authRoute = Router();

authRoute.post("/login", handleUserLogin);
authRoute.post("/signup", handleUserSignup);

authRoute.post("/logout", (req, res) => {
    // Implement logout logic here
});

export { authRoute };

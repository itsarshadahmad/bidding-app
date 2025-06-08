import express, { json, urlencoded } from "express";
import cors from "cors";
import { connectDB } from "./db/db.mongo.js";
import { api } from "./router/api.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";
import "dotenv/config";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api", api);

app.use(errorHandler);

app.listen(process.env.PORT, async () => {
    try {
        await connectDB();
        console.log(`⚙️ Server started at ${process.env.PORT}`);
    } catch (error) {
        console.error("Error in starting server:", error);
        process.exit(1);
    }
});

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import scrapeRoutes from "./routes/scrape"
import userRoutes from "./routes/user"
dotenv.config()

const app = express()
app.use(express.json())

app.use("/api/scrape", scrapeRoutes)
app.use("/api/user", userRoutes)

mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err))

export default app

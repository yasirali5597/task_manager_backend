import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Configs/db.js";

// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/task.routes.js";

import authRoutes from "./Routes/auth.routes.js";
import taskRoutes from "./Routes/task.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
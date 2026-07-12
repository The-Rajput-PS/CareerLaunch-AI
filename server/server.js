require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const companyRoutes = require("./routes/companyRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const aiRoutes = require("./routes/aiRoutes");

const { PORT } = require("./config/env");

const app = express();

// Connect Database
connectDB();
console.log("companyRoutes:", companyRoutes);
console.log("roadmapRoutes:", roadmapRoutes);
console.log("authRoutes:", authRoutes);
console.log("userRoutes:", userRoutes);
console.log("aiRoutes:", aiRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("CareerLaunch AI Backend is Running 🚀");
});

app.use("/api/user", userRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
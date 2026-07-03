require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");

const companyRoutes = require("./routes/companyRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");

const { PORT } = require("./config/env");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("CareerLaunch AI Backend is Running 🚀");
});

app.use("/api/companies", companyRoutes);
app.use("/api/roadmap", roadmapRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// Import Express
const express = require("express");

// Create Express application
const app = express();

// Define Port
const PORT = 3000;

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 Welcome to CareerLaunch AI Backend!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
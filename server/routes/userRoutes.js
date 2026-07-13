const express = require("express");

const router = express.Router();

const { protect } = require("../middlewares/authMiddleware");

const {
  saveRoadmap,
  getRoadmap,
  completeTask,
} = require("../controllers/userController");

router.post("/roadmap", protect, saveRoadmap);

router.get("/roadmap", protect, getRoadmap);

router.put("/roadmap/task", protect, completeTask);

module.exports = router;

const {
  saveRoadmapForUser,
  getRoadmapForUser,
  completeRoadmapTask,
} = require("../services/userService");

// Save Roadmap
const saveRoadmap = async (req, res) => {
  try {
    const user = await saveRoadmapForUser(req.user._id, req.body.company);

    res.status(200).json({
      success: true,
      message: "Roadmap saved successfully.",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Roadmap
const getRoadmap = async (req, res) => {
  try {
    const roadmap = await getRoadmapForUser(req.user._id);

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Complete Task
const completeTask = async (req, res) => {
  try {
    const { title } = req.body;

    const result = await completeRoadmapTask(req.user._id, title);

    res.status(200).json({
      success: true,
      message: "Task completed.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveRoadmap,
  getRoadmap,
  completeTask,
};

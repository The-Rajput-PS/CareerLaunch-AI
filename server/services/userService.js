const User = require("../models/User");
const { generateRoadmap } = require("./roadmapService");

// ==========================================
// Save Roadmap
// ==========================================

const saveRoadmapForUser = async (userId, company) => {
  const roadmap = generateRoadmap(company);

  const formattedRoadmap = roadmap.map((task) => ({
    title: task,
    completed: false,
    completedAt: null,
  }));

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  user.targetCompany = company;
  user.roadmap = formattedRoadmap;
  user.progress = 0;

  await user.save();

  return user;
};

// ==========================================
// Get Roadmap
// ==========================================

const getRoadmapForUser = async (userId) => {
  const user = await User.findById(userId).select(
    "name targetCompany roadmap progress",
  );

  if (!user) {
    throw new Error("User not found.");
  }

  return user;
};

// ==========================================
// Complete Task
// ==========================================

const completeRoadmapTask = async (userId, taskTitle) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  const task = user.roadmap.find((item) => item.title === taskTitle);

  if (!task) {
    throw new Error("Task not found.");
  }

  if (!task.completed) {
    task.completed = true;
    task.completedAt = new Date();
  }

  const completedTasks = user.roadmap.filter((item) => item.completed).length;

  user.progress = Math.round((completedTasks / user.roadmap.length) * 100);

  await user.save();

  return {
    progress: user.progress,
    roadmap: user.roadmap,
  };
};

module.exports = {
  saveRoadmapForUser,
  getRoadmapForUser,
  completeRoadmapTask,
};

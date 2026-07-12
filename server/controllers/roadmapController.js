const { generateRoadmap } = require("../services/roadmapService");

const getRoadmap = (req, res) => {
  const { company } = req.body;

  const roadmap = generateRoadmap(company);

  res.json({
    success: true,
    data: {
      company,
      roadmap,
      progress: 0,
      streak: 0,
    },
  });
};

module.exports = {
  getRoadmap,
};

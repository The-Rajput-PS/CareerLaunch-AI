const { generateRoadmap } = require("../services/roadmapService");

const getRoadmap = (req, res) => {

    const { company } = req.body;

    const roadmap = generateRoadmap(company);

    res.json({
        success: true,
        company,
        roadmap
    });

};

module.exports = {
    getRoadmap
};
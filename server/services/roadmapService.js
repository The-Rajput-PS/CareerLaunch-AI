// ==========================================
// Roadmap Service
// Business Logic
// ==========================================

const roadmaps = require("../data/roadmaps.json");

const generateRoadmap = (company) => {

    return (

        roadmaps[company]

        ||

        [

            "Programming",

            "DSA",

            "SQL",

            "Resume"

        ]

    );

};

module.exports = {

    generateRoadmap

};
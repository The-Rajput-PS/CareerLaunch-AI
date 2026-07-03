/* ==========================================
   MAIN.JS
   Application Entry Point
========================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {

    console.log("🚀 CareerLaunch AI Started");

    // Load companies into dropdown
    const companies = await API.getCompanies();

    UI.renderCompanies(companies);

    // Add event listener to Build Roadmap button
    const buildButton = document.getElementById("buildRoadmapBtn");

    buildButton.addEventListener("click", buildRoadmap);

}

async function buildRoadmap() {

    const company =
        document.getElementById("companySelect").value;

    console.log("Selected Company:", company);

    const roadmapData =
        await API.getRoadmap(company);

    console.log(roadmapData);

    if (roadmapData) {

        UI.updateRoadmap(roadmapData);

    }

}
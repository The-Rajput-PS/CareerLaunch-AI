/* ==========================================
   MAIN.JS
   Application Entry Point
========================================== */

document.addEventListener("DOMContentLoaded", initializeApp);

async function initializeApp() {
  

  // Load companies
  const companies = await API.getCompanies();


  UI.renderCompanies(companies);

  // Load saved roadmap if user is logged in
  await loadSavedRoadmap();

  // Build Roadmap Button
  // Build Roadmap Button
  document
    .getElementById("buildRoadmapBtn")
    .addEventListener("click", buildRoadmap);

  // Resume Analyzer Button
  const analyzeBtn = document.getElementById("analyzeResumeBtn");

  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", analyzeResume);
  }
  const resumeFile = document.getElementById("resumeFile");

  if (resumeFile) {
    resumeFile.addEventListener("change", function () {
      if (this.files.length) {
        document.getElementById("selectedFile").innerText = this.files[0].name;
      } else {
        document.getElementById("selectedFile").innerText = "No file selected";
      }
    });
  }
}

// ==========================================
// Build Roadmap
// ==========================================

async function buildRoadmap() {
  const company = document.getElementById("companySelect").value;

  if (!company) {
    Swal.fire({
      icon: "warning",
      title: "Select a Company",
      text: "Please choose a company first.",
    });

    return;
  }

  // Generate Roadmap
  const roadmapResponse = await API.generateRoadmap(company);

  if (!roadmapResponse || !roadmapResponse.success) {
    Swal.fire({
      icon: "error",
      title: "Roadmap Generation Failed",
      text: "Please try again.",
    });

    return;
  }

  // Update Dashboard immediately
  UI.updateRoadmap(roadmapResponse.data);

  // Save Roadmap if logged in
  const token = localStorage.getItem("token");

  if (token) {
    const saveResponse = await API.saveRoadmap(company);

    if (saveResponse && saveResponse.success) {
      // Reload the latest roadmap from MongoDB
      await window.loadSavedRoadmap();
    }
  }
}

// ==========================================
// Load Saved Roadmap
// ==========================================

window.loadSavedRoadmap = async function () {
  const token = localStorage.getItem("token");

  if (!token) return;

  const response = await API.getRoadmap();

  if (!response || !response.success) return;

  UI.updateRoadmap({
    company: response.data.targetCompany,
    roadmap: response.data.roadmap,
    progress: response.data.progress,
    streak: response.data.streak ?? 0,
  });
};
// ==========================================
// AI Resume Analyzer
// ==========================================

async function analyzeResume() {
  const fileInput = document.getElementById("resumeFile");

  if (!fileInput.files.length) {
    Swal.fire({
      icon: "warning",
      title: "No Resume Selected",
      text: "Please upload a PDF resume.",
    });
    return;
  }

  const file = fileInput.files[0];

  const button = document.getElementById("analyzeResumeBtn");

  button.disabled = true;
  button.innerText = "Analyzing Resume...";

  try {
    document.getElementById("resumeLoader").style.display = "block";

    const response = await API.analyzeResume(file);
    document.getElementById("resumeLoader").style.display = "none";

    if (!response.success) {
      Swal.fire({
        icon: "error",
        title: "Resume Analysis Failed",
        text: response.message,
      });
      return;
    }

    const result = response.data;

    document.getElementById("resumeResult").style.display = "block";
    document.getElementById("resumeResult").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
    document.getElementById("atsScore").innerText = result.atsScore + "%";
    document.getElementById("bestCompany").innerText = result.bestCompany;

    populateList("strengthList", result.strengths);
    populateList("weaknessList", result.weaknesses);
    populateList("missingSkillsList", result.missingSkills);
    populateList("recommendationList", result.recommendations);
  } catch (error) {
    document.getElementById("resumeLoader").style.display = "none";
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Analysis Failed",
      text: "Please try again.",
    });
  } finally {
    button.disabled = false;
    button.innerText = "Analyze Resume";
  }
}

function populateList(id, items) {
  const list = document.getElementById(id);

  list.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

/* ==========================================
   UI.JS
========================================== */

const UI = {
  renderCompanies(companies) {
    const select = document.getElementById("companySelect");

    if (!select) return;

    select.innerHTML = "";

    companies.forEach((company) => {
      const option = document.createElement("option");

      option.value = company;

      option.textContent = company;

      select.appendChild(option);
    });
  },

  updateRoadmap(data) {
    // Company
    document.getElementById("dashboardCompany").textContent = data.company;

    // Progress
    const progress = data.progress ?? 0;
    const streak = data.streak ?? 0;

    document.getElementById("progressText").textContent = progress + "%";

    document.getElementById("progressBar").style.width = progress + "%";
    const streakElement = document.getElementById("currentStreak");

    if (streakElement) {
      streakElement.textContent = `${streak} ${streak === 1 ? "Day" : "Days"}`;
    }

    // Task List
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    data.roadmap.forEach((task) => {
      const taskData =
        typeof task === "string"
          ? {
              title: task,
              completed: false,
            }
          : task;

      const li = document.createElement("li");

      li.style.cursor = "pointer";

      li.textContent = (taskData.completed ? "✅ " : "⬜ ") + taskData.title;

      li.addEventListener("click", async () => {
        if (taskData.completed) return;

        const response = await API.completeTask(taskData.title);

        if (!response || !response.success) {
          Swal.fire({
            icon: "error",
            title: "Task Update Failed",
            text: response?.message || "Please try again.",
          });

          return;
        }

        // Reload the latest roadmap from MongoDB
        await window.loadSavedRoadmap();
      });

      taskList.appendChild(li);
    });

    // Next Milestone
    const firstPending = data.roadmap.find((task) => {
      if (typeof task === "string") return true;

      return !task.completed;
    });

    document.getElementById("nextMilestone").textContent = firstPending
      ? typeof firstPending === "string"
        ? firstPending
        : firstPending.title
      : "🎉 Roadmap Completed";
  },
};

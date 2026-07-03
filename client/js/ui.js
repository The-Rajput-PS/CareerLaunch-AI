/* ==========================================
   UI.JS
========================================== */

const UI = {

    renderCompanies(companies) {

        const select = document.getElementById("companySelect");

        if (!select) return;

        select.innerHTML = "";

        companies.forEach(company => {

            const option = document.createElement("option");

            option.value = company;

            option.textContent = company;

            select.appendChild(option);

        });

    },

    updateRoadmap(data) {

        document.getElementById("dashboardCompany").textContent =
            data.company;

        const taskList =
            document.getElementById("taskList");

        taskList.innerHTML = "";

        data.roadmap.forEach(task => {

            const li = document.createElement("li");

            li.textContent = "📘 " + task;

            taskList.appendChild(li);

        });

    }

};
/* ==========================================
   API.JS
   Handles all Backend API Calls
========================================== */

const API = {
  BASE_URL: "http://localhost:5000/api",

  async getCompanies() {
    try {
      const response = await fetch(`${this.BASE_URL}/companies`);

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Failed to fetch companies:", error);

      return [];
    }
  },

  async getRoadmap(company) {
    try {
      const response = await fetch(`${this.BASE_URL}/roadmap`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          company,
        }),
      });

      const result = await response.json();

      return result.data;
    } catch (error) {
      console.error("Roadmap Error:", error);

      return null;
    }
  },
};

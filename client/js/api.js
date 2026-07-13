/* ==========================================
    API.JS
    Handles all Backend API Calls
  ========================================== */

const API = {
  BASE_URL:
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api"
      : "https://careerlaunch-ai-backend.onrender.com/api",
  // ===========================
  // Helper
  // ===========================

  getToken() {
    return localStorage.getItem("token");
  },

  getAuthHeaders() {
    return {
      "Content-Type": "application/json",

      Authorization: `Bearer ${this.getToken()}`,
    };
  },

  // ===========================
  // Authentication
  // ===========================

  async register(userData) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/register`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(userData),
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${this.BASE_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(credentials),
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  // ===========================
  // Companies
  // ===========================

  async getCompanies() {
    try {
      const response = await fetch(`${this.BASE_URL}/companies`);

      const result = await response.json();

      return result.data;
    } catch (error) {
      console.error("Failed to fetch companies:", error);

      return [];
    }
  },
  // ===========================
  // Generate Roadmap
  // ===========================

  async generateRoadmap(company) {
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

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  // ===========================
  // Save Roadmap
  // ===========================

  async saveRoadmap(company) {
    try {
      const response = await fetch(`${this.BASE_URL}/user/roadmap`, {
        method: "POST",

        headers: this.getAuthHeaders(),

        body: JSON.stringify({
          company,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  // ===========================
  // Load Saved Roadmap
  // ===========================

  async getRoadmap() {
    try {
      const response = await fetch(`${this.BASE_URL}/user/roadmap`, {
        headers: this.getAuthHeaders(),
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },

  // ===========================
  // Complete Task
  // ===========================

  async completeTask(title) {
    try {
      const response = await fetch(`${this.BASE_URL}/user/roadmap/task`, {
        method: "PUT",

        headers: this.getAuthHeaders(),

        body: JSON.stringify({
          title,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error(error);

      return null;
    }
  },
  async analyzeResume(file) {
    const formData = new FormData();

    formData.append("resume", file);

    const response = await fetch(`${this.BASE_URL}/ai/analyze`, {
      method: "POST",
      body: formData,
    });

    return await response.json();
  },
};

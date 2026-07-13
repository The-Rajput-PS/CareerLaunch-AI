/* ==========================================================
   UTILS.JS
========================================================== */

const Utils = {
  greeting() {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  },

  percentage(value, total) {
    return Math.round((value / total) * 100);
  },
};

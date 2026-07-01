/* ==========================================================
   MAIN.JS
   CareerLaunch AI
   Application Entry Point
========================================================== */

const appState = {

    user: {

        name: "Guest",

        company: "TCS",

        streak: 12,

        progress: 78

    }

};

document.addEventListener("DOMContentLoaded", () => {

    console.log("CareerLaunch AI Started 🚀");

    initializeApp();

});

function initializeApp() {

    console.log("Initializing application...");

    updateGreeting();

}

function updateGreeting() {

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour < 17) {

        greeting = "Good Afternoon";

    }

    else {

        greeting = "Good Evening";

    }

    console.log(greeting);

}
/* ==========================================================
   UI.JS
========================================================== */

const UI = {

    updateGreeting(name){

        const heading =
        document.querySelector("#greeting");

        if(!heading) return;

        heading.textContent =
        `${Utils.greeting()}, ${name} 👋`;

    }

};
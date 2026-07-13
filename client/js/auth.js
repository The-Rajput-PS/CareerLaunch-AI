const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

const loginBtn = document.getElementById("loginBtn");
const navLogin = document.getElementById("navLogin");
const welcomeUser = document.getElementById("welcomeUser");

if (token && user) {
  if (welcomeUser) {
    welcomeUser.textContent = `👋 Hi, ${user.name.split(" ")[0]}`;
  }

  if (loginBtn) {
    loginBtn.textContent = "Logout";
    loginBtn.href = "#";

    loginBtn.onclick = () => {
      localStorage.clear();
      location.reload();
    };
  }

  if (navLogin) {
    navLogin.textContent = "Logout";
    navLogin.href = "#";

    navLogin.onclick = () => {
      localStorage.clear();
      location.reload();
    };
  }
}

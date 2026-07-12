const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const result = await API.login({
    email,

    password,
  });

  if (!result || !result.success) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result?.message || "Invalid email or password.",
    });

    return;
  }

  // Save JWT
  localStorage.setItem("token", result.data.token);

  // Save user details
  localStorage.setItem("user", JSON.stringify(result.data.user));

  Swal.fire({
    icon: "success",
    title: "Login Successful",
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    window.location.href = "../index.html";
  });

});
// =============================
// Show / Hide Password
// =============================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (password && togglePassword) {
    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {
            password.type = "text";
            togglePassword.classList.remove("fa-eye");
            togglePassword.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            togglePassword.classList.remove("fa-eye-slash");
            togglePassword.classList.add("fa-eye");
        }

    });
}

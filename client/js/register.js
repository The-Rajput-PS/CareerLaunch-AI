const form = document.getElementById("registerForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const btn = form.querySelector("button");

  btn.disabled = true;
  btn.innerHTML = "Creating Account...";

  const userData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value,
    college: document.getElementById("college").value.trim(),
    branch: document.getElementById("branch").value.trim(),
    graduationYear: Number(
      document.getElementById("graduationYear").value
    ),
  };

  try {
    const result = await API.register(userData);

    if (!result || !result.success) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: result?.message || "Please try again.",
      });

      return;
    }

    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: "Please login to continue.",
      timer: 1800,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "login.html";
    });
  } catch (error) {
    console.error(error);

    Swal.fire({
      icon: "error",
      title: "Something went wrong",
      text: "Please try again later.",
    });
  } finally {
    btn.disabled = false;
    btn.innerHTML = "Register";
  }
});

// ==========================================
// Show / Hide Password
// ==========================================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

if (password && togglePassword) {
  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
      password.type = "password";
      togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
  });
}
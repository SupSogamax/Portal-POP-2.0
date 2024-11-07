document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#loginForm");
  const inputName = document.querySelector("#username");
  const inputPass = document.querySelector("#password");
  const messageError = document.querySelector("#messageError");
  const loginButton = document.querySelector(".login-btn");

  const user = {
    name: "Diego",
    pass: "1234",
  };

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (
      user.name.toLowerCase().trim() === inputName.value.toLowerCase().trim() &&
      user.pass === inputPass.value
    ) {
      messageError.style.display = "none";

      loginButton.innerHTML = "";
      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");
      loginButton.appendChild(spinner);

      setTimeout(() => {
        window.location.href = "/base.html";
      }, 2000);
    } else {
      messageError.style.display = "block";
    }
  });
});

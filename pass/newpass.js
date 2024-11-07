document.addEventListener("DOMContentLoaded", () => {
  const passwordResetForm = document.querySelector("#passwordResetForm");
  const newPassword = document.querySelector("#newPassword");
  const confirmPassword = document.querySelector("#confirmPassword");
  const submitButton = document.querySelector(".redefinir-btn");
  const messegeErro = document.querySelector(".messegeErro");
  const messegeConfirm = document.querySelector(".messegeConfirm");

  passwordResetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (newPassword.value.length < 4) {
      messegeErro.textContent = "A senha deve conter no mínimo 4 caracteres.";
      messegeErro.style.display = "block";
      return;
    }

    if (newPassword.value === confirmPassword.value) {
      messegeConfirm.classList.add("show");

      submitButton.innerHTML = "";
      const spinner = document.createElement("div");
      spinner.classList.add("loading-spinner");
      submitButton.appendChild(spinner);

      setTimeout(() => {
        window.location.href = "/index.html";
      }, 2000);

      messegeErro.style.display = "none";
    } else {
      messegeErro.style.display = "block";
      messegeErro.textContent = "As senhas não coincidem!";
    }
  });
});

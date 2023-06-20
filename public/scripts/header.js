import { user, auth, logOut } from "./auth.js";

const buttonContainer = document.querySelector("#header__controlPanel");

const renderButton = () => {
  buttonContainer.innerHTML = "";
  const button = document.createElement("button");
  button.classList.add("header__button");
  if (user) {
    console.log(user);
    button.textContent = "LogOut";
    button.addEventListener("click", () => {
      logOut();
    });
  } else {
    button.textContent = "LogIn";
    button.addEventListener("click", () => {
      auth();
    });
  }

  buttonContainer.appendChild(button);
};

renderButton();

window.addEventListener("userChanged", (e) => {
  renderButton();
});

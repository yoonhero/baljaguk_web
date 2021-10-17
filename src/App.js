// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";
import { UserStorage } from "./utils/CustomStorage.js";
import { Baljaguk } from "./utils/Baljaguk.js";
import { Map } from "./utils/Map.js";

const loginedScreen = document.querySelector(".loggedInContent");
const loggedOutContent = document.querySelector(".loggedOutContent");
const privateKeyText = document.querySelector(".user_privatekey");
const addressText = document.querySelector(".user_address");
const loginForm = document.querySelector(".loginForm");
const loginBtn = document.querySelector(".loginBtn");
const phoneNumber = document.querySelector(".phoneNum");
const email = document.querySelector(".email");

function init() {
  const user = UserStorage.getUser();
  if (user) {
    try {
      loginedScreen.classList.remove("hidden");
    } catch (e) {
      console.log(e);
    }
    loggedOutContent.classList.add("hidden");
    addressText.innerText = user?.address;
    privateKeyText.innerText = user?.privateKey;
    Baljaguk.drawBaljaguk(user?.address);
  } else {
    //////////////////////////////// WHEN Not LoggedIn //////////////////////////////////
    try {
      loginedScreen.classList.remove("hidden");
    } catch (e) {
      console.log(e);
    }
    loginedScreen.classList.add("hidden");
    loggedOutContent.classList.remove("hidden");

    loginForm.addEventListener("submit", async () => {
      event.preventDefault();
      loginBtn.disabled = "disabled";
      loginBtn.innerText = "Loading...";

      let ok = await UserStorage.createAccount(phoneNumber.value, email.value);

      if (ok) {
        loginedScreen.classList.remove("hidden");
        loggedOutContent.classList.add("hidden");
      }
    });
  }
}

export { init };

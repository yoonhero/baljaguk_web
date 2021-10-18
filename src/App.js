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
const loginBtn = loginForm.querySelector(".loginBtn");
const phoneNumber = loginForm.querySelector(".phoneNum");
const email = loginForm.querySelector(".email");
const errorMessage = loginForm.querySelector(".errorMessage");

const userloginForm = document.querySelector(".userloginForm");
const user_loginBtn = userloginForm.querySelector(".loginBtn");
const input_address = userloginForm.querySelector(".input_address");
const input_privateKey = userloginForm.querySelector(".input_privateKey");
const loginErrorMessage = userloginForm.querySelector(".errorMessage");

const changeMode = document.querySelector(".changeModeBtn");

// 클립보드에 글씨 복사
function copyText(element) {
  var textToCopy = element.innerText;
  var myTemporaryInputElement = document.createElement("input");
  myTemporaryInputElement.type = "text";
  myTemporaryInputElement.value = textToCopy;
  document.body.appendChild(myTemporaryInputElement);
  myTemporaryInputElement.select();
  document.execCommand("Copy");
  document.body.removeChild(myTemporaryInputElement);
}

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

    addressText.addEventListener("click", () => {
      copyText(addressText);
    });

    privateKeyText.addEventListener("click", () => {
      copyText(privateKeyText);
    });

    Baljaguk.drawBaljaguk(user?.address);
    Baljaguk.drawTimeline(user?.address);
  } else {
    //////////////////////////////// WHEN Not LoggedIn //////////////////////////////////
    try {
      loginedScreen.classList.remove("hidden");
    } catch (e) {
      console.log(e);
    }
    loginedScreen.classList.add("hidden");
    loggedOutContent.classList.remove("hidden");

    changeMode.addEventListener("click", () => {
      if (changeMode.innerText == "Login") {
        changeMode.innerText = "Create Account";
        loginForm.classList.add("hidden");
        userloginForm.classList.remove("hidden");
      } else if (changeMode.innerText == "Create Account") {
        changeMode.innerText = "Login";
        loginForm.classList.remove("hidden");
        userloginForm.classList.add("hidden");
      }
    });

    loginForm.addEventListener("submit", async () => {
      errorMessage.innerText = "";
      event.preventDefault();
      loginBtn.disabled = "disabled";
      loginBtn.innerText = "Loading...";

      let ok = await UserStorage.createAccount(phoneNumber.value, email.value);

      if (ok) {
        loginedScreen.classList.remove("hidden");
        loggedOutContent.classList.add("hidden");
      } else {
        errorMessage.innerText = "다시 시도해주세요!";
        loginBtn.disabled = false;
        loginBtn.innerText = "유저 생성!";
      }
    });

    userloginForm.addEventListener("submit", async () => {
      loginErrorMessage.innerText = "";
      event.preventDefault();
      user_loginBtn.disabled = "disabled";
      user_loginBtn.innerText = "Loading...";

      let ok = await UserStorage.login(
        input_address.value,
        input_privateKey.value
      );

      if (ok) {
        loginedScreen.classList.remove("hidden");
        loggedOutContent.classList.add("hidden");
      } else {
        loginErrorMessage.innerText = "다시 시도해주세요!";
        user_loginBtn.disabled = false;
        user_loginBtn.innerText = "유저 로그인!";
      }
    });
  }
}

export { init };

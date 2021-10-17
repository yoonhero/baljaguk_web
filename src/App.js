// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";
import { UserStorage } from "./utils/CustomStorage.js";
import { Baljaguk } from "./utils/Baljaguk.js";
import { Map } from "./utils/Map.js";

const loginedScreen = document.querySelector(".loggedInContent");
const loggedOutContent = document.querySelector(".loggedOutContent");
const privateKeyText = document.querySelector(".user_privatekey");
const addressText = document.querySelector(".user_address");

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
    try {
      loginedScreen.classList.remove("hidden");
    } catch (e) {
      console.log(e);
    }
    loginedScreen.classList.add("hidden");
    loggedOutContent.classList.remove("hidden");
  }
}

export { init };

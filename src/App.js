// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";
import { UserStorage } from "./utils/CustomStorage.js";

export default class App {
  constructor($target) {
    let user = UserStorage.setUser("dkssud", "");
    console.log(user);
  }
}

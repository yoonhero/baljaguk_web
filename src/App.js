// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";

export default class App {
  constructor($target) {
    RestApi.createUser();
  }
}

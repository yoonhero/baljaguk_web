// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";

export default class App {
  constructor($target) {
    RestApi.createUser("01097518254", "yoonhero06@naver.com");
  }
}

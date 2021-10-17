// import LoginComponent from "./components/LoginComponent.js";
import { RestApi } from "./utils/RestApi.js";
import { UserStorage } from "./utils/CustomStorage.js";
import { Baljaguk } from "./utils/Baljaguk.js";
import { Map } from "./utils/Map.js";

export default class App {
  constructor($target) {
    Baljaguk.drawBaljaguk();
  }
}

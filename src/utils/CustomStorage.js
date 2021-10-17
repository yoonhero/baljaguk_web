import { RestApi } from "./RestApi.js";

const storage = window.localStorage;

const USER_KEY = "user";

const UserStorage = {
  getUser: () => {
    const user = storage.getItem(USER_KEY);
    const parsedUser = JSON.parse(user);

    return parsedUser;
  },

  setUser: async (address, privateKey) => {
    let ok = await UserStorage.isUserExisted(address, privateKey);
    if (!ok) {
      return false;
    }

    const user = {
      address: address,
      privateKey: privateKey,
    };

    const stringifyUser = JSON.stringify(user);

    storage.setItem(USER_KEY, stringifyUser);

    return true;
  },

  createAccount: async (phoneNum, email) => {
    let ok = await RestApi.createUser(phoneNum, email);
    return ok;
  },

  login: async (address, privateKey) => {
    return await UserStorage.setUser(address, privateKey);
  },

  isLoggedIn: () => {
    const user = UserStorage.getUser();

    if (user) {
      return true;
    }

    return false;
  },

  isUserExisted: async (address, privateKey) => {
    const user = await RestApi.findUser(address);

    if (user && user.privateKey == privateKey) {
      return true;
    }

    return false;
  },

  removeUserData: () => {
    storage.removeItem(USER_KEY);
    window.location.reload();
  },
};

export { UserStorage };

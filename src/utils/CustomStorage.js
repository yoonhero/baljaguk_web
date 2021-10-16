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
    let ok = await UserStorage.isUserExisted(address);
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

  isLoggedIn: () => {
    const user = UserStorage.getUser();

    if (user) {
      return true;
    }

    return false;
  },

  isUserExisted: async (address) => {
    const user = await RestApi.findUser(address);

    if (user) {
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

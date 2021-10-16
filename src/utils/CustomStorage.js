const storage = window.localStorage;
const USER_KEY = "user";

const UserStorage = {
  getUser: () => {
    const user = storage.getItem(USER_KEY);
    const parsedUser = JSON.parse(user);

    return parsedUser;
  },

  setUser: (address, privateKey) => {
    const user = {
      address: address,
      privateKey: privateKey,
    };

    const stringifyUser = JSON.stringify(user);

    storage.setItem(USER_KEY, stringifyUser);
  },

  isLoggedIn: () => {
    const user = UserStorage.getUser();

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

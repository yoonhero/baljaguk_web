const storage = window.localStorage;
const USER_KEY = "user-key";
const CARD_KEY_TODO = "card-key-todo";
const CARD_KEY_COMPLETE = "card-key-complete";
const TAG_KEY = "tag-key";
const FILTER_KEY = "filter-key";
const LANG_KEY = "lang-key";

const UserStorage = {
  convertUser: (user) => {
    user = user.trim();

    let userWords = user.split(" ");

    userWords.forEach((word, index) => {
      const head = word[0];
      const left = word.slice(1);

      userWords[index] = head.toUpperCase() + left;
    });

    return userWords.join(" ");
  },

  isUserSigned: () => {
    const user = storage.getItem(USER_KEY);

    if (!user) return false;
    return true;
  },

  setUserData: (user) => {
    user = UserStorage.convertUser(user);
    storage.setItem(USER_KEY, user);
  },

  getUserData: () => {
    return storage.getItem(USER_KEY);
  },

  removeUserData: () => {
    storage.removeItem(USER_KEY);
    storage.removeItem(CARD_KEY_TODO);
    storage.removeItem(CARD_KEY_COMPLETE);
    storage.removeItem(TAG_KEY);
    storage.removeItem(FILTER_KEY);
    storage.removeItem(LANG_KEY);
    window.location.reload();
  },
};

export { UserStorage };

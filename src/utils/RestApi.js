import { UserStorage } from "./CustomStorage.js";

const siteUrl = "https://baljaguk.herokuapp.com";

const RestApi = {
  //////////////////////////////// Post Api Function /////////////////////////////////////////
  postApi: async (url, data) => {
    return axios
      .post(url, JSON.stringify(data))
      .then((response) => {
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },

  //////////////////////////////// Get Address And Private Key /////////////////////////////////////////
  createKey: async () => {
    let addressAndPrivateKey = {};

    await fetch(`${siteUrl}/createkey`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        addressAndPrivateKey = json_response;
      });
    return addressAndPrivateKey;
  },

  //////////////////////////////// Get Baljaguks /////////////////////////////////////////
  baljaguks: async () => {
    let result = [];

    await fetch(`${siteUrl}/baljaguks`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        result = json_response;
      });
    return result;
  },

  //////////////////////////////// Make User /////////////////////////////////////////
  createUser: async (phoneNum, email) => {
    let ok = true;
    let addressAndPrivateKey = await RestApi.createKey();

    const data = {
      address: addressAndPrivateKey?.address,
      privateKey: addressAndPrivateKey?.key,
      phoneNumber: phoneNum,
      email,
    };

    ok = await RestApi.postApi(`${siteUrl}/userblocks`, data);

    if (ok) {
      UserStorage.setUser(data.address, data.privateKey);
    }

    return ok;
  },

  //////////////////////////////// Make Store /////////////////////////////////////////
  createStore: async (phoneNum) => {
    let ok = true;
    let addressAndPrivateKey = await RestApi.createKey();

    const data = {
      address: addressAndPrivateKey?.address,
      privateKey: addressAndPrivateKey?.key,
      phoneNumber: phoneNum,
    };

    ok = await RestApi.postApi(`${siteUrl}/storeblocks`, data);

    return ok;
  },

  //////////////////////////////// Add Baljaguk ///////////////////////////////
  createBaljaguk: async (userHash, storeHash, latitude, longitude) => {
    let ok = true;

    // sample latitude longitude
    //   "latitude":"37.198181",
    // "longitude":"127.074224"
    const data = {
      userhash: userHash,
      storehash: storeHash,
      latitude: latitude,
      longitude: longitude,
    };

    ok = await RestApi.postApi(`${siteUrl}/baljaguks`, data);

    return ok;
  },

  //////////////////////////////// Find User ///////////////////////////////
  findUser: async (userhash) => {
    let user = [];

    await fetch(`${siteUrl}/user/${userhash}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        user = json_response;
      });

    return user;
  },

  //////////////////////////////// Find Store ///////////////////////////////
  findStore: async (storeHash) => {
    let store = [];

    await fetch(`${siteUrl}/store/${storeHash}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        store = json_response;
      });

    return store;
  },
};

export { RestApi };

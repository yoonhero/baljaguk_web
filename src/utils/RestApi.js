const siteUrl = "https://baljaguk.herokuapp.com";

const RestApi = {
  //////////////////////////////// Post Api Function /////////////////////////////////////////
  postApi: async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: `${data}`,
    });

    response.json().then((data) => {
      return data;
    });

    return null;
  },

  //////////////////////////////// Get Address And Private Key /////////////////////////////////////////
  createKey: async () => {
    let addressAndPrivateKey = [];

    await fetch(`${siteUrl}/createkey`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json_response) {
        addressAndPrivateKey = json_response;
      });
    return addressAndPrivateKey;
  },

  //////////////////////////////// Make User /////////////////////////////////////////
  createUser: async (phoneNum, email) => {
    let ok = true;

    let addressAndPrivateKey = await RestApi.createKey();

    const data = {
      address: addressAndPrivateKey?.address,
      privateKey: addressAndPrivateKey?.privateKey,
      phoneNumber: phoneNum,
      email,
    };

    result = await RestApi.postApi(`${siteUrl}/userblocks`, data);
    console.log(result);
  },
};

export { RestApi };

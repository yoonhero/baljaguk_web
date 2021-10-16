const siteUrl = "https://baljaguk.herokuapp.com";

const RestApi = {
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
};

export { RestApi };

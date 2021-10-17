import { Map } from "./Map.js";
import { RestApi } from "./RestApi.js";

const Baljaguk = {
  now: () => {
    let date = Date.now();
    return Baljaguk.getTimeLine(date);
  },

  // timestamp = timestamp * 1000;
  getTimeLine: (timestamp) => {
    let date = new Date(timestamp);

    let month = date.getMonth() + 1;
    month = String(month);
    month = month.length == 1 ? "0" + month : month;

    let day = date.getDate();
    day = String(day);
    day = day.length == 1 ? "0" + day : day;

    return month + day;
  },

  seeBaljaguk: async (address) => {
    const baljaguks = await RestApi.baljaguks();

    return baljaguks.filter((baljaguk) => baljaguk?.userhash == address);
  },

  drawBaljaguk: async (address) => {
    const baljaguks = await Baljaguk.seeBaljaguk(
      "1e092e3e37610c45296d88d9cd923a608217bb65d54357f110470c3b80a1b03486db82d6f52889197ca59edf6f7c50625e5357d5da50b1bb90be69a7cb0c9b3b"
    );

    console.log(baljaguks);

    let coordinates = baljaguks.map((baljaguk) => {
      return {
        lat: Math.floor(baljaguk?.latitude),
        lng: Math.floor(baljaguk?.longitude),
      };
    });

    console.log(coordinates);

    let map = Map.initMap();
    Map.drawPinsNLine(map, coordinates);
  },
};

export { Baljaguk };

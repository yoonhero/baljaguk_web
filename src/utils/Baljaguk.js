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

  getTimeLineLabel: (timestamp) => {
    let date = new Date(timestamp);

    let day = date.getDate();
    day = String(day);
    day = day.length == 1 ? "0" + day : day;

    let hour = date.getHours();
    hour = String(hour);
    hour = hour.length == 1 ? "0" + hour : hour;

    let minutes = date.getMinutes();
    minutes = String(minutes);
    minutes = minutes.length == 1 ? "0" + minutes : minutes;

    return day + "일" + hour + "시" + minutes + "분";
  },

  seeBaljaguk: async (address) => {
    const baljaguks = await RestApi.baljaguks();

    return baljaguks.filter((baljaguk) => baljaguk?.userhash == address);
  },

  drawBaljaguk: async (address) => {
    const baljaguks = await Baljaguk.seeBaljaguk(
      "1e092e3e37610c45296d88d9cd923a608217bb65d54357f110470c3b80a1b03486db82d6f52889197ca59edf6f7c50625e5357d5da50b1bb90be69a7cb0c9b3b"
    );

    let timeline = baljaguks.map((baljaguk) => {
      return Baljaguk.getTimeLineLabel(baljaguk.timestamp * 1000);
    });

    let coordinates = baljaguks.map((baljaguk) => {
      return {
        lat: parseFloat(baljaguk?.latitude),
        lng: parseFloat(baljaguk?.longitude),
      };
    });

    let map = Map.initMap();
    Map.drawPinsNLine(map, coordinates, timeline);
  },
};

export { Baljaguk };

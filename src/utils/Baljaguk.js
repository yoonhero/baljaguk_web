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

    return baljaguks.find((baljaguk) => baljaguk.userhash == address);
  },
};

export { Baljaguk };

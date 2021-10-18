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
    const baljaguks = await Baljaguk.seeBaljaguk(address);

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

  drawTimeline: async (address) => {
    const TimeLineList = document.querySelector(".sessions");
    const baljaguks = await Baljaguk.seeBaljaguk(address);

    let timeline = baljaguks.map((baljaguk) => {
      return {
        time: Baljaguk.getTimeLineLabel(baljaguk.timestamp * 1000),
        lat: baljaguk?.latitude,
        lng: baljaguk?.longitude,
        storeHash: baljaguk?.storeHash,
      };
    });

    console.log(timeline);

    timeline.map((t) => {
      let listObj = document.createElement("li");

      let timeText = document.createElement("div");
      timeText.innerText = t.time;
      timeText.classList.add("time");

      let infoText = document.createElement("p");
      infoText.innerText = "위도: " + t.lat + " 경도: " + t.lng;

      listObj.appendChild(timeText);
      listObj.appendChild(infoText);

      TimeLineList.appendChild(listObj);
    });
  },
};

export { Baljaguk };

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

const Map = {
  initMap: () => {
    let home = { lat: 37.198181, lng: 127.074224 };
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: home,
    });

    return map;
  },

  drawPinsNLine: (map, coordinates, timeline) => {
    const image = {
      url: "https://baljaguk.netlify.app/footprint.png",
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(50, 50),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(25, 32),
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: "poly",
    };
    coordinates.map((coordinate, i) => {
      let marker = new google.maps.Marker({
        position: { lat: coordinate.lat, lng: coordinate.lng },
        map: map,
        label: timeline[i],
        icon: image,
        shape: shape,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener("click", toggleBounce);
    });

    const flightPath = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: "#774936",
      strokeOpacity: 1.0,
      strokeWeight: 1,
    });

    flightPath.setMap(map);
  },
  // drawMap: () => {
  //   const mapContainer = document.getElementById("map"), // 지도를 표시할 div
  //     mapOption = {
  //       center: new kakao.maps.LatLng(37.198181, 127.074224), // 지도의 중심좌표
  //       level: 2, // 지도의 확대 레벨
  //     };

  //   let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  //   return map;
  // },

  // drawPin: (map, positions) => {
  //   // 마커를 표시할 위치와 title 객체 배열입니다
  //   positions = [
  //     {
  //       title: "카카오",
  //       latlng: new kakao.maps.LatLng(33.450705, 126.570677),
  //     },
  //     {
  //       title: "생태연못",
  //       latlng: new kakao.maps.LatLng(33.450936, 126.569477),
  //     },
  //     {
  //       title: "텃밭",
  //       latlng: new kakao.maps.LatLng(33.450879, 126.56994),
  //     },
  //     {
  //       title: "근린공원",
  //       latlng: new kakao.maps.LatLng(33.451393, 126.570738),
  //     },
  //   ];

  //   // 마커 이미지의 이미지 주소입니다
  //   var imageSrc =
  //     "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  //   for (var i = 0; i < positions.length; i++) {
  //     // 마커 이미지의 이미지 크기 입니다
  //     let imageSize = new kakao.maps.Size(24, 35);

  //     // 마커 이미지를 생성합니다
  //     let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

  //     // 마커를 생성합니다
  //     let marker = new kakao.maps.Marker({
  //       map: map, // 마커를 표시할 지도
  //       position: positions[i].latlng, // 마커를 표시할 위치
  //       title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
  //       image: markerImage, // 마커 이미지
  //     });
  //   }
  // },
};

export { Map };

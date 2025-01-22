import React, { useEffect } from "react";
import { get_polygon_api } from "../../Api/Farmer"; // 폴리곤 데이터 API 가져오기

let lastSearchedLocation = null; // 마지막 검색된 좌표 저장
let currentPolygon = null; // 현재 표시된 폴리곤 객체

const NaverMap_WebView = () => {
  useEffect(() => {
    // 네이버 API 로드 확인
    if (typeof window.naver === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder";
      script.async = true;
      script.onload = () => initMap(); // 로드 완료 시 지도 초기화
      document.head.appendChild(script);
    } else {
      initMap(); // API가 이미 로드된 경우 바로 초기화
    }
  }, []);

  // 지도 초기화
  const initMap = () => {
    const naver = window.naver;
    if (!naver || !naver.maps) {
      console.error("Naver Maps API is not loaded properly.");
      return;
    }

    const mapOptions = {
      center: new naver.maps.LatLng(35.1409402, 126.925774), // 기본 좌표 설정
      zoom: 15,
    };
    const map = new naver.maps.Map("map", mapOptions);
    const infoWindow = new naver.maps.InfoWindow({ anchorSkew: true });

    // 지도 클릭 이벤트
    map.addListener("click", (e) => {
      searchCoordinateToAddress(e.coord, map, infoWindow);
    });

    // 버튼 생성 및 추가
    createReturnToSearchButton(map, infoWindow);

    // Flutter 메시지 수신 설정
    handleFlutterMessage(map);

    // 기본 폴리곤 데이터 표시
    showPolygonData(map);
  };

  // 검색된 좌표로 돌아가는 버튼 생성
  const createReturnToSearchButton = (map, infoWindow) => {
    const returnToSearchButton = document.createElement("button");
    returnToSearchButton.innerHTML = `
      <div style="display: inline-block; width: 40px; height: 40px; background-color: #ffffff; border-radius: 50%; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); display: flex; justify-content: center; align-items: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 24 24" stroke="#2dcc71" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 4.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z"/>
        </svg>
      </div>`;
    returnToSearchButton.style.position = "absolute";
    returnToSearchButton.style.bottom = "20px";
    returnToSearchButton.style.left = "20px";
    returnToSearchButton.style.border = "none";
    returnToSearchButton.style.cursor = "pointer";
    returnToSearchButton.style.zIndex = "1000";
    returnToSearchButton.onclick = () => {
      if (lastSearchedLocation) {
        map.setCenter(lastSearchedLocation);
        infoWindow.open(map, lastSearchedLocation);
      } else {
        alert("최근 검색된 위치가 없습니다.");
      }
    };
    document.getElementById("map").appendChild(returnToSearchButton);
  };

  // 좌표 -> 주소 변환
  const searchCoordinateToAddress = async (latlng, map, infoWindow) => {
    const naver = window.naver;
    infoWindow.close();
    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [naver.maps.Service.OrderType.ADDR, naver.maps.Service.OrderType.ROAD_ADDR].join(","),
      },
      async (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("Something went wrong!");
        }

        const items = response.v2.results;
        const addresses = items.map(makeAddress);

        // 정보창 표시
        infoWindow.setContent(addresses.join("<br />"));
        infoWindow.open(map, latlng);

        // 마지막 검색된 좌표 저장
        lastSearchedLocation = latlng;

        // Flutter로 데이터 전달
        sendToFlutter({ event: "click", addresses, coordinates: latlng });
      }
    );
  };

  // 폴리곤 데이터 요청 및 지도에 표시
  const showPolygonData = async (map) => {
    try {
      const naver = window.naver;

      // 폴리곤 데이터를 요청
      const polygonData = await get_polygon_api();
      if (!polygonData) {
        console.warn("No polygon data received.");
        return;
      }

      // 기존 폴리곤 제거
      if (currentPolygon) {
        currentPolygon.setMap(null);
      }

      // 새로운 폴리곤 생성 및 지도에 추가
      currentPolygon = new naver.maps.Polygon({
        map: map,
        paths: polygonData,
        fillColor: "#a1bdff",
        fillOpacity: 0.3,
        strokeColor: "#2768ff",
        strokeOpacity: 0.6,
        strokeWeight: 3,
      });

      // 면적 계산
      const areaInSquareMeters = calculatePolygonArea(polygonData);

      // Flutter로 면적 전달
      sendToFlutter({
        event: "polygonArea",
        area: {
          squareMeters: areaInSquareMeters,
          pyeong: (areaInSquareMeters / 3.3058).toFixed(2), // 평 계산
        },
      });
    } catch (error) {
      console.error("Failed to fetch polygon data:", error);
    }
  };

  // 면적 계산
  const calculatePolygonArea = (polygonPaths) => {
    const naver = window.naver;
    const area = naver.maps.geometry.spherical.computeArea(polygonPaths);
    return area; // 면적(m²)
  };

  // Flutter 메시지 처리
  const handleFlutterMessage = (map) => {
    window.addEventListener("message", (event) => {
      try {
        const { action, payload } = JSON.parse(event.data);

        if (action === "searchAddress") {
          // 플러터에서 전달된 주소를 기반으로 좌표 검색
          searchAddressToCoordinate(payload.address, map);
        }
      } catch (error) {
        console.error("Failed to parse message from Flutter:", error);
      }
    });
  };

  // 주소 -> 좌표 변환
  const searchAddressToCoordinate = (address, map) => {
    const naver = window.naver;
    naver.maps.Service.geocode(
      { query: address },
      async (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("주소 검색에 실패했습니다.");
        }

        if (response.v2.meta.totalCount === 0) {
          return alert("해당 주소를 찾을 수 없습니다.");
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x, item.y);

        // 지도 이동
        map.setCenter(point);

        // Flutter로 결과 전달
        sendToFlutter({
          event: "addressResult",
          coordinates: { x: item.x, y: item.y },
          address: item.jibunAddress || item.roadAddress || "",
        });
      }
    );
  };

  // Flutter로 데이터 전달
  const sendToFlutter = (data) => {
    if (window.ReactNativeWebView) {
      try {
        const jsonString = JSON.stringify(data);
        console.log("Sending to Flutter:", jsonString);
        window.ReactNativeWebView.postMessage(jsonString);
      } catch (error) {
        console.error("Failed to serialize data to JSON:", error);
      }
    } else {
      console.warn("ReactNativeWebView is not available.");
    }
  };

  // 주소 생성 함수
  const makeAddress = (item) => {
    const { region, land } = item;
    const { area1, area2, area3, area4 } = region;
    const landNumber = `${land.type === "2" ? "산" : ""}${land.number1}${land.number2 ? `-${land.number2}` : ""}`;
    return `${area1.name} ${area2.name} ${area3.name} ${area4.name} ${landNumber}`;
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>;
};

export default NaverMap_WebView;

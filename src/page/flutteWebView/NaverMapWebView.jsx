import React, { useEffect } from "react";
import { get_polygon_api } from "../../Api/Farmer";
import { server } from "../url";

let currentPolygon = null; // 현재 지도에 표시된 폴리곤 객체
let searchedCenter = null; // 검색된 주소의 중심 좌표를 저장
let map = null; // 지도 객체를 전역 변수로 선언


const NaverMap_WebView = () => {
  const { naver } = window;

  useEffect(() => {
    // 네이버 지도 API 로드 및 초기화
    if (typeof window.naver === "undefined") {
      loadNaverMapAPI();
    } else {
      initMap(); // API가 이미 로드된 경우 바로 초기화
    }
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange); // 이벤트 정리
    };

  }, []);

  // 네이버 지도 API 로드
  const loadNaverMapAPI = () => {
    const script = document.createElement("script");
    script.src =
      "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID&submodules=geocoder";
    script.async = true;
    script.onload = () => initMap();
    script.onerror = () =>
      console.error("Failed to load Naver Maps API. Check your client ID.");
    document.head.appendChild(script);
  };


  // 지도 초기화 함수
  const initMap = () => {
    const naver = window.naver;
    if (!naver || !naver.maps) {
      console.error("Naver Maps API is not loaded properly.");
      return;
    }

    const mapOptions = {
      center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기 중심 좌표
      zoom: 15, // 초기 확대 수준
      draggable: false, // 드래그로 이동 불가
      pinchZoom: true, // 핀치 줌 허용 (모바일)
      scrollWheel: true, // 스크롤 휠로 확대/축소 허용
      keyboardShortcuts: false, // 키보드로 지도 이동 비활성화
      disableDoubleTapZoom: false, // 더블 탭 확대 허용
      disableDoubleClickZoom: false, // 더블 클릭 확대 허용
      mapTypeControl: false, // 지도 타입 컨트롤 비활성화
    };

    map = new naver.maps.Map("map", mapOptions);

    // 확대/축소 시 검색된 좌표를 다시 중앙으로 고정
    naver.maps.Event.addListener(map, "zoom_changed", () => {
      if (searchedCenter) {
        map.setCenter(searchedCenter); // 검색된 좌표를 중심으로 재설정
      }
    });

    // Flutter 메시지 처리
    handleFlutterMessage(map);
  };


  // 플러터로부터 메시지를 받아 처리
  const handleFlutterMessage = (map) => {
    window.addEventListener("message", async (event) => {
      try {
        if (!event.data) {
          console.error("Empty message received from Flutter.");
          return;
        }

        const { action, payload } = JSON.parse(event.data);

        // Action별 처리
        switch (action) {
          case "searchAddress":
            if (payload?.address) {
              await searchAddressToCoordinate(payload.address, map);
            } else {
              console.error("Invalid payload for searchAddress:", payload);
              sendToFlutter("error", "Invalid address data received.");
            }
            break;

          default:
            console.warn("Unhandled action:", action);
            sendToFlutter("error", `Unhandled action: ${action}`);
        }
      } catch (error) {
        console.error("Error while handling Flutter message:", error);
        sendToFlutter("error", "Failed to process message from Flutter.");
      }
    });
  };


  // 주소 -> 좌표 변환 및 폴리곤 표시
  const searchAddressToCoordinate = async (address, map) => {
    const naver = window.naver;

    try {
      naver.maps.Service.geocode({ query: address }, async (status, response) => {
        if (status === naver.maps.Service.Status.ERROR) {
          sendToFlutter("error", "주소 검색에 실패했습니다.");
          return;
        }

        if (response.v2.meta.totalCount === 0) {
          sendToFlutter("error", "해당 주소를 찾을 수 없습니다.");
          return;
        }

        const item = response.v2.addresses[0]; // 첫 번째 검색 결과
        const point = new naver.maps.LatLng(item.y, item.x); // LatLng 객체 생성

        // 검색된 좌표를 전역 변수에 저장
        searchedCenter = point;

        // 지도 중심 이동
        map.setCenter(point);

        // 폴리곤 데이터 요청 및 지도에 표시
        await showPolygonData(point, map);
      });
    } catch (error) {
      console.error("Error during geocode request:", error);
      sendToFlutter("error", "주소 검색 중 문제가 발생했습니다.");
    }
  };


  const handleHashChange = () => {
    const hash = window.location.hash.slice(1); // # 뒤의 값을 가져옴
    const params = new URLSearchParams(hash);
    const type = params.get("type");
    const address = params.get("address");

    if (type === "searchAddress" && address) {
      searchAddressToCoordinate(address, map);
    } else if (type === "error") {
      console.error("Error from Flutter:", params.get("message"));
    }
  };


  // HTTPS URL을 활용해 데이터를 전달하는 함수
  const sendToFlutter = (eventType, data) => {
    let url = `#type=${eventType}`; // Hash 값 사용

    if (eventType === "searchAddress") {
      url += `&address=${encodeURIComponent(data)}`;
    } else if (eventType === "error") {
      url += `&message=${encodeURIComponent(data)}`;
    }

    window.location.href = url; // Hash 값 변경 (리로드 방지)
  };


  // 폴리곤 데이터 요청 및 지도에 표시
  const showPolygonData = async (point, map) => {
    try {
      const polygonData = await get_polygon_api(point.lng(), point.lat()); // 좌표를 기준으로 폴리곤 데이터 요청
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
        paths: polygonData, // 폴리곤 경로 데이터
        fillColor: "#a1bdff", // 폴리곤 채우기 색상
        fillOpacity: 0.3, // 폴리곤 채우기 투명도
        strokeColor: "#2768ff", // 폴리곤 테두리 색상
        strokeOpacity: 0.6, // 폴리곤 테두리 투명도
        strokeWeight: 3, // 폴리곤 테두리 두께
      });
    } catch (error) {
      console.error("Failed to fetch polygon data:", error);
    }
  };

  return <div id="map" style={{ width: "100%", height: "100vh" }}></div>; // 지도 컨테이너
};

export default NaverMap_WebView;

import React, { useEffect } from "react";
import { get_polygon_api } from "../../Api/Farmer";

let currentPolygon = null; // 현재 지도에 표시된 폴리곤 객체

const NaverMap_WebView = () => {
  const { naver } = window;

  useEffect(() => {
    // 네이버 지도 API 로드 및 초기화
    if (typeof window.naver === "undefined") {
      const script = document.createElement("script");
      script.src =
        "https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID";
      script.async = true;
      script.onload = () => initMap(); // 스크립트 로드 완료 후 지도 초기화
      document.head.appendChild(script);
    } else {
      initMap(); // API가 이미 로드된 경우 바로 초기화
    }
  }, []);

  // 지도 초기화 함수
  const initMap = () => {
    const naver = window.naver;
    if (!naver || !naver.maps) {
      console.error("Naver Maps API is not loaded properly.");
      return;
    }

    // 지도 객체 생성
    const map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기 중심 좌표
      zoom: 15, // 초기 확대 수준
    });

    // Flutter 메시지 처리
    handleFlutterMessage(map);
  };

  // 플러터로부터 메시지를 받아 처리
  const handleFlutterMessage = (map) => {
    window.addEventListener("message", async (event) => {
      try {
        const { action, payload } = JSON.parse(event.data);

        if (action === "searchAddress") {
          // 플러터에서 전달된 주소 정보로 지도 업데이트
          await searchAddressToCoordinate(payload.address, map);
        }
      } catch (error) {
        console.error("Failed to parse message from Flutter:", error);
      }
    });
  };

  // 주소 -> 좌표 변환 및 폴리곤 표시
  const searchAddressToCoordinate = async (address, map) => {
    const naver = window.naver;
    naver.maps.Service.geocode({ query: address }, async (status, response) => {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert("주소 검색에 실패했습니다.");
      }

      if (response.v2.meta.totalCount === 0) {
        return alert("해당 주소를 찾을 수 없습니다.");
      }

      const item = response.v2.addresses[0]; // 첫 번째 검색 결과
      const point = new naver.maps.Point(item.x, item.y); // 좌표 객체 생성

      // 지도 중심 이동
      map.setCenter(point);

      // 폴리곤 데이터 요청 및 지도에 표시
      await showPolygonData(point, map);
    });
  };

  // 폴리곤 데이터 요청 및 지도에 표시
  const showPolygonData = async (point, map) => {
    try {
      const polygonData = await get_polygon_api(point.x, point.y); // 좌표를 기준으로 폴리곤 데이터 요청
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

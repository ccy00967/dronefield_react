import axios from 'axios';
import { get_polygon_api } from '../../../Api/Farmer';
import jidoIcon from "../../../img/jido_icon2.png";

// 주소를 변환하는 함수
function makeAddress(item) {
    if (!item) return '';

    const { region, land, name } = item;
    const isRoadAddress = name === 'roadaddr';

    let sido = region.area1?.name || '';
    let sigugun = region.area2?.name || '';
    let dongmyun = region.area3?.name || '';
    let ri = region.area4?.name || '';
    let rest = '';

    if (land) {
        if (land.type === '2') rest += '산';
        rest += land.number1;
        if (land.number2) rest += `-${land.number2}`;
        if (isRoadAddress) {
            if (dongmyun.endsWith('면')) ri = land.name;
            else dongmyun = land.name;
            if (land.addition0) rest += `${land.addition0.value}`;
        }
    }
    console.log(ri) // ri값이 없으면 한칸이 띄워짐 주의!
    return [sido, sigugun, dongmyun, ri, rest].join(' ');
}

// 현재 지도에 표시된 폴리곤 객체를 저장하는 전역 변수
let currentPolygon = null;
let lastSearchedLocation = null; // 사용자가 마지막으로 검색한 좌표 저장
let infoWindow = null;
const initMap = (naver, setSearchAddr) => {
    // 네이버 Maps API 사용 지도 생성
    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기값: 우리기업 위치
        zoom: 15,
    });


    infoWindow = new naver.maps.InfoWindow({ anchorSkew: true });
    map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부
    // ------------------------------
    // 검색된 좌표로 돌아가는 버튼 추가
    // ------------------------------
    const returnToSearchButton = document.createElement('button');
    returnToSearchButton.innerHTML = `
      <div style="
      display: inline-block;
      width: 40px;
      height: 40px;
      background-color: #ffffff; /* 버튼 바탕색 */
      border-radius: 50%; /* 원형 버튼 */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* 버튼 그림자 */
      display: flex;
      justify-content: center;
      align-items: center;
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 24 24" stroke="#2dcc71" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2.25c5.385 0 9.75 4.365 9.75 9.75s-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12 6.615 2.25 12 2.25zm0 4.5a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5z"/>
      </svg>
    </div>
    `;
    returnToSearchButton.title = '검색 위치로 돌아가기'; // 툴팁 텍스트 설정 (마우스 오버 시 표시)
    returnToSearchButton.style.position = 'absolute';
    returnToSearchButton.style.bottom = '20px';
    returnToSearchButton.style.left = '20px';
    returnToSearchButton.style.padding = '0'; // 버튼 여백 제거
    returnToSearchButton.style.backgroundColor = 'transparent'; // 배경 투명화
    returnToSearchButton.style.border = 'none'; // 테두리 제거
    returnToSearchButton.style.cursor = 'pointer';
    returnToSearchButton.style.zIndex = '1000';

    // 버튼 클릭 시 마지막 검색 좌표로 이동
    returnToSearchButton.onclick = () => {
        if (lastSearchedLocation) {
            map.setCenter(lastSearchedLocation); // 마지막 검색 좌표로 맵 이동
            infoWindow.open(map, lastSearchedLocation); // 해당 위치의 말풍선 열기
        } else {
            alert('최근 검색된 위치가 없습니다.'); // 검색 기록이 없는 경우 알림
        }
    };

    // 지도에 버튼 추가
    document.getElementById('map').appendChild(returnToSearchButton);


    //var path = polygon.getPaths().getAt(0);

    // 지도 클릭, 좌표를 주소로 변환 - 이벤트에 등록
    function searchCoordinateToAddress(latlng) {
        infoWindow.close();
        naver.maps.Service.reverseGeocode(
            {
                coords: latlng,
                orders: [
                    naver.maps.Service.OrderType.ADDR,
                    naver.maps.Service.OrderType.ROAD_ADDR,
                ].join(','),
            },
            (status, response) => {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                const items = response.v2.results;

                console.log(items)

                const htmlAddresses = items.map((item, index) => {
                    const address = makeAddress(item);
                    //const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';
                    return `${address}`;
                });

                showInfoWindowTextBox(htmlAddresses)

                infoWindow.open(map, latlng);

                // ------------------------------
                // 마지막 클릭된 좌표 저장
                // ------------------------------
                lastSearchedLocation = latlng; // 여기에 클릭된 좌표 저장

                window.addressInfo = {
                    jibunAddress: htmlAddresses[0],
                };

                setSearchAddr(htmlAddresses[0])
            }
        );
    }

    // 지도 클릭 이벤트 설정
    map.addListener('click', (e) => {
        searchCoordinateToAddress(e.coord);
    });

    // 주소 검색시 지도에 표시, 주소를 좌표로 변환
    const searchAddressToCoordinate = (address) => {
        naver.maps.Service.geocode(
            { query: address, },
            async (status, response) => {
                if (status === naver.maps.Service.Status.ERROR) {
                    return alert('Something Wrong!');
                }

                if (response.v2.meta.totalCount === 0) {
                    return alert('주소가 올바르지 않습니다.');
                }

                const item = response.v2.addresses[0];
                const point = new naver.maps.Point(item.x, item.y);

                // 주소입력 -> 주소를 받음
                const htmlAddresses = [];
                // if (item.jibunAddress) htmlAddresses.push(item.jibunAddress);
                // if (item.roadAddress) htmlAddresses.push(item.roadAddress);
                // if (item.englishAddress) htmlAddresses.push(`[영문명 주소] ${item.englishAddress}`);

                item.jibunAddress != null ? htmlAddresses.push(item.jibunAddress) : htmlAddresses.push("")
                item.roadAddress != null ? htmlAddresses.push(item.roadAddress) : htmlAddresses.push("")

                showInfoWindowTextBox(htmlAddresses)

                map.setCenter(point);
                infoWindow.open(map, point);

                window.addressInfo = {
                    roadAddress: item.roadAddress,
                    jibunAddress: item.jibunAddress,
                    englishAddress: item.englishAddress,
                    x: item.x,
                    y: item.y
                };


                // ------------------------------
                // 마지막 검색된 좌표 저장
                // ------------------------------
                lastSearchedLocation = point; // 여기에 좌표 저장

                // ------------------------------
                // 폴리곤 데이터 요청
                // ------------------------------
                const res = await get_polygon_api(item.x, item.y); // 서버로 폴리곤 데이터 요청

                // ------------------------------
                // 이전 폴리곤 제거
                // ------------------------------
                if (currentPolygon) {
                    currentPolygon.setMap(null); // 지도에서 제거
                    currentPolygon = null; // 변수 초기화
                }

                // ------------------------------
                // 새로운 폴리곤 생성 및 지도에 추가
                // ------------------------------
                currentPolygon = new naver.maps.Polygon({
                    map: map, // 폴리곤을 추가할 지도 객체
                    paths: res, // 서버에서 반환된 폴리곤 좌표 데이터
                    fillColor: '#a1bdff', // 폴리곤 채우기 색상
                    fillOpacity: 0.3, // 폴리곤 채우기 투명도
                    strokeColor: '#2768ff', // 폴리곤 테두리 색상
                    strokeOpacity: 0.6, // 폴리곤 테두리 투명도
                    strokeWeight: 3, // 폴리곤 테두리 두께
                });

                console.log(window.addressInfo); // 디버깅: 현재 주소 정보를 출력

                // 검색된 첫 번째 주소를 상태로 저장
                setSearchAddr(htmlAddresses[0]);
            }
        );
    }

    globalSearchAddressToCoordinate = searchAddressToCoordinate;
    globalSearchCoordinateToAddress = searchCoordinateToAddress;

    // 지도 클릭시 주소를 보여주는 말풍선
    function showInfoWindowTextBox(htmlAddresses) {
        infoWindow.setContent(`
          <div style="
            padding: 10px; 
            min-width: 180px; 
            line-height: 1.6; 
            border: none; /* 테두리 제거 */
            border-radius: 8px; 
            background-color: #ffffff; 
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            font-family: 'Arial', sans-serif;">
            <h4 style="
              margin: 0 0 10px 0; 
              font-size: 14px; 
              font-weight: bold; 
              color: #333;">
              검색 주소
            </h4>
            <p style="
              font-size: 13px; 
              margin: 0; 
              color: #555;">
              ${htmlAddresses.join('<br />')}
            </p>
          </div>
        `);
    }


}

export default initMap;
export let globalSearchAddressToCoordinate;
export let globalSearchCoordinateToAddress;
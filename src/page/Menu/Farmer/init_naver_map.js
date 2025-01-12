import axios from 'axios';
import { get_polygon_api } from '../../../Api/Farmer';

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


const initMap = (naver, infoWindow, setSearchAddr) => {
    // 네이버 Maps API 사용 지도 생성
    const map = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기값: 우리기업 위치
        zoom: 15,
    });
    map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부

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

                const res = await get_polygon_api(item.x, item.y)

                console.log(res)

                //point = new naver.maps.LatLng(element[0], element[1])
                new naver.maps.Polygon({
                    map: map,
                    paths: res,
                    fillColor: '#a1bdff',
                    fillOpacity: 0.3,
                    strokeColor: '#2768ff',
                    strokeOpacity: 0.6,
                    strokeWeight: 3
                });

                console.log(window.addressInfo)

                setSearchAddr(htmlAddresses[0])
            }
        );
    }

    globalSearchAddressToCoordinate = searchAddressToCoordinate;
    globalSearchCoordinateToAddress = searchCoordinateToAddress;

    // 지도 클릭시 주소를 보여주는 말풍선
    function showInfoWindowTextBox(htmlAddresses) {
        infoWindow.setContent(`
      <div style="padding:10px;min-width:200px;line-height:150%;">
      <h4 style="margin-top:5px;">검색 주소</h4><br />
      ${htmlAddresses.join('<br />')}
      </div>
   `);
    }
}

export default initMap;
export let globalSearchAddressToCoordinate;
export let globalSearchCoordinateToAddress;
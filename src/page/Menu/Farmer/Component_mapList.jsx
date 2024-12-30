import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  hoverRed,
  lightGreenColor,
  lightRedColor,
  redColor,
  RowView
} from "../../../Component/common_style";
import { ScrollToTop_smooth } from "../../../Component/function/ScrollTop";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
//import NaverMap from "../../../Component/naver_maps/NaverMaps";
//import { globalSearchAddressToCoordinate } from "../../../Component/naver_maps/NaverMaps";
import { useUser } from "../../../Component/userContext";


const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
`;
const MapArea = styled(CenterView)`
  flex: 1.5;
  height: 550px;
  margin-top: 3rem;
  background-color: #f0f0f0;
  border-radius: 8px;
  z-index: 1;
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
  span {
    opacity: 0;
    cursor: default;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
`;
const MiniBtn = styled.span`
  margin: 0rem 1rem;
  padding: 0.4rem 1rem;
  font-family: var(--font-Pretendard-Medium);
  border-radius: 4px;
  cursor: pointer;
  &.delete {
    color: ${redColor};
    background-color: ${lightRedColor};
    &:hover {
      background-color: ${hoverRed};
    }
  }
  &.select {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;


const loadScript = (src, callback) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = () => callback();
  document.head.appendChild(script);
};

window.addressInfo = {
  roadAddress: '',
  jibunAddress: '',
  englishAddress: '',
  x: '',
  y: ''
};


const Component_mapList = (props) => {
  const { naver } = window;

  const infoWindow = new naver.maps.InfoWindow({
    anchorSkew: true,
  });

  // 지도 클릭시 주소를 보여주는 말풍선
  function showInfoWindowTextBox(htmlAddresses) {
    infoWindow.setContent(`
      <div style="padding:10px;min-width:200px;line-height:150%;">
      <h4 style="margin-top:5px;">검색 주소</h4><br />
      ${htmlAddresses.join('<br />')}
      </div>
   `);
  }

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

  const initMap = () => {
    // 네이버 Maps API 사용 지도 생성
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(35.1409402, 126.925774), // 초기값: 우리기업 위치
      zoom: 15,
    });
    map.setOptions("mapTypeControl", true); //지도 유형 컨트롤의 표시 여부

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
        (status, response) => {
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

          setSearchAddr(htmlAddresses[0])
        }
      );
    }

    globalSearchAddressToCoordinate = searchAddressToCoordinate;
    globalSearchCoordinateToAddress = searchCoordinateToAddress;
  }

  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === 'undefined') {
      loadScript(
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID',
        initMap,
      );
    } else {
      initMap();
    }
  }, []);

  const mainmenu = props.mainmenu || "";
  const submenu = props.submenu || "";
  const children = props.children || <></>;
  // 농지 전체보기 > 농지삭제 함수
  const delete_API = props.delete_API || null;
  // 방제신청 > 농지선택 함수
  const setSelectFarmland = props.setSelectFarmland || null;
  const setSearchAddr = props.setSearchAddr || null;
  const { setTotalArea, setLandCount } = props;

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { setUser_info } = useUser();

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);

  // 방재신청 > 농지선택
  const selectFarmland = (data) => {
    if (setSelectFarmland) {
      console.log(data);
      const farmland = `${data.landNickName}(${data.address.jibunAddress})`;
      setSelectFarmland(data);
      ScrollToTop_smooth();
      //globalSearchAddressToCoordinate(data.address.jibunAddress);
    }
  };

  return (
    <RowView className="top">
      <SideMenuBar mainmenu={mainmenu} submenu={submenu} />

      <ContentArea>
        <RowView className="top">
          {children}

          <MapArea>
            <div id="map" style={{ width: '100%', height: '100%' }} />
          </MapArea>
        </RowView>

        <PerPageControl
          perPage={perPage}
          setPerPage={setPerPage}
          setCurrentPage={setCurrentPage}
        />

        <TableHeader>
          <div>농지별명</div>
          <div className="addr">농지주소</div>
          <div>면적</div>
          <div>작물</div>
          {delete_API && <MiniBtn>삭제</MiniBtn>}
          {setSelectFarmland && <MiniBtn>선택</MiniBtn>}
        </TableHeader>

        {dataList.map((data, idx) => {
          const areaInSquareMeters = data.lndpclAr;
          const areaInPyeong = Math.ceil(areaInSquareMeters * 0.3025);
          return (
            <TableList key={idx} className={(idx + 1) % 2 === 0 ? "x2" : ""}>
              <div>{data.landNickName}</div>
              <div className="addr"> {data.address.jibunAddress}</div>
              <div>{`${areaInPyeong}평/${areaInSquareMeters}㎡`}</div>
              <div>{data.cropsInfo}</div>

              {delete_API && (
                <MiniBtn
                  className="delete"
                  onClick={() => delete_API(data.uuid)}
                >
                  삭제
                </MiniBtn>
              )}
              {setSelectFarmland && (
                <MiniBtn
                  className="select"
                  onClick={() => selectFarmland(data)}
                >
                  선택
                </MiniBtn>
              )}
            </TableList>
          );
        })}

        <PagingControl
          cnt={cnt}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perPage={perPage}
        />
      </ContentArea>
    </RowView>
  );
};

export default Component_mapList;
export let globalSearchAddressToCoordinate
export let globalSearchCoordinateToAddress
import { useEffect, useState } from "react";
import {
  RowView
} from "../../../Component/common_style";
import { ScrollToTop_smooth } from "../../../Component/function/ScrollTop";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import { useUser } from "../../../Component/userContext";
import { ContentArea, MapArea, TableHeader, TableList, MiniBtn } from "./css/Component_mapListCss";
import { deleteLandInfo, getLandInfo } from "../../../Api/Farmer";
import initMap from "./init_naver_map";


const loadScript = (src, callback, naver, infoWindow, setSearchAddr) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = () => callback(naver, infoWindow, setSearchAddr);
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


  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === 'undefined') {
      loadScript(
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID',
        initMap,
        naver,
        infoWindow,
        setSearchAddr,
      );
    } else {
      initMap(naver, infoWindow, setSearchAddr);
    }

    farmlands_load()
  }, []);

  // 농지 전체보기 > 농지삭제 함수  
  const delete_func = async (uuid) => {
    //if (window.confirm("삭제하시겠습니까?")) {
      console.log(uuid);
      await deleteLandInfo(uuid);
      await farmlands_load()
     // deleteLandInfo(uuid);
      
    //}
  };

  const mainmenu = props.mainmenu || "";
  const submenu = props.submenu || "";
  const children = props.children || <></>;
  const isShowDltBtn = props.isShowDltBtn || null;
  // 방제신청 > 농지선택 함수
  const setSelectFarmland = props.setSelectFarmland || null;
  const setSearchAddr = props.setSearchAddr || null;
  //const { setTotalArea, setLandCount } = props;

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { setUser_info } = useUser();

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);

  const farmlands_load = async () => {
    const data = await getLandInfo();
    setDataList(data);  // 받아온 데이터를 상태에 저장
    // 총 면적과 필지 개수를 계산하고 부모 컴포넌트로 전달
    //const totalArea = data.reduce((sum, item) => sum + parseFloat(item.lndpclAr), 0);
    //setTotalArea(totalArea);
    //setLandCount(data.length);
  }

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
          {isShowDltBtn && <MiniBtn>삭제</MiniBtn>}
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

              {isShowDltBtn && (
                <MiniBtn
                  className="delete"
                  onClick={() => delete_func(data.uuid)}
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
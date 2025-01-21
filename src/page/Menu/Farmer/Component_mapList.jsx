import { useEffect, useRef, useState } from "react";
import {
  RowView
} from "../../../Component/common_style";
import { ScrollToTop_smooth } from "../../../Component/function/ScrollTop";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import { useUser } from "../../../Component/userContext";
import { ContentArea, MapArea, TableHeader, TableList, MiniBtn } from "./css/Component_mapListCss";
import { deleteLandInfo, getLandInfo, editLandInfo } from "../../../Api/Farmer";
import initMap from "./init_naver_map";
import Component_mapList_editModal from "./Modal/Component_mapList_editModal";
import { server } from "../../url";
import { globalSearchAddressToCoordinate } from "./init_naver_map";

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

 


  useEffect(() => {
    // 스크립트 로딩 확인
    if (typeof naver === 'undefined') {
      loadScript(
        'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID',
        initMap,
        naver,
        setSearchAddr,
      );
    } else {
      initMap(naver, setSearchAddr);
    }


  }, []);
 
  //수정하기 모달
  const ModalRef = useRef();
  

  const openModal = async (data) => {
    try {
      // uuid를 추출
      const { uuid } = data;
  
      // API 호출
      const response = await fetch(`${server}/farmer/land/${uuid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("User_Credential") && JSON.parse(localStorage.getItem("User_Credential")).access_token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 데이터 파싱
      const landData = await response.json();
      console.log("Fetched Land Data:", landData);
  
      // 모달 열기
      ModalRef.current.visible(landData);
    } catch (error) {
      console.error("Error fetching land data:", error);
      alert("농지 정보를 불러오는 중 문제가 발생했습니다.");
    }
  };
  


  // 농지 전체보기 > 농지삭제 함수  
  const delete_func = async (uuid) => {
    // 사용자 확인 메시지
    if (!window.confirm("삭제하시겠습니까?")) {
      alert("삭제가 취소되었습니다."); // 취소 메시지
      return;
    }
  
    // 삭제 요청
    const is_deleted = await deleteLandInfo(uuid);
  
    if (is_deleted) {
      alert("삭제가 완료되었습니다."); // 성공 메시지
    } else {
      alert("삭제 중 에러가 발생했습니다. 다시 시도해주세요."); // 실패 메시지
    }
  
    // 데이터 새로 로드
    await farmlands_load();
  };
  

  const mainmenu = props.mainmenu || "";
  const submenu = props.submenu || "";
  const children = props.children || <></>;
  const isShowDltBtn = props.isShowDltBtn || null;
  // 방제신청 > 농지선택 함수
  const setSelectFarmland = props.setSelectFarmland || null;
  const setSearchAddr = props.setSearchAddr || null;
  //const { setTotalArea, setLandCount } = props;

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수 total_items
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 갯수 (디폴트:5)  page_size
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지              page
  const { setUser_info } = useUser();

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    farmlands_load();
  }, [currentPage]); //perPage, currentPage가 변경될 때 실행

  useEffect(() => {
    const load = async () => {
      setCurrentPage(1);
      console.log('current', currentPage);
      await farmlands_load();
    }
    load();
  }, [perPage])



  const farmlands_load = async () => {
    try {
      console.log("Fetching farmlands...");
      const data = await getLandInfo(perPage, currentPage);
      if (data.data && data.total_items) {
        setDataList(data.data); // 데이터 상태 업데이트
        setCnt(data.total_items); // 총 항목 수 업데이트
        console.log("Updated data list:", data.data);
      } else {
        console.warn("Empty or invalid data received:", data);
        setDataList([]); // 빈 데이터 처리
        setCnt(0); // 항목 수 초기화
      }
    } catch (e) {
      console.error("Error loading farmlands:", e.message);
      alert("데이터를 로드하는 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  

  // 방재신청 > 농지선택
  const selectFarmland = (data) => {
    if (setSelectFarmland) {
      console.log(data);
      const farmland = `${data.landNickName}(${data.jibun})`;
      setSelectFarmland(data);
      ScrollToTop_smooth();
      globalSearchAddressToCoordinate(data.jibun);
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
              <div className="addr"> {data.jibun}</div>
              <div>{`${areaInPyeong}평/${areaInSquareMeters}㎡`}</div>
              <div>{data.cropsInfo}</div>

              {isShowDltBtn && (
                <>
                  <MiniBtn
                    className="edit"
                    onClick={() => openModal(data)} // 수정 함수 호출
                  >
                    수정
                  </MiniBtn>
                  <MiniBtn
                    className="delete"
                    onClick={() => delete_func(data.uuid)}
                    // onClick={()=>{console.log("uuid",data.uuid)}}
                  >
                    삭제
                  </MiniBtn>

                </>

              )
              }
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
        <Component_mapList_editModal ref={ModalRef}/>
    </RowView >
  );
};

export default Component_mapList;
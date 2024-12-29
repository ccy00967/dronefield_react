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
import GWNaverMap from "../../../Component/naver_maps/GWNaverMaps";
import { globalSearchAddressToCoordinate } from "../../../Component/naver_maps/GWNaverMaps";
import { useUser } from "../../../Component/userContext";
import { server } from "../../url";


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


const Component_mapList = (props) => {
  const mainmenu = props.mainmenu || "";
  const submenu = props.submenu || "";
  const children = props.children || <></>;
  // 농지 전체보기 > 농지삭제 함수
  const delete_API = props.delete_API || null;
  // 방제신청 > 농지선택 함수
  const setSelectFarmland = props.setSelectFarmland || null;
  const setSearchAddr = props.setSearchAddr || null;
  const { setTotalArea, setLandCount } = props;

  //const [searchAddr, setSearchAddr] = useState([]); // 주소변수를 받는곳

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const { setUser_info } = useUser();


  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터 
  // const testData = Array(parseInt(perPage)).fill({
  //   name: "김가네벼",
  //   addr: "전북특별자치도 김제시 백산읍 공덕 2길",
  //   area: "2000평/66,112342m²",
  //   plant: "옥수수",
  // });
  //
  const load_API = async () => {
    // 액세스 토큰과 리프레시 토큰을 갱신하는 함수
    const refreshAccessToken = async () => {
      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      const refreshToken = userInfo?.refresh_token;

      const res = await fetch(server+'/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        // 액세스 토큰과 리프레시 토큰을 로컬스토리지와 상태에 갱신
        userInfo.access_token = data.access;
        localStorage.setItem('User_Credential', JSON.stringify(userInfo));
        setUser_info(userInfo); // 상태 업데이트
        return data.access; // 새로운 액세스 토큰 반환
      } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
        alert('로그인이 만료되었습니다.'); // 경고창 표시
        localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
        window.location.replace('/'); // 첫 페이지로 리다이렉트
        return null;
      }
    };

    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = userInfo?.access_token;

    const firstResponse = await fetch(server+"/customer/lands/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 401 에러 발생 시 토큰 갱신 후 재시도
    if (firstResponse.status === 401) {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const retryResponse = await fetch(server+"/customer/lands/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newAccessToken}`,
          },
        });

        if (retryResponse.ok) {
          const data = await retryResponse.json();
          console.log(data);
          setDataList(data);  // 받아온 데이터를 상태에 저장
          // 총 면적과 필지 개수를 계산하고 부모 컴포넌트로 전달
          const totalArea = data.reduce((sum, item) => sum + item.lndpclAr, 0);
          setTotalArea(totalArea);
          setLandCount(data.length);
        } else {
          console.error('데이터 로드 실패');
        }
      }
    } else if (firstResponse.ok) {
      const data = await firstResponse.json();
      setDataList(data);  // 받아온 데이터를 상태에 저장
      // 총 면적과 필지 개수를 계산하고 부모 컴포넌트로 전달
      const totalArea = data.reduce((sum, item) => sum + parseFloat(item.lndpclAr), 0);
      setTotalArea(totalArea);
      setLandCount(data.length);
    } else {
      console.error('데이터 로드 실패');
    }
  };

  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);


  // 방재신청 > 농지선택
  const selectFarmland = (data) => {
    if (setSelectFarmland) {
      console.log(data);
      const farmland = `${data.landNickName}(${data.address.jibunAddress})`;
      setSelectFarmland(data);
      ScrollToTop_smooth();
      globalSearchAddressToCoordinate(data.address.jibunAddress);
    }
  };

  return (
    <RowView className="top">
      <SideMenuBar mainmenu={mainmenu} submenu={submenu} />

      <ContentArea>
        <RowView className="top">
          {children}

          <MapArea>
            <GWNaverMap setValue={setSearchAddr} />
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
                  onClick={() => delete_API(data.uuid, load_API)}
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

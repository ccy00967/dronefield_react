import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CenterView,
  Icon,
  lightGreenColor,
} from "../../../Component/common_style";
import Component_mapList from "./Component_mapList";
import { server } from "../../url";
import { InsertBox,DataBox,TitleBox } from "./css/FarmerCss";




const Farmland_All = () => {
  const [totalArea, setTotalArea] = useState(0); // 총 면적
  const [landCount, setLandCount] = useState(0); // 필지 개수
  const [plantRate, setPlantRate] = useState("현재 서비스 준비중입니다.");
  const [searchAddr, setSearchAddrr] = useState("");


  // 농지 전체보기 로드
  // const load_API = () => {
  //   setTotalArea("100,000평 / 330578.5m");
  //   setPlantRate("벼 70% / 콩 20% / 고추 10%");
  //   setCount(2);
  // };
  // useEffect(() => {
  //   load_API();
  // }, []);

  const delete_API = async (uuid, loadAPI) => {
    if (window.confirm("삭제하시겠습니까?")) {
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

        if (res.ok) {
          const data = await res.json();
          // 액세스 토큰을 로컬스토리지에 갱신
          userInfo.access_token = data.access;
          localStorage.setItem('User_Credential', JSON.stringify(userInfo));
          return data.access; // 새로운 액세스 토큰 반환
        } else {
          // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
          alert('다시 로그인해주세요'); // 경고창 표시
          localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
          window.location.replace('/'); // 첫 페이지로 리다이렉트
          return null;
        }
      };

      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      let accessToken = userInfo?.access_token;

      // 첫 번째 DELETE 요청
      let res = await fetch(server+`/customer/landinfo/${uuid}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // 401 에러 발생 시 토큰 갱신 후 다시 시도
      if (res.status === 401) {
        accessToken = await refreshAccessToken();
        if (accessToken) {
          // 새로운 액세스 토큰으로 다시 시도
          res = await fetch(server+`/customer/landinfo/${uuid}/`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          });
        }
      }

      // 삭제가 성공하면 loadAPI 함수 호출
      if (res.ok) {
        alert('농지 삭제가 완료되었습니다.');
        loadAPI(); // 삭제 후 다시 데이터 로드
      } else {
        console.error('삭제 요청 실패');
      }
    }
  };

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"마이페이지"}
        submenu={"농지 전체보기"}
        delete_API={delete_API}
        setSearchAddr={setSearchAddrr}
        setTotalArea={setTotalArea} // 총 면적 전달
        setLandCount={setLandCount} // 필지 개수 전달
      >
        <InsertBox>
          <div className="title">농지 전체보기</div>

          <DataBox>
            <Icon src={require("../../../img/icon_area.png")} />
            <TitleBox>
              <div className="subtitle">총 면적</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{totalArea}㎡</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_plant_rate.png")} />
            <TitleBox>
              <div className="subtitle">작물 비율</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{plantRate}</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_area_count.png")} />
            <TitleBox>
              <div className="subtitle">농지 개수</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{landCount}필지</div>
          </DataBox>
        </InsertBox>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_All;

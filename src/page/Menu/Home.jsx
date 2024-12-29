import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import { CenterView, Icon, RowView } from "../../Component/common_style";
import { useUser } from "../../Component/userContext";
import SideMenuBar from "./SideMenuBar";
import { menu_url } from "./SideMenuBar_url";
import { useEffect, useState } from "react";
import { server } from "../url";

const Container = styled(RowView)`
  align-items: flex-start;
  height: ${(props) => `${props.$height}rem`};
`;
const PicArea = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  div.content {
    box-sizing: border-box;
    position: absolute;
    top: 0%;
    left: 0%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;
const BackgroundPic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const TitleText = styled.div`
  box-sizing: border-box;
  padding: 5% 0 0 5%;
  font-size: 70px;
  font-family: var(--font-Pretendard-Bold);
  color: white;
`;
const MenuIconArea = styled(CenterView)`
  flex: 1;
  padding-top: 3rem;
  align-items: flex-start;
  div.center {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const IconBox = styled(CenterView)`
  flex-direction: column;
  margin: 1rem 2rem;
  aspect-ratio: 1/1;
  font-family: var(--font-Pretendard-Medium);
  font-size: 24px;
  color: white;
  background-color: #00000060;
  border: 1px solid #ffffff79;
  border-radius: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &.oneRow {
    padding: 2rem;
  }
`;

const MainMenu = () => {
  const Navigate = useNavigate();
  const { User_Credential } = useUser();
  const userType = User_Credential.userType;
  const pageName = {
    농업인: "마이페이지",
    드론조종사: "방제/농지분석",
    농약상: "농약",
  };

  // 배경사진
  const Pic_url = {
    농업인: require("../../img/농업인_기본화면 배경.png"),
    드론조종사: require("../../img/드론 조종사 기본화면 배경.png"),
    농약상: require("../../img/농약상_기본화면 배경.png"),
  };
  const [UserInfo, setUserInfo] = useState([])

  const Set_User_info = async () => {
    const res = await fetch(server+'/user/userinfo/' + User_Credential.uuid + '/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + User_Credential.access_token,
      },
      // 나중에 동시 로그인, 다른 곳에서 로그인을 credentials의 정보로 찾기
      credentials: "include",
    })
      .then((res) => { return res.json(); })
      .then((data) => {
        return data
      });


    setUserInfo(res)
  }


  useEffect((

  ) => { Set_User_info(); }, [])

  return (
    <Common_Layout>
      <Container $height={userType === "농업인" ? 53 : 50}>
        <SideMenuBar mainmenu={pageName[userType]} submenu={"홈"} />

        <PicArea>
          <BackgroundPic src={Pic_url[userType]} />
          <div className="content">
            <TitleText>
              {UserInfo.name} {userType}님,
              <br />
              안녕하세요!
            </TitleText>

            <MenuIconArea>
              {userType === "농업인" && (
                <CenterView className="center">
                  <IconBox onClick={() => Navigate(menu_url["농지등록"])}>
                    <Icon src={require("../../img/icon_menu_plus.png")} />
                    농지등록
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["농지 전체보기"])}>
                    <Icon src={require("../../img/icon_menu_table.png")} />
                    농지 전체보기
                  </IconBox>
                  <IconBox onClick={() => alert("준비중입니다.")}>
                    <Icon src={require("../../img/icon_menu_solution.png")} />
                    맞춤형 솔루션
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["방제신청"])}>
                    <Icon src={require("../../img/icon_menu_bug.png")} />
                    방제신청
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["방제이용목록"])}>
                    <Icon src={require("../../img/icon_menu_chart.png")} />
                    방제이용목록
                  </IconBox>
                  {/* <IconBox onClick={() => Navigate(menu_url["농지분석신청"])}> */}
                  <IconBox onClick={() => alert("준비중입니다.")}>
                    <Icon src={require("../../img/icon_menu_graph.png")} />
                    농지분석신청
                  </IconBox>
                  {/* <IconBox onClick={() => Navigate(menu_url["농지분석 이용목록"])}> */}
                  <IconBox onClick={() => alert("준비중입니다.")}>
                    <Icon src={require("../../img/icon_menu_plant.png")} />
                    농지분석 이용목록
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["내 정보 수정"])}>
                    <Icon src={require("../../img/icon_menu_profile.png")} />내
                    정보 수정
                  </IconBox>
                </CenterView>
              )}

              {userType === "드론조종사" && (
                <CenterView className="center">
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["거래매칭"])}
                  >
                    <Icon src={require("../../img/icon_matching.png")} />
                    거래매칭
                  </IconBox>
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["작업현재상황"])}
                  >
                    <Icon src={require("../../img/icon_schdule.png")} />
                    작업현재상황
                  </IconBox>
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["정산"])}
                  >
                    <Icon src={require("../../img/icon_pay.png")} />
                    정산
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["내 정보 수정"])}>
                    <Icon src={require("../../img/icon_menu_profile.png")} />내
                    정보 수정
                  </IconBox>
                </CenterView>
              )}

              {userType === "농약상" && (
                <CenterView className="center">
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["재고등록"])}
                  >
                    <Icon src={require("../../img/icon_menu_plus.png")} />
                    재고등록
                  </IconBox>
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["작업현재상황2"])}
                  >
                    <Icon src={require("../../img/icon_schdule.png")} />
                    작업현재상황
                  </IconBox>
                  <IconBox
                    className="oneRow"
                    onClick={() => Navigate(menu_url["정산2"])}
                  >
                    <Icon src={require("../../img/icon_pay.png")} />
                    정산
                  </IconBox>
                  <IconBox onClick={() => Navigate(menu_url["내 정보 수정"])}>
                    <Icon src={require("../../img/icon_menu_profile.png")} />내
                    정보 수정
                  </IconBox>
                </CenterView>
              )}
            </MenuIconArea>
          </div>
        </PicArea>
      </Container>
    </Common_Layout>
  );
};

export default MainMenu;

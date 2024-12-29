import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  blueColor,
  GreenColor,
  Icon,
  lightBlueColor,
  lightGreenColor,
  lightRedColor,
  redColor,
  RowView2,
} from "../../Component/common_style";
import { useUser } from "../../Component/userContext";
import { menu_url } from "./SideMenuBar_url";

const SideMenu = styled.div`
  padding-top: 1.5rem;
  width: 15.5rem;
  height: 100%;
  img {
    margin: 0 8px;
  }
  div.isMain {
    color: ${(props) =>
    props.$userType === "농업인"
      ? GreenColor
      : props.$userType === "드론조종사"
        ? blueColor
        : redColor};
    background-color: ${(props) =>
    props.$userType === "농업인"
      ? lightGreenColor
      : props.$userType === "드론조종사"
        ? lightBlueColor
        : lightRedColor};
  }
  div.isSub {
    color: ${(props) =>
    props.$userType === "농업인"
      ? GreenColor
      : props.$userType === "드론조종사"
        ? blueColor
        : redColor};
    font-family: var(--font-Pretendard-Medium);
  }
`;
const MainMenuBox = styled(RowView2)`
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  margin: 0.5rem 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  font-size: 18px;
  color: #8e8e8e;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
const SubMenuBox = styled.div`
  height: 0;
  padding-left: 3.5rem;
  color: #8e8e8e;
  overflow: hidden;
  transition: height 0.4s;
  &.isOpen {
    margin-bottom: 2rem;
    height: ${(props) => `${props.$height}rem`};
  }
`;
const Menu = styled.div`
  box-sizing: border-box;
  margin: 0.5rem 0rem;
  cursor: pointer;
`;

const SideMenuBar = (props) => {
  const Navigate = useNavigate();
  const { User_Credential } = useUser();
  const userType = User_Credential.userType;

  const mainmenu = props.mainmenu || ""; // 큰 메뉴
  const submenu = props.submenu || ""; // 작은 메뉴
  const [selectMenu, setSelectMenu] = useState(mainmenu);

  // 선택된 메뉴 판별후 className 부여
  const selectMain = (menu) => {
    if (selectMenu === menu) {
      return "isMain";
    }
    return "";
  };
  const openMenu = (menu) => {
    if (selectMenu === menu) {
      return "isOpen";
    }
    return "";
  };
  const selectSub = (menu) => {
    if (submenu === menu) {
      return "isSub";
    }
    return "";
  };

  return (
    <SideMenu $userType={userType}>
      {userType === "농업인" && (
        <UserMenu_농업인
          openMenu={openMenu}
          selectMain={selectMain}
          selectSub={selectSub}
          setSelectMenu={setSelectMenu}
        />
      )}

      {userType === "드론조종사" && (
        <UserMenu_드론조종사
          openMenu={openMenu}
          selectMain={selectMain}
          selectSub={selectSub}
          setSelectMenu={setSelectMenu}
        />
      )}

      {userType === "농약상" && (
        <UserMenu_농약상
          openMenu={openMenu}
          selectMain={selectMain}
          selectSub={selectSub}
          setSelectMenu={setSelectMenu}
        />
      )}

      <MainMenuBox
        className={selectMain("내 정보 수정")}
        onClick={() => {
          setSelectMenu("내 정보 수정");
          Navigate("/myInfo");
        }}
      >
        <Icon
          src={
            selectMain("내 정보 수정")
              ? userType === "농업인"
                ? require("../../img/icon_profile_green.png")
                : userType === "드론조종사"
                  ? require("../../img/icon_profile_blue.png")
                  : require("../../img/icon_profile_red.png")
              : require("../../img/icon_profile_gray.png")
          }
        />
        내 정보 수정
      </MainMenuBox>
    </SideMenu>
  );
};

export default SideMenuBar;

const UserMenu_농업인 = (props) => {
  const Navigate = useNavigate();
  const selectMain = props.selectMain;
  const setSelectMenu = props.setSelectMenu;
  const selectSub = props.selectSub;
  const openMenu = props.openMenu;

  return (
    <div>
      <div>
        <MainMenuBox
          className={selectMain("마이페이지")}
          onClick={() => setSelectMenu("마이페이지")}
        >
          <Icon
            src={
              selectMain("마이페이지")
                ? require("../../img/icon_mypage_green.png")
                : require("../../img/icon_mypage_gray.png")
            }
          />
          마이페이지
        </MainMenuBox>

        <SubMenuBox className={openMenu("마이페이지")} $height={6}>
          <Menu
            className={selectSub("홈")}
            onClick={() => Navigate(menu_url["홈"])}
          >
            ･홈(농업인)
          </Menu>
          <Menu
            className={selectSub("농지등록")}
            onClick={() => Navigate(menu_url["농지등록"])}
          >
            ･농지등록
          </Menu>
          <Menu
            className={selectSub("농지 전체보기")}
            onClick={() => Navigate(menu_url["농지 전체보기"])}
          >
            ･농지 전체보기
          </Menu>
        </SubMenuBox>
      </div>
      <div>
        <MainMenuBox
          className={selectMain("방제")}
          onClick={() => setSelectMenu("방제")}
        >
          <Icon
            src={
              selectMain("방제")
                ? require("../../img/icon_bug_green.png")
                : require("../../img/icon_bug_gray.png")
            }
          />
          방제
        </MainMenuBox>

        <SubMenuBox className={openMenu("방제")} $height={4}>
          <Menu
            className={selectSub("방제신청")}
            onClick={() => Navigate(menu_url["방제신청"])}
          >
            ･방제신청
          </Menu>
          <Menu
            className={selectSub("방제이용목록")}
            onClick={() => Navigate(menu_url["방제이용목록"])}
          >
            ･방제이용목록
          </Menu>
        </SubMenuBox>
      </div>
      {/* <div>
        <MainMenuBox
          className={selectMain("농지분석")}
          onClick={() => setSelectMenu("농지분석")}
        >
          <Icon
            src={
              selectMain("농지분석")
                ? require("../../img/icon_graph_green.png")
                : require("../../img/icon_graph_gray.png")
            }
          />
          농지분석
        </MainMenuBox>
        <SubMenuBox className={openMenu("농지분석")} $height={4}>
          <Menu
            className={selectSub("농지분석신청")}
            onClick={() => Navigate(menu_url["농지분석신청"])}
          >
            ･농지분석신청
          </Menu>
          <Menu
            className={selectSub("농지분석 이용목록")}
            onClick={() => Navigate(menu_url["농지분석 이용목록"])}
          >
            ･농지분석 이용목록
          </Menu>
        </SubMenuBox>
      </div> */}
    </div>
  );
};

const UserMenu_드론조종사 = (props) => {
  const Navigate = useNavigate();
  const selectMain = props.selectMain;
  const setSelectMenu = props.setSelectMenu;
  const selectSub = props.selectSub;
  const openMenu = props.openMenu;

  return (
    <div>
      <MainMenuBox
        className={selectMain("방제/농지분석")}
        onClick={() => setSelectMenu("방제/농지분석")}
      >
        <Icon
          src={
            selectMain("방제/농지분석")
              ? require("../../img/icon_graph_blue.png")
              : require("../../img/icon_graph_gray.png")
          }
        />
        방제/농지분석
      </MainMenuBox>

      <SubMenuBox className={openMenu("방제/농지분석")} $height={8}>
        <Menu
          className={selectSub("홈")}
          onClick={() => Navigate(menu_url["홈"])}
        >
          ･홈(드론조종사)
        </Menu>
        <Menu
          className={selectSub("거래매칭")}
          onClick={() => Navigate(menu_url["거래매칭"])}
        >
          ･거래매칭
        </Menu>
        <Menu
          className={selectSub("작업현재상황")}
          onClick={() => Navigate(menu_url["작업현재상황"])}
        >
          ･작업현재상황
        </Menu>
        <Menu
          className={selectSub("정산")}
          onClick={() => Navigate(menu_url["정산"])}
        >
          ･정산
        </Menu>
      </SubMenuBox>
    </div>
  );
};

const UserMenu_농약상 = (props) => {
  const Navigate = useNavigate();
  const selectMain = props.selectMain;
  const setSelectMenu = props.setSelectMenu;
  const selectSub = props.selectSub;
  const openMenu = props.openMenu;

  return (
    <div>
      <MainMenuBox
        className={selectMain("농약")}
        onClick={() => setSelectMenu("농약")}
      >
        <Icon
          src={
            selectMain("농약")
              ? require("../../img/icon_pesticide_red.png")
              : require("../../img/icon_pesticide_gray.png")
          }
        />
        농약
      </MainMenuBox>

      <SubMenuBox className={openMenu("농약")} $height={8}>
        <Menu
          className={selectSub("홈")}
          onClick={() => Navigate(menu_url["홈"])}
        >
          ･홈(농약상)
        </Menu>
        <Menu
          className={selectSub("재고등록")}
          onClick={() => Navigate(menu_url["재고등록"])}
        >
          ･재고등록
        </Menu>
        <Menu
          className={selectSub("작업현재상황2")}
          onClick={() => Navigate(menu_url["작업현재상황2"])}
        >
          ･작업현재상황
        </Menu>
        <Menu
          className={selectSub("정산2")}
          onClick={() => Navigate(menu_url["정산2"])}
        >
          ･정산
        </Menu>
      </SubMenuBox>
    </div>
  );
};

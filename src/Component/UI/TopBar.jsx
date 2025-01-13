import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GreenColor, Icon, RowView, RowView2 } from "../common_style";
import { useUser } from "../userContext";
import { logout } from "../../Api/api";

const Container = styled(RowView)`
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #eeeeee;
  white-space: nowrap;
  overflow: hidden;
`;
const MenuArea = styled(RowView2)`
  img {
    width: 80px;
    margin-right: 1.5rem;
  }
  div {
    margin: 0rem 1.5rem;
    font-size: 20px;
    font-family: var(--font-Pretendard-Medium);
    cursor: pointer;
  }
  div.this {
    color: ${GreenColor};
  }
`;
const Logout = styled.div`
  padding: 0.6rem 2.4rem;
  border: 1px solid #f0f0f0;
  border-radius: 50px;
  cursor: pointer;
  transition: border 0.3s;
  &:hover {
    border: 1px solid #454545;
  }
`;

const TopBar = (props) => {
  const Navigate = useNavigate();
  const { isLogin } = useUser();
  const topMenu = props.topMenu;

  const isThisPage = (menu) => {
    if (topMenu === menu) return "this";
    return "";
  };

  const goHome = () => (window.location = "/");
  const goCompanyInfo = () => Navigate("/CompanyInfo");
  const goCs = () => Navigate("/Cs");
  const goServiceInfo = () => Navigate("/ServiceInfo");

  const Logout_API = () => {
    // localStorage에 userInfo가 저장되어있기 때문에
    // 로그아웃 API sucess 후 해당 코드가 꼭 실행되어야 합니다.
    logout();
    // localStorage.removeItem("User_Credential");
    // window.location.replace("/");
  };

  return (
    <Container>
      <MenuArea>
        <Icon
          className="pointer"
          src={require("../../img/Logo.png")}
          onClick={goHome}
        />
        <div className={isThisPage("회사소개")} onClick={goCompanyInfo}>
          회사소개
        </div>
        {/* <div className={isThisPage("고객센터")} onClick={goCs}>
          고객센터
        </div> */}
        <div
          className={isThisPage("서비스 소개 및 이용방법")}
          onClick={goServiceInfo}
        >
          서비스 소개 및 이용방법
        </div>
      </MenuArea>

      {isLogin && <Logout onClick={Logout_API}>로그아웃</Logout>}
    </Container>
  );
};
export default TopBar;

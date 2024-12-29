import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  Icon,
  RowView,
} from "../../Component/common_style";
import Login from "../Home/Login";

const Section1 = styled.div`
  position: relative;
  width: 100%;
  height: 50rem;
  background-color: #eeeeee;
  overflow: hidden;
  div.content {
    box-sizing: border-box;
    padding: 0rem 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
  }
  div.flex {
    flex: 1;
  }
  div.text {
    font-size: 80px;
    font-family: var(--font-Pretendard-SemiBold);
  }
`;
const HomePic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SignUp_Login = () => {
  return (
    <Common_Layout>
      <Section1>
        <HomePic src={require("../../img/home1.png")} />

        <RowView className="content">
          <CenterView className="flex">
            <div className="text">
              농업의 미래를 함께할,
              <br />
              회원이 되어 주셔서
              <br />
              감사합니다.
            </div>
          </CenterView>
          <CenterView className="flex">
            <Login signUpNone={true} />
          </CenterView>
        </RowView>
      </Section1>
    </Common_Layout>
  );
};
export default SignUp_Login;

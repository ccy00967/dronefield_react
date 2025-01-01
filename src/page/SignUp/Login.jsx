import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  RowView,
} from "../../Component/common_style";
import Login from "../Home/Login";
import { Section1, HomePic } from "./css/LoginCss";


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

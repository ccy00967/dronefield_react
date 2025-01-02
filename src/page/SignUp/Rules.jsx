import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  CheckBox,
  Icon,
  RowView2
} from "../../Component/common_style";
import { server } from "../url";
import {
  LoginBox,
  AllCheck,
  CheckArea,
  BtnArea,
} from "./css/RulesCss";


const Rules = () => {
  const Navigate = useNavigate();
  const { state } = useLocation();

  // state 값이 없으면 회원가입으로 돌아감
  useEffect(() => {
    if (!state) {
      Navigate("/signUp");
      return;
    }
  }, []);

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const setting_allCheck = () => {
    setCheck1(true);
    setCheck2(true);
    setCheck3(true);
    setCheck4(true);
  };
  const setting_check1 = () => setCheck1(!check1);
  const setting_check2 = () => setCheck2(!check2);
  const setting_check3 = () => setCheck3(!check3);
  const setting_check4 = () => setCheck4(!check4);

  const oepn_check1 = () =>
    window.open("tos/이용약관", "_blank", "width=500,height=500");
  const oepn_check2 = () =>
    window.open(
      "tos/개인정보_수집_및_이용에_대한_안내",
      "_blank",
      "width=500,height=500"
    );
  const oepn_check3 = () =>
    window.open(
      "tos/개인정보_제3자_제공동의",
      "_blank",
      "width=500,height=500"
    );
  const oepn_check4 = () =>
    window.open(
      "tos/드론평야_맞춤_정보_수집_동의",
      "_blank",
      "width=500,height=500"
    );

  const signUpAPI = async () => {
    // 회원가입 요청 보내기
    const res = await fetch(server + '/user/register/', {
      method: 'POST',
      headers: [["Content-Type", 'application/json']],
      credentials: "include",
      body: JSON.stringify(state),
    });

    console.log(res);

    if (true) {
      // 회원가입 성공
      return true;
    }
    // 회원가입 실패
    return false;
  };

  const goHome = () => Navigate("/");
  const goNext = () => {
    // 전체동의
    if (check1 && check2 && check3 && check4) {
      // 회원가입 실행 if문안에서 실행
      if (signUpAPI())
        Navigate("/signUp/login", {
          state: state,
        });
      return;
    }
    // 그 외
    alert("전체동의 해주세요.");
  };

  return (
    <Common_Layout>
      <LoginBox className="col">
        <CenterView className="pageName">
          회원가입을 위해
          <span className="point">약관</span>에 동의해주세요.
        </CenterView>

        <AllCheck onClick={setting_allCheck}>
          <CheckBox
            type={"checkbox"}
            checked={check1 && check2 && check3 && check4}
            readOnly
          />
          전체동의
        </AllCheck>

        <CheckArea>
          <RowView2 onClick={setting_check1}>
            <CheckBox type={"checkbox"} checked={check1} readOnly />
            이용약관
            <span>(필수)</span>
          </RowView2>
          <RowView2 onClick={oepn_check1}>
            <span>보기</span>
            <Icon src={require("../../img/icon_arrow_gray.png")} />
          </RowView2>
        </CheckArea>
        <CheckArea>
          <RowView2 onClick={setting_check2}>
            <CheckBox type={"checkbox"} checked={check2} readOnly />
            개인정보 수집 및 이용에 대한 안내
            <span>(필수)</span>
          </RowView2>
          <RowView2 onClick={oepn_check2}>
            <span>보기</span>
            <Icon src={require("../../img/icon_arrow_gray.png")} />
          </RowView2>
        </CheckArea>
        <CheckArea>
          <RowView2 onClick={setting_check3}>
            <CheckBox type={"checkbox"} checked={check3} readOnly />
            개인정보 제3자 제공동의
            <span>(필수)</span>
          </RowView2>
          <RowView2 onClick={oepn_check3}>
            <span>보기</span>
            <Icon src={require("../../img/icon_arrow_gray.png")} />
          </RowView2>
        </CheckArea>
        <CheckArea>
          <RowView2 onClick={setting_check4}>
            <CheckBox type={"checkbox"} checked={check4} readOnly />
            드론평야 맞춤 정보 수진 동의
            <span>(필수)</span>
          </RowView2>
          <RowView2 onClick={oepn_check4}>
            <span>보기</span>
            <Icon src={require("../../img/icon_arrow_gray.png")} />
          </RowView2>
        </CheckArea>

        <BtnArea>
          <div className="gray" onClick={goHome}>
            처음으로
          </div>
          <div className="green" onClick={goNext}>
            회원가입 완료
          </div>
        </BtnArea>
      </LoginBox>
    </Common_Layout>
  );
};

export default Rules;

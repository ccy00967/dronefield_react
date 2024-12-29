import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView, CheckBox, GreenColor, hoverGreen, Icon,
  RowView,
  RowView2
} from "../../Component/common_style";
import { server } from "../url";

const LoginBox = styled(CenterView)`
  width: 100%;
  max-width: 30rem;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin: 10rem auto;
  div.pageName {
    flex-wrap: wrap;
    margin-bottom: 1rem;
    font-family: var(--font-Pretendard-Medium);
    font-size: 28px;
  }
  span.point {
    margin-left: 5px;
    color: ${GreenColor};
  }
`;
const AllCheck = styled(RowView2)`
  box-sizing: border-box;
  width: 100%;
  padding: 0.7rem 1rem;
  margin: 1rem 0rem;
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  background-color: #f8f8f8;
  border-radius: 8px;
  cursor: pointer;
`;
const CheckArea = styled(RowView)`
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3rem 1rem;
  div {
    cursor: pointer;
  }
  span {
    margin-left: 5px;
    font-size: 14px;
    color: #8e8e8e;
  }
`;
const BtnArea = styled(RowView2)`
  width: 100%;
  font-family: var(--font-Pretendard-SemiBold);
  div {
    flex: 1;
    padding: 1rem 0rem;
    margin-top: 2rem;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
  }
  div.gray {
    margin-right: 1rem;
    color: gray;
    background-color: white;
    border: 1px solid #f0f0f0;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  div.green {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;

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

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
    window.open("tos/1", "_blank", "width=500,height=500");
  const oepn_check2 = () =>
    window.open(
      "tos/2",
      "_blank",
      "width=500,height=500"
    );
  const oepn_check3 = () =>
    window.open(
      "tos/3",
      "_blank",
      "width=500,height=500"
    );
  const oepn_check4 = () =>
    window.open(
      "tos/4",
      "_blank",
      "width=500,height=500"
    );

    const signUpAPI = async (formData) => {
      try {
        // URLSearchParams를 사용하여 x-www-form-urlencoded 형식으로 변환
        const bodyData = new URLSearchParams();
        
        for (const key in formData) {
          if (typeof formData[key] === "object" && formData[key] !== null) {
            bodyData.append(key, JSON.stringify(formData[key]));
          } else {
            bodyData.append(key, formData[key]);
          }
        }
    
        // ✅ Boolean 값 변환 (true → 1, false → 0)
        bodyData.append("optional_consent", formData.optional_consent ? "1" : "0");
    
        const res = await fetch(server + "/user/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include",
          body: bodyData.toString(), // ✅ optional_consent가 포함된 bodyData 전송
        });
    
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "회원가입 요청 실패");
        }
    
        const responseData = await res.json();
        console.log("회원가입 성공:", responseData);
        return true;
    
      } catch (error) {
        console.error("회원가입 오류 발생:", error.message);
        return false;
      }
    };
    
    

  const goHome = () => Navigate("/");
  const goNext = async () => {
    // 전체 동의 체크 확인
    if (check1 && check2 && check3 && check4) {
      try {
        const isSuccess = await signUpAPI(state);  // ⬅️ 회원가입 결과를 기다림
        if (isSuccess) {
          Navigate("/signUp/login", { state: state }); // ⬅️ 회원가입 성공 시 이동
        } else {
          alert("회원가입에 실패했습니다. 다시 시도해주세요.");
        }
      } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
      return;
    }
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import {
  Icon,
  RowView,
} from "../../Component/common_style";
import { ScrollToTop_smooth } from "../../Component/function/ScrollTop";
import AddressModal from "./AddressModal";
import NicePassBtn from "./NicePassBtn";
import { useDispatch, useSelector } from "react-redux";
import { nicePassFail } from "../../state/niceSuccessState";
import * as message from "./messageforSignUp";
import { emailValidateCheck, sendOTPEmail } from "./signupFunc";
import {
  LoginBox,
  AlertText,
  TypeBox,
  InputBox,
  TmpPASSBtn,
  Btn
} from "./css/SignUpCss";
import NicePassBtn2 from "./NicePassBtn2";


// 로그인에 필요한 유저정보
const userModel = {
  name: "",
  birth: "",
  gender: "",
  nationalinfo: "",
  mobileco: "",
  phone_number: "",
  email: "",
  password: "",
  role: "",
  address: {
    roadaddress: "",
    jibunAddress: "",
    detailAddress: "",
  },
}

const SignUp = () => {
  const Navigate = useNavigate();
  const [tokenVersionId, setTokenVersionId] = useState("");
  const [userType, setUserType] = useState("");
  const [id, setID] = useState(""); // id는 email과 같음
  const [otp, setOtp] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const [addrRoad, setAddrRoad] = useState("");
  const [addrJibun, setAddrJibun] = useState("");
  const [addrDetail, setAddrDetail] = useState("");

  // 나이스 본인인증 여부
  const dispatch = useDispatch();
  const nicePassIsSuccess = useSelector(state => { return state.niceSuccessState.isSuccess; });

  // 네이버 지도 팝업 모달창
  const [addrmodalOpen, setAddrModalOpen] = useState(false);
  const closeAddrModal = () => { setAddrModalOpen(false) };

  // 임시 본인인증 데이터 - 나이스에서는 토큰으로 넘어올 예정
  const [niceData, setNicepass] = useState({});

  const setting_type1 = () => setUserType("농업인");
  const setting_type2 = () => setUserType("드론조종사");
  const setting_type3 = () => setUserType("농약상");
  // 선택한 userType class명 바꾸기
  const typeClassName = (type) => {
    if (userType === type) return "this";
    return "";
  };

  const setting_id = (e) => setID(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);

  const setting_addrRoad = (e) => setAddrRoad(e.target.value);
  const setting_addrJubun = (e) => setAddrJibun(e.target.value);
  const setting_addrDetail = (e) => setAddrDetail(e.target.value);

  const setting_pw = (e) => {
    if (isOk_Pw(e.target.value)) {
      setAlert_pw("ok");
    } else {
      setAlert_pw("no");
    }
    setPw(e.target.value);
  };
  const setting_pwCheck = (e) => {
    if (pw === e.target.value && pw !== "") {
      setAlert_pwCheck("ok");
    } else {
      setAlert_pwCheck("no");
    }
    setPwCheck(e.target.value);
  };

  // (비밀번호 유효성검사) 영문/숫자/특수문자 포함 10~16자
  const isOk_Pw = (pw) => {
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    return pattern.test(pw);
  };

  // 경고문 상태값 (빈문자열, ok, no 로 구분)
  const [alert_type, setAlert_type] = useState("");
  //const [alert_pass, setAlert_pass] = useState("");
  const [alert_id, setAlert_id] = useState("");
  const [alert_otp, setAlert_otp] = useState("");
  const [alert_pw, setAlert_pw] = useState("");
  const [alert_pwCheck, setAlert_pwCheck] = useState("");

  // 인증이메일 발송
  const click_otp_send = async () => {
    if (id === "") {
      setAlert_id("no");
      return;
    }

    const res = await sendOTPEmail(id, tokenVersionId)
    if (res.ok) {
      setAlert_id("ok");
    }
  }

  // 인증번호 유효성 검사
  const click_otp_check = async () => {
    if (otp === "") {
      setAlert_otp("no");
      return;
    }

    const res = await emailValidateCheck(otp, tokenVersionId)
    if (res.ok) {
      console.log(res)
      setAlert_otp("ok");
    }
    else {
      setAlert_otp("no");
    }
  };

  /** 주소 찾기 API */
  const search_addr_API = () => {
    setAddrModalOpen(true);
    // setAddr("API 연결");
  };

  /** 가입하기 버튼 - 로직은 수정 바랍니다. */
  const go_nextPage = () => {
    // 회원선택을 선택하지 않았다면 no
    if (userType === "") {
      ScrollToTop_smooth();
      return setAlert_type("no");
    }
    // PASS 본인인증을 하지 않았다면 no
    // if (nicePassIsSuccess != "ok") {
    //   ScrollToTop_smooth();
    //   return dispatch(nicePassFail())
    // }
    if (id === "") {
      // 아이디가 없으면 no
      ScrollToTop_smooth();
      return setAlert_id("no");
    }
    if (alert_pw === "no" || alert_pwCheck === "no") {
      return;
    }

    // 기본값 4 == 농업인
    let roleSelect = 4
    if (userType === "드론조종사") { roleSelect = 3 } // * 나중에 3,4번으로 전부 수정하기 3==방제사, 4==농민

    console.log({
      email: id,
      password: pw,
      type: roleSelect,
      road: addrRoad,
      jibun: addrJibun,
      detail: addrDetail,
      token_version_id: tokenVersionId,
    })

    // 약관 동의로 이동
    Navigate("rules", {
      state: {
        email: id,
        password: pw,
        type: roleSelect,
        road: addrRoad,
        jibun: addrJibun,
        detail: addrDetail,
        token_version_id: tokenVersionId,

      }
    });
  };

  return (
    <Common_Layout minWidth={1}>
      <LoginBox className="col">
        <div className="pageName">기본정보입력</div>
        <div className="title">회원선택</div>
        <RowView>
          <TypeBox className={typeClassName("농업인")} onClick={setting_type1}>
            농업인
            {userType === "농업인" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox>
          <TypeBox
            className={`center ${typeClassName("드론조종사")}`}
            onClick={setting_type2}
          >
            드론조종사
            {userType === "드론조종사" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox>
          {/* <TypeBox className={typeClassName("농약상")} onClick={setting_type3}>
            농약상
            {userType === "농약상" && (
              <Icon src={require("../../img/icon_check.png")} />
            )}
          </TypeBox> */}
        </RowView>
        {userType === "" && (
          <AlertText className={alert_type}>
            {message.alert_type[alert_type] || message.alert_type.default}
          </AlertText>
        )}

        <div className="title">본인인증</div>
        {/* <NicePassBtn /> */}
        <NicePassBtn2 setTokenVersionId={setTokenVersionId} />
        {/* <AlertText className={nicePassIsSuccess}>
          {message.alert_pass[nicePassIsSuccess] || message.alert_pass.default}
        </AlertText> */}

        <div className="title">아이디</div>
        <RowView>
          <InputBox
            placeholder="이메일을 입력해주세요."
            value={id}
            onChange={setting_id}
            className={alert_id}
          />
          <Btn onClick={click_otp_send}>인증번호 발송</Btn>
        </RowView>
        <AlertText className={alert_id}>
          {message.alert_id[alert_id] || message.alert_id.default}
        </AlertText>

        <div className="title">인증번호</div>
        <RowView>
          <InputBox
            //type={"password"}
            placeholder="인증번호를 입력해주세요.(유효시간 5분)"
            value={otp}
            onChange={setting_otp}
            className={alert_otp}
          />
          <Btn onClick={click_otp_check}>확인</Btn>
        </RowView>
        <AlertText className={alert_otp}>
          {message.alert_otp[alert_otp] || message.alert_otp.default}
        </AlertText>

        <div className="title">비밀번호</div>
        <RowView>
          <InputBox
            className={alert_pw}
            type={"password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength={16}
            value={pw}
            onChange={setting_pw}
          />
        </RowView>
        <AlertText className={alert_pw}>
          {message.alert_pw[alert_pw] || message.alert_pw.default}
        </AlertText>

        <div className="title">비밀번호 확인</div>
        <RowView>
          <InputBox
            type={"password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength={16}
            value={pwCheck}
            onChange={setting_pwCheck}
          />
        </RowView>
        <AlertText className={alert_pwCheck}>
          {message.alert_pwCheck[alert_pwCheck] ||
            message.alert_pwCheck.default}
        </AlertText>

        <div className="title">집 주소</div>
        <RowView>
          <InputBox
            placeholder="집 주소를 입력해주세요."
            value={addrRoad}
            readOnly
          />
          <Btn onClick={search_addr_API}>주소 찾기</Btn>
        </RowView>
        <RowView>
          <InputBox
            placeholder="상세 주소를 입력해주세요."
            value={addrDetail}
            onChange={setting_addrDetail}
            style={{ marginTop: "0.7rem" }}
          />
        </RowView>

        <Btn className="signUp" onClick={go_nextPage}>
          가입하기
        </Btn>

      </LoginBox>
      {
        addrmodalOpen &&
        <AddressModal
          isOpen={addrmodalOpen}
          closeAddrModal={closeAddrModal}
          setAddrRoad={setAddrRoad}
          setAddrJibun={setAddrJibun}
        />
      }
    </Common_Layout>
  );
};


export default SignUp;

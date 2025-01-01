import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import {
  RowView2,
} from "../../Component/common_style";
import {
  FindBox,
  InputBox,
  MiniBtn,
  Btn,
} from "./css/FindPWCss";


const FindPW = () => {
  const Navigate = useNavigate();

  const [findOk, setFindOk] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const setting_email = (e) => setEmail(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);
  const setting_pw = (e) => setPassword(e.target.value);
  const setting_new_pw = (e) => setNewPassword(e.target.value);

  // 확인을 눌러도 되는 상태인지 판별
  const isOk = () => {
    if (email.length !== 0 && otp !== 0) return "ok";
    return "";
  };

  const next_page = () => {
    if (isOk()) {
      setFindOk(true);
    }
  };
  const send_otp_API = () => {
    alert("인증번호 발송");
  };
  const check_otp_API = () => {
    alert("인증번호 확인");
  };
  const FindPW_API = () => {
    alert("비밀번호 변경");
  };

  return (
    <Common_Layout minWidth={1}>
      <FindBox className="col">
        {findOk ? (
          <>
            <div className="title">비밀번호 재설정</div>

            <div className="text">새 비밀번호</div>
            <RowView2 className="text">
              <InputBox
                type={"password"}
                className="none"
                placeholder="새 비밀번호를 입력해주세요."
                value={password}
                onChange={setting_pw}
              />
            </RowView2>
            <span>영문/숫자/특수문자 포함 10~16자</span>

            <div className="text">새 비밀번호 확인</div>
            <RowView2 className="text">
              <InputBox
                type={"password"}
                placeholder="새 비밀번호를 한번 더 입력해주세요."
                value={newPassword}
                onChange={setting_new_pw}
              />
            </RowView2>
            <Btn className={isOk()} onClick={FindPW_API}>
              확인
            </Btn>
          </>
        ) : (
          <>
            <div className="title">비밀번호 찾기</div>

            <div className="text">아이디(이메일) 인증</div>
            <RowView2 className="text">
              <InputBox
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={setting_email}
              />
              <MiniBtn onClick={send_otp_API}>인증번호 발송</MiniBtn>
            </RowView2>

            <div className="text">인증번호</div>
            <RowView2 className="text">
              <InputBox
                placeholder="인증번호를 입력해주세요.(유효시간 5분)"
                value={otp}
                onChange={setting_otp}
              />
              <MiniBtn onClick={check_otp_API}>확인</MiniBtn>
            </RowView2>
            <Btn className={isOk()} onClick={next_page}>
              확인
            </Btn>
          </>
        )}
      </FindBox>
    </Common_Layout>
  );
};

export default FindPW;

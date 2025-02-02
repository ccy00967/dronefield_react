import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import { resetPassword, sendResetPasswordCode } from "../../Api/api";
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

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [dob, setDob] = useState(""); // Date of Birth
  const [phone, setPhone] = useState("");

  const setting_email = (e) => setEmail(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);
  const setting_pw = (e) => setPassword(e.target.value);
  const setting_new_pw = (e) => setNewPassword(e.target.value);
  const setting_name = (e) => setName(e.target.value);
  const setting_dob = (e) => setDob(e.target.value);
  const setting_phone = (e) => setPhone(e.target.value);

  // 확인 버튼 활성화 여부
  const isOk = () => {
    if (email.length !== 0 && otp.length === 6) return "ok";
    return "";
  };

  const handleResetPassword = async () => {
    if (password !== newPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const requestData = {
      validate_key: otp, // 인증번호
      password, // 새 비밀번호
    };

    try {
      const result = await resetPassword(requestData);
      console.log("Password reset successful:", result);
      alert("비밀번호가 성공적으로 변경되었습니다!");
    } catch (error) {
      console.error("Failed to reset password:", error);
      alert("비밀번호 변경에 실패했습니다.");
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

  const handleSubmit = async () => {
    const requestData = { email, name, dob, phone };
    console.log("Request Data:", requestData);
    try {
      const result = await sendResetPasswordCode(requestData);
      console.log("Success:", result);
      alert("요청이 성공적으로 완료되었습니다!");
    } catch (error) {
      alert("요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <Common_Layout minWidth={1}>
      <FindBox className="col">
        <div className="title">비밀번호 찾기</div>


        <div className="text">이름</div>
        <RowView2 className="text">
          <InputBox
            placeholder="이름을 입력해주세요."
            value={name}
            onChange={setting_name}
          />
        </RowView2>

        <div className="text">생년월일</div>
        <RowView2 className="text">
          <InputBox
            placeholder="생년월일을 입력해주세요."
            value={dob}
            onChange={setting_dob}
          />
        </RowView2>
        <div className="text">전화번호</div>
        <RowView2 className="text">
          <InputBox
            placeholder="전화번호을 입력해주세요."
            value={phone}
            onChange={setting_phone}
          />
        </RowView2>

        <div className="text">아이디(이메일) 인증</div>
        <RowView2 className="text">
          <InputBox
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={setting_email}
          />
          <MiniBtn onClick={handleSubmit}>인증번호 발송</MiniBtn>
        </RowView2>

        <div className="text">인증번호</div>
        <RowView2 className="text">
          <InputBox
            placeholder="인증번호를 입력해주세요.(유효시간 5분)"
            value={otp}
            onChange={setting_otp}
          />
          {/* <MiniBtn onClick={check_otp_API}>확인</MiniBtn> */}
        </RowView2>

        {/* 비밀번호 재설정 UI: OTP가 6자리가 될 때 나타남 */}
        {otp.length === 6 && (
          <>
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
            <Btn className="ok" onClick={handleResetPassword}>
              비밀번호 변경
            </Btn>
          </>
        )}

        {/* <Btn className={isOk()} onClick={handleSubmit}>
          확인
        </Btn> */}
      </FindBox>
    </Common_Layout>
  );
};

export default FindPW;

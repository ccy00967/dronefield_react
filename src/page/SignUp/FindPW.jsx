import { useState } from "react";
import Common_Layout from "../../Component/common_Layout";
import { Container, Content, Title, InfoBox, InputBox, Btn } from "../Menu/css/MyInfoCss";
import { server } from "../url";

const FindPW = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const sendOtp = async () => {
    if (!email || !name || !birthdate || !mobile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${server}/user/resetpassword/sendcode/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          email,
          name,
          birthdate,
          mobileno: mobile,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("인증번호가 발송되었습니다.");
        setSessionId(data.sessionid); // 세션 ID 저장
        setOtpSent(true);
      } else {
        const error = await response.json();
        alert(`인증번호 발송 실패: ${error.message}`);
      }
    } catch (error) {
      console.error("인증번호 발송 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const isOk_Pw = (pw) => {
    const pattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    return pattern.test(pw);
  };

  const verifyOtpAndResetPassword = async () => {
    if (!otp || !newPassword || !confirmPassword) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    if (!isOk_Pw(newPassword)) {
      alert("비밀번호는 8~16자이며, 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }
  
    try {
      const response = await fetch(`${server}/user/resetpassword/checkcode/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          password: newPassword,
          validate_key: otp,
          sessionid: sessionId,
        }),
      });
  
      if (response.ok) {
        alert("비밀번호가 성공적으로 변경되었습니다!");
        setPasswordChanged(true);
      } else {
        const error = await response.json();
        alert(`비밀번호 변경 실패: ${error.message}`);
      }
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setBirthdate("");
    setMobile("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setSessionId("");
    setOtpSent(false);
    setPasswordChanged(false);
  };

  return (
    <Common_Layout minWidth={850}>
      <Container>
        <Content>
          <Title $fontsize={28}>비밀번호 찾기</Title>
          <InfoBox style={{ maxWidth: "570px", margin: "0 auto" }}>
            {passwordChanged ? (
              <>
                <div className="label">비밀번호 변경 완료</div>
                <div style={{ marginBottom: "1rem" }}>
                  비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동해주세요.
                </div>
                <Btn className="green" onClick={resetForm}>
                  다시 찾기
                </Btn>
              </>
            ) : otpSent ? (
              <>
                <div className="label">인증번호</div>
                <InputBox
                  placeholder="발송된 인증번호를 입력해주세요."
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <div className="label">새 비밀번호</div>
                <InputBox
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <div className="label">비밀번호 확인</div>
                <InputBox
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Btn className="green" onClick={verifyOtpAndResetPassword}>
                  비밀번호 변경
                </Btn>
              </>
            ) : (
              <>
                <div className="label">이름</div>
                <InputBox
                  placeholder="이름을 입력해주세요."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <div className="label">생년월일</div>
                <InputBox
                  placeholder="YYYYMMDD 형식으로 입력해주세요."
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />

                <div className="label">휴대폰 번호</div>
                <InputBox
                  placeholder="휴대폰 번호를 입력해주세요."
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />

                <div className="label">이메일</div>
                <InputBox
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Btn className="green" onClick={sendOtp}>
                  인증번호 발송
                </Btn>
              </>
            )}
          </InfoBox>
        </Content>
      </Container>
    </Common_Layout>
  );
};

export default FindPW;

import { useState } from "react";
import Common_Layout from "../../Component/common_Layout";
import { Container, Content, Title, InfoBox, InputBox, Btn } from "../Menu/css/MyInfoCss";
import { server } from "../url";

const FindID = () => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [mobile, setMobile] = useState("");
  const [validateKey, setValidateKey] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [email, setEmail] = useState("");
  const [findOk, setFindOk] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // SMS 코드 전송
  const handleSendCode = async () => {
    if (!name || !birthdate || !mobile) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${server}/user/findid/sendcode/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
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
    } catch (err) {
      console.error("인증번호 전송 오류:", err);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // SMS 코드 인증
  const handleValidateCode = async () => {
    if (!validateKey || !sessionId) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${server}/user/findid/checkcode/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          validate_key: validateKey,
          sessionid: sessionId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmail(data.email); // 성공적으로 받은 이메일 저장
        setFindOk(true);
      } else {
        const error = await response.json();
        alert(`인증번호 확인 실패: ${error.message}`);
      }
    } catch (err) {
      console.error("인증번호 확인 오류:", err);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 다시 찾기 초기화
  const handleReset = () => {
    setName("");
    setBirthdate("");
    setMobile("");
    setValidateKey("");
    setSessionId("");
    setOtpSent(false);
    setFindOk(false);
  };

  return (
    <Common_Layout minWidth={850}>
      <Container>
        <Content>
          <Title $fontsize={28}>아이디 찾기</Title>
          <InfoBox style={{ maxWidth: "570px", margin: "0 auto" }}>
            {findOk ? (
              <>
                <div className="label">아이디 찾기 결과</div>
                <div style={{ marginBottom: "1rem" }}>
                  {name}님의 아이디는 아래와 같습니다.
                </div>
                <InputBox value={email} readOnly />
                <Btn className="green" onClick={handleReset}>
                  다시 찾기
                </Btn>
              </>
            ) : otpSent ? (
              <>
                <div className="label">인증번호</div>
                <InputBox
                  placeholder="발송된 인증번호를 입력해주세요."
                  value={validateKey}
                  onChange={(e) => setValidateKey(e.target.value)}
                />
                <Btn className="green" onClick={handleValidateCode}>
                  인증번호 확인
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

                <Btn className="green" onClick={handleSendCode}>
                  인증번호 받기
                </Btn>
              </>
            )}
          </InfoBox>
        </Content>
      </Container>
    </Common_Layout>
  );
};

export default FindID;

import { useState, useEffect } from "react";
import Common_Layout from "../../Component/common_Layout";
import {
  RowView,
  RowView2,
} from "../../Component/common_style";
import { useUser } from "../../Component/userContext";
import SideMenuBar from "./SideMenuBar";
import { server } from "../url";
import {
  Container,
  Content,
  Title,
  InfoBox,
  InputBox,
  Btn
} from "./css/MyInfoCss";


const MyInfo = () => {
  const { User_Credential } = useUser();
  const userType = User_Credential.userType;
  const themeColor = () => {
    if (userType === "농업인") return "green";
    if (userType === "드론조종사") return "blue";
    if (userType === "농약상") return "red";
  };

  const [myInfo, setMyInfo] = useState({});
  const [email, setEmail] = useState(myInfo?.email);
  const [otp, setOtp] = useState("");
  const [tel, setTel] = useState(myInfo?.tel);

  const setting_email = (e) => setEmail(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);
  const setting_tel = (e) => setTel(e.target.value);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userCredential = JSON.parse(localStorage.getItem('User_Credential'));
      const accessToken = userCredential ? userCredential.access_token : null;
      const uuid = userCredential ? userCredential.uuid : null;
      console.log('access', accessToken)
      if (accessToken) {
        const res = await fetch(server + `/user/profile/`, {
          // const res = await fetch(server + `/user/userinfo/${uuid}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.ok) {
          const resdata = await res.json();
          console.log('resdata', resdata)
          setMyInfo({
            name: resdata.name,
            email: resdata.email,
            tel: resdata.mobileno,
          });
        } else {
          console.error('유저정보를 불러오지 못했습니다.', res.status);
        }
      } else {
        console.error('액세스토큰 또는 uuid가 없습니다.');
      }
    };

    fetchUserInfo();
  }, []);


  const sendOTP_API = () => {
    alert("인증번호 전송");
  };
  const chekcOTP_API = () => {
    alert("인증번호 확인");
  };
  const tel_API = () => {
    alert("본인인증");
  };
  const modify_API = () => {
    console.log({
      이메일: email,
      인증번호: otp,
      전화번호: tel,
    });
  };

  return (
    <Common_Layout minWidth={850}>
      <Container>
        <SideMenuBar mainmenu={"내 정보 수정"} />

        <Content>
          <Title $fontsize={28}>내 정보 수정</Title>

          <RowView2 className="top">
            <InfoBox style={{ marginRight: "2rem" }}>
              <Title $fontsize={22}>현재 개인정보</Title>

              <div className="label">이름</div>
              <InputBox value={myInfo.name} disabled />

              <div className="label">이메일</div>
              <InputBox value={myInfo.email} disabled />

              <div className="label">전화번호</div>
              <InputBox value={myInfo.tel} disabled />
            </InfoBox>

            <InfoBox>
              <Title $fontsize={22}>수정 개인정보</Title>

              <div className="label">이메일</div>
              <RowView>
                <InputBox
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={setting_email}
                />
                <Btn className={themeColor()} $width={9} onClick={sendOTP_API}>
                  인증번호발송
                </Btn>
              </RowView>

              <div className="label">인증번호</div>
              <RowView>
                <InputBox
                  placeholder="인증번호를 입력해주세요.(유효시간 5분)"
                  value={otp}
                  onChange={setting_otp}
                />
                <Btn className={themeColor()} $width={9} onClick={chekcOTP_API}>
                  확인
                </Btn>
              </RowView>

              <div className="label">전화번호</div>
              <RowView>
                <InputBox
                  placeholder="전화번호를 입력해주세요."
                  value={tel}
                  onChange={setting_tel}
                />
                <Btn
                  className={themeColor()}
                  $width={9}
                  onClick={tel_API}
                >
                  본인인증
                </Btn>
              </RowView>

              <Btn className={themeColor()} onClick={modify_API}>
                수정하기
              </Btn>
            </InfoBox>
          </RowView2>
        </Content>
      </Container>
    </Common_Layout>
  );
};

export default MyInfo;

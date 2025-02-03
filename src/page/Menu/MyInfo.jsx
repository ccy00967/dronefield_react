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
  Btn,
  Btn2
} from "./css/MyInfoCss";
import AddressModal from "../SignUp/AddressModal";

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

  const [addrRoad, setAddrRoad] = useState(""); // 도로명 주소
  const [addrJibun, setAddrJibun] = useState(""); // 지번 주소
  const [addrDetail, setAddrDetail] = useState(""); // 상세 주소

  const [addrModalOpen, setAddrModalOpen] = useState(false); // 모달 상태

  const openAddrModal = () => setAddrModalOpen(true);
  const closeAddrModal = () => setAddrModalOpen(false);

  const setting_email = (e) => setEmail(e.target.value);
  const setting_otp = (e) => setOtp(e.target.value);
  const setting_tel = (e) => setTel(e.target.value);
  const setting_addrDetail = (e) => setAddrDetail(e.target.value);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userCredential = JSON.parse(localStorage.getItem("User_Credential"));
      const accessToken = userCredential ? userCredential.access_token : null;

      if (accessToken) {
        const res = await fetch(server + `/user/profile/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const resdata = await res.json();
          console.log(resdata)
          setMyInfo({
            name: resdata.name,
            email: resdata.email,
            tel: resdata.mobileno,
          });
        } else {
          console.error("유저정보를 불러오지 못했습니다.", res.status);
        }
      } else {
        console.error("액세스토큰 또는 uuid가 없습니다.");
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
      주소: addrRoad,
      상세주소: addrDetail,
    });
  };

  // 보유 드론 정보 상태
  const [droneInfo, setDroneInfo] = useState({
    name: "",
    model: "",
    capacity: "",
    
  });

  // 파일 상태 (드론 이미지, 자격증, 사업자 등록증)
  const [files, setFiles] = useState({
    droneImage: null,
    licenseImage: null,
    businessImage: null,
  });


  
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFiles((prevFiles) => ({
          ...prevFiles,
          [type]: reader.result, // 미리보기 이미지 URL 저장
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveDroneInfo = () => {
    alert("드론 정보가 저장되었습니다!");
    console.log("droneInfo",droneInfo,files.droneImage)
  };

  const saveCertificates = () => {
    alert("자격증 및 사업자 등록증이 저장되었습니다!");
    console.log("files",files)
  };


  return (
    <Common_Layout minWidth={850}>
      {userType === "농업인" && (
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

                <div className="label">주소</div>
                <RowView>
                  <InputBox
                    placeholder="집 주소를 입력해주세요."
                    value={addrRoad}
                    disabled
                  />
                  <Btn className={themeColor()} onClick={openAddrModal} $width={9}>주소 찾기</Btn>
                </RowView>

                <div className="label">상세주소</div>
                <RowView>
                  <InputBox
                    placeholder="상세 주소를 입력해주세요."
                    value={addrDetail}
                    onChange={setting_addrDetail}
                  />
                </RowView>

                <Btn className={themeColor()} onClick={modify_API}>
                  수정하기
                </Btn>
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
                  <Btn className={themeColor()} $width={9} onClick={tel_API}>
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

      )}

      {userType === "드론조종사" && (
        <Container>
          <SideMenuBar mainmenu={"내 정보 수정"} />

          <Content>
            <Title $fontsize={28}>내 정보 수정</Title>

            <RowView2 className="top">
              {/* 현재 개인정보 */}
              <div>
                <InfoBox style={{ marginRight: "2rem", width: "570px", height: "920px" }}>
                  <Title $fontsize={22}>현재 개인정보</Title>

                  <div className="label">이름</div>
                  <InputBox value={myInfo.name} disabled />

                  <div className="label">이메일</div>
                  <InputBox value={myInfo.email} disabled />

                  <div className="label">전화번호</div>
                  <InputBox value={myInfo.tel} disabled />

                  <div className="label" style={{
                    marginTop: "50px"
                  }}>주소</div>
                  <RowView>
                    <InputBox placeholder="집 주소를 입력해주세요." value={addrRoad} disabled />
                    <Btn className={themeColor()} onClick={() => setAddrModalOpen(true)} $width={9}>
                      주소 찾기
                    </Btn>
                  </RowView>

                  <div className="label">상세주소</div>
                  <RowView>
                    <InputBox placeholder="상세 주소를 입력해주세요." value={addrDetail} onChange={(e) => setAddrDetail(e.target.value)} />
                  </RowView>
                  <div className="label" style={{ marginTop: "70px" }}>은행</div>
                  <RowView>
                    <InputBox
                      placeholder="은행정보를 입력해주세요."
                    // value={addrDetail}
                    // onChange={setting_addrDetail}
                    />
                  </RowView>


                  <div className="label">계좌번호</div>
                  <RowView>
                    <InputBox
                      placeholder="1234-5678-9101."
                    // value={addrDetail}
                    // onChange={setting_addrDetail}
                    />
                  </RowView>
                  <Btn className={themeColor()} onClick={modify_API}>
                    수정하기
                  </Btn>
                </InfoBox>

              </div>

              <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                {/* 현재 보유 드론 */}
                <InfoBox style={{ width: "940px", height: "482px" }}>

                  <RowView>
                    <div style={{ width: "390px" }}>
                      <Title $fontsize={22}>현재 보유 드론</Title>

                      <div className="label">드론 이름</div>
                      <InputBox placeholder="드론 이름 입력" value={droneInfo.name} onChange={(e) => setDroneInfo({ ...droneInfo, name: e.target.value })} />

                      <div className="label">모델명</div>
                      <InputBox placeholder="모델명 입력" value={droneInfo.model} onChange={(e) => setDroneInfo({ ...droneInfo, model: e.target.value })} />

                      <div className="label">용량</div>
                      <InputBox placeholder="용량 입력" value={droneInfo.capacity} onChange={(e) => setDroneInfo({ ...droneInfo, capacity: e.target.value })} />
                    </div>


                    <div>
                      <div className="label" style={{ marginBottom: "10px" }}>드론 이미지 업로드</div>

                      <label // 네모 박스를 label로 감싸 클릭 가능하게 만듦
                        style={{
                          width: "425px",
                          height: "296px",
                          border: "2px solid #007BFF",
                          borderRadius: "8px", // 둥근 모서리 추가
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          cursor: "pointer", // 커서를 포인터로 변경
                          marginBottom: "20px",
                          position: "relative",
                          backgroundColor: files.droneImage ? "transparent" : "#F9F9F9", // 이미지 없으면 배경색 추가
                        }}
                      >
                        {files.droneImage ? (
                          <img
                            src={files.droneImage}
                            alt="드론 이미지 미리보기"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ color: "#aaa" }}>드론 이미지 업로드</span>
                        )}

                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, "droneImage")}
                          style={{
                            opacity: 0, // input을 숨김
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                    </div>


                  </RowView>
                  <Btn2 className={themeColor()} onClick={saveDroneInfo}>저장하기</Btn2>
                </InfoBox>


                {/* 자격증 및 사업자 등록증 */}
                <InfoBox style={{ width: "940px", height: "408px" }}>
                  <Title $fontsize={22} style={{marginBottom:"20px"}}>자격증 및 사업자 등록증</Title>
                  <RowView2>
                    {/* 자격증 이미지 업로드 */}
                    <div style={{ marginRight: "20px" }}>
                      {/* <div className="label" style={{ marginBottom: "10px" }}>자격증 이미지 업로드</div> */}
                      <label
                        style={{
                          width: "425px",
                          height: "269px",
                          border: "2px solid #007BFF",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor: files.licenseImage ? "transparent" : "#F9F9F9",
                        }}
                      >
                        {files.licenseImage ? (
                          <img
                            src={files.licenseImage}
                            alt="자격증 이미지 미리보기"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ color: "#aaa" }}>자격증 이미지 업로드</span>
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, "licenseImage")}
                          style={{
                            opacity: 0,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                    </div>

                    {/* 사업자 이미지 업로드 */}
                    <div>
                      {/* <div className="label" style={{ marginBottom: "10px" }}>사업자 이미지 업로드</div> */}
                      <label
                        style={{
                          width: "425px",
                          height: "269px",
                          border: "2px solid #007BFF",
                          borderRadius: "8px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                          backgroundColor: files.businessImage ? "transparent" : "#F9F9F9",
                        }}
                      >
                        {files.businessImage ? (
                          <img
                            src={files.businessImage}
                            alt="사업자 이미지 미리보기"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <span style={{ color: "#aaa" }}>사업자 이미지 업로드</span>
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(e, "businessImage")}
                          style={{
                            opacity: 0,
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                        />
                      </label>
                    </div>
                  </RowView2>

                  <Btn2 className={themeColor()} onClick={saveCertificates} style={{marginTop:"15px"}}>
                    저장하기
                  </Btn2>
                </InfoBox>


              </div>

            </RowView2>
          </Content>

        </Container>

      )}


      {/* 주소 찾기 모달 */}
      {addrModalOpen && (
        <AddressModal
          isOpen={addrModalOpen}
          closeAddrModal={closeAddrModal}
          setAddrRoad={setAddrRoad}
          setAddrJibun={setAddrJibun}
        />
      )}
    </Common_Layout>
  );
};

export default MyInfo;

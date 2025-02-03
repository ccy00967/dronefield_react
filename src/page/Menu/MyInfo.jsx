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
    if (!addrRoad || !addrDetail) {
      alert("모든 주소 정보를 입력해주세요.");
      return;
    }

    updateAddressAPI(); // API 요청
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

  const [licenseData, setLicenseData] = useState({
    title: "", // 자격증 명칭
    nickname: "", // 자격증 별칭
    number: "", // 자격증 번호
    workerNumber: "", // 사업자 번호
    businessType: "", // 사업자 구분 (개인, 법인 등)
  });


  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prevFiles) => ({
        ...prevFiles,
        [type]: {
          file, // 실제 파일
          preview: URL.createObjectURL(file), // 미리보기 URL
        },
      }));
    }
  };


  useEffect(() => {
    return () => {
      if (files.droneImage?.preview) {
        URL.revokeObjectURL(files.droneImage.preview); // URL 해제
      }
    };
  }, [files.droneImage]);


  const saveDroneInfo = () => {
    if (!droneInfo.name || !droneInfo.model || !droneInfo.capacity || !files.droneImage) {
      alert("모든 필드를 입력하고 이미지를 업로드해주세요.");
      return;
    }

    console.log("등록할 드론 정보:", droneInfo, files.droneImage);

    // 드론 등록 API 호출
    registerDrone();
  };

  const saveCertificates = () => {
    alert("자격증 및 사업자 등록증이 저장되었습니다!");
    console.log("files", files)
  };



  const convertToPng = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      // 파일을 읽어 데이터 URL로 변환
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          // 캔버스를 PNG 데이터로 변환
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const pngFile = new File([blob], "image.png", { type: "image/png" });
                resolve(pngFile); // PNG 파일 반환
              } else {
                reject(new Error("PNG 변환 실패"));
              }
            },
            "image/png",
            1 // 이미지 품질 (1 = 최고 품질)
          );
        };

        img.onerror = (err) => reject(err);
      };

      reader.onerror = (err) => reject(err);

      // 파일 읽기 시작
      reader.readAsDataURL(imageFile);
    });
  };


  const registerDrone = async () => {
    const formData = new FormData();

    // 드론 명칭, 모델명, 용량 추가
    formData.append("nickname", droneInfo.name);
    formData.append("model_number", droneInfo.model);
    formData.append("capacity", droneInfo.capacity);

    try {
      if (!files.droneImage) {
        alert("드론 이미지를 업로드해주세요.");
        return;
      }

      // 이미지 파일을 PNG로 변환
      const pngImage = await convertToPng(files.droneImage.file);
      formData.append("image", pngImage); // 변환된 PNG 이미지 추가

      const userCredential = JSON.parse(localStorage.getItem("User_Credential"));
      const accessToken = userCredential ? userCredential.access_token : null;

      if (!accessToken) {
        console.error("Access Token이 없습니다.");
        return;
      }

      const response = await fetch(`${server}/exterminator/drone/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 헤더
        },
        body: formData, // form-data 전송
      });

      if (response.ok) {
        const result = await response.json();
        alert("드론 등록이 완료되었습니다!");
        console.log("응답 데이터:", result);
      } else {
        const errorData = await response.json();
        console.error("드론 등록 실패:", errorData);
        alert("드론 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("드론 등록 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const registerLicense = async () => {
    const formData = new FormData();

    // 텍스트 필드 추가
    formData.append("license_title", licenseData.title); // 라이센스 명칭
    formData.append("license_nickname", licenseData.nickname); // 라이센스 별칭
    formData.append("license_number", licenseData.number); // 라이센스 번호
    formData.append("worker_registration_number", licenseData.workerNumber); // 사업자 번호
    formData.append("business_registration_type", licenseData.businessType); // 사업자 구분

    // 파일 필드 추가
    if (files.licenseImage?.file) {
      formData.append("license_image", files.licenseImage.file); // 자격증 이미지
    }
    if (files.businessImage?.file) {
      formData.append("business_registration_image", files.businessImage.file); // 사업자 등록증 이미지
    }

    try {
      const userCredential = JSON.parse(localStorage.getItem("User_Credential"));
      const accessToken = userCredential ? userCredential.access_token : null;

      if (!accessToken) {
        console.error("Access Token이 없습니다.");
        return;
      }

      const response = await fetch(`${server}/exterminator/license/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // 인증 헤더 추가
        },
        body: formData, // form-data 전송
      });

      if (response.ok) {
        const result = await response.json();
        alert("라이센스 등록이 완료되었습니다!");
        console.log("응답 데이터:", result);
      } else {
        const errorData = await response.json();
        console.error("라이센스 등록 실패:", errorData);
        alert("라이센스 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("라이센스 등록 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const updateAddressAPI = async () => {
    const userCredential = JSON.parse(localStorage.getItem("User_Credential"));
    const accessToken = userCredential ? userCredential.access_token : null;

    if (!accessToken) {
      alert("Access Token이 없습니다. 다시 로그인해주세요.");
      return;
    }

    try {
      const response = await fetch(`${server}/user/profile/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessToken}`, // 인증 토큰
        },
        body: new URLSearchParams({
          road: addrRoad,
          detail: addrDetail, // 도로명 주소와 상세 주소만 전송
        }), // 폼 데이터로 전달
      });

      if (response.ok) {
        alert("주소가 성공적으로 수정되었습니다!");
        const data = await response.json();
        console.log("수정된 데이터:", data);
        setMyInfo((prev) => ({
          ...prev,
          road: addrRoad,
          detail: addrDetail,
        })); // UI 업데이트
      } else {
        const error = await response.json();
        console.error("주소 수정 실패:", error);
        alert("주소 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("주소 수정 중 오류 발생:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };



  return (
    <Common_Layout minWidth={850}>
      {userType === "농업인" && (
        <Container>
          <SideMenuBar mainmenu={"내 정보 수정"} />

          <Content>
            <Title $fontsize={28}>내 정보 수정</Title>

            
              <InfoBox style={{
                marginRight: "2rem", width: "570px", // 너비 조정
                maxWidth: "100%", }}>
                < Title $fontsize={22}>현재 개인정보</Title>

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

            
        
        </Content>
        </Container>

  )
}

{
  userType === "드론조종사" && (
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
                        src={files.droneImage.preview}
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
            <InfoBox style={{ width: "940px", height: "auto", padding: "20px" }}>
              <Title $fontsize={22} style={{ marginBottom: "20px" }}>라이센스 등록</Title>

              {/* 자격증 정보 섹션 */}
              <div style={{ marginBottom: "30px" }}>
                <Title $fontsize={18} style={{ marginBottom: "10px", color: "#007BFF" }}>자격증 정보</Title>
                <RowView>
                  <div style={{ flex: 1, marginRight: "20px" }}>
                    <div className="label">자격증 명칭</div>
                    <InputBox
                      placeholder="자격증 명칭 입력"
                      value={licenseData.title}
                      onChange={(e) => setLicenseData({ ...licenseData, title: e.target.value })}
                    />
                    <small style={{ color: "#888" }}>예: 드론 1종 조종 자격증</small>

                    <div className="label" style={{ marginTop: "15px" }}>자격증 별칭</div>
                    <InputBox
                      placeholder="자격증 별칭 입력"
                      value={licenseData.nickname}
                      onChange={(e) => setLicenseData({ ...licenseData, nickname: e.target.value })}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="label">자격증 번호</div>
                    <InputBox
                      placeholder="자격증 번호 입력"
                      value={licenseData.number}
                      onChange={(e) => setLicenseData({ ...licenseData, number: e.target.value })}
                    />
                    <small style={{ color: "#888" }}>예: 1234-5678</small>
                  </div>
                </RowView>

                <div style={{ marginTop: "20px" }}>
                  <div className="label" style={{ marginBottom: "10px" }}>자격증 이미지</div>
                  <label
                    style={{
                      width: "100%",
                      height: "150px",
                      border: "2px solid  #007BFF",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: files.licenseImage ? "transparent" : "#F9F9F9",
                    }}
                  >
                    {files.licenseImage?.preview ? (
                      <>
                        <img
                          src={files.licenseImage.preview}
                          alt="자격증 이미지 미리보기"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                        <button
                          onClick={() => setFiles((prev) => ({ ...prev, licenseImage: null }))}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "#FF5252",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>클릭하여 자격증 이미지 업로드</span>
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
              </div>

              {/* 사업자 등록 정보 섹션 */}
              <div>
                <Title $fontsize={18} style={{ marginBottom: "10px", color: "#007BFF" }}>사업자 등록 정보</Title>
                <RowView>
                  <div style={{ flex: 1, marginRight: "20px" }}>
                    <div className="label">사업자 번호</div>
                    <InputBox
                      placeholder="사업자 번호 입력"
                      value={licenseData.workerNumber}
                      onChange={(e) => setLicenseData({ ...licenseData, workerNumber: e.target.value })}
                    />
                    <small style={{ color: "#888" }}>예: 123-45-67890</small>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div className="label">사업자 구분</div>
                    <InputBox
                      placeholder="사업자 구분 입력 (예: 개인, 법인)"
                      value={licenseData.businessType}
                      onChange={(e) => setLicenseData({ ...licenseData, businessType: e.target.value })}
                    />
                  </div>
                </RowView>

                <div style={{ marginTop: "20px" }}>
                  <div className="label" style={{ marginBottom: "10px" }}>사업자 등록증 이미지</div>
                  <label
                    style={{
                      width: "100%",
                      height: "150px",
                      border: "2px solid  #007BFF",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: files.businessImage ? "transparent" : "#F9F9F9",
                    }}
                  >
                    {files.businessImage?.preview ? (
                      <>
                        <img
                          src={files.businessImage.preview}
                          alt="사업자 등록증 이미지 미리보기"
                          style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                        <button
                          onClick={() => setFiles((prev) => ({ ...prev, businessImage: null }))}
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            backgroundColor: "#FF5252",
                            color: "#FFF",
                            border: "none",
                            borderRadius: "50%",
                            cursor: "pointer",
                            padding: "5px",
                          }}
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <span style={{ color: "#aaa" }}>클릭하여 사업자 등록증 이미지 업로드</span>
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
              </div>

              {/* 저장 버튼 */}
              <Btn2
                className={themeColor()}
                onClick={registerLicense}
                style={{
                  marginTop: "30px",
                  backgroundColor: "#007BFF",
                  color: "#FFF",
                  padding: "10px 20px",
                  borderRadius: "5px",
                }}
              >
                라이센스 등록
              </Btn2>
            </InfoBox>




          </div>

        </RowView2>
      </Content>

    </Container>

  )
}


{/* 주소 찾기 모달 */ }
{
  addrModalOpen && (
    <AddressModal
      isOpen={addrModalOpen}
      closeAddrModal={closeAddrModal}
      setAddrRoad={setAddrRoad}
      setAddrJibun={setAddrJibun}
    />
  )
}
    </Common_Layout >
  );
};

export default MyInfo;

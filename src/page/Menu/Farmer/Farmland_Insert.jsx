import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CheckBox,
  RowView2
} from "../../../Component/common_style";
import {
  InsertBox_Farmland_Insert, InputBox_Farmland_Insert, InputDiv_Farmland_Insert, Btn_Farmland_Insert
} from "./css/FarmerCss";

import $ from 'jquery';
import { server } from "../../url";
import { globalSearchAddressToCoordinate } from "./init_naver_map";
import Component_mapList from "./Component_mapList";
import { get_pnu_api, search_area_api, cd_for_accessToken, getCdApi, InsertRefreshAccessToken } from "../../../Api/Farmer";


// 농지를 등록하는 페이지
const Farmland_Insert = () => {

  const [totalArea, setTotalArea] = useState(0); // 총 면적
  const [landCount, setLandCount] = useState(0); // 필지 개수

  const [searchAddr, setSearchAddr] = useState(""); // 사용자가 입력한 지번 주소
  const [check, setCheck] = useState(false);  // 약관동의

  // 네이버 지도 주소 정보
  const [roadaddress, setRoadaddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  // 추가 정보
  const [pnu, setPnu] = useState("");
  const [lndpclAr, setLndpclAr] = useState("");
  const [cd, setCd] = useState("");
  const [landNickName, setLandNickName] = useState("");
  const [cropsInfo, setCropsInfo] = useState("");
  const [additionalPhoneNum, setAdditionalPhoneNum] = useState("");
  const adlndpclArup = Math.ceil(lndpclAr * 0.3025);
  const landinfo = {
    "address": {
      "roadaddress": window.addressInfo.roadAddress || "값이 없음",
      "jibunAddress": window.addressInfo.jibunAddress || "값이 없음",
      "detailAddress": "값이 없음"
    },
    "pnu": pnu || "값이 없음",
    "lndpclAr": lndpclAr,
    "cd": cd || "값이 없음",
    "landNickName": landNickName || "별명 없음",
    "cropsInfo": cropsInfo || "값이 없음",
    "additionalPhoneNum": "값이 없음"
  };

  const setting_addr = (e) => setSearchAddr(e.target.value)
  const setting_name = (e) => setLandNickName(e.target.value);
  // const setting_area = (e) => setFarmlandArea(e.target.value);
  // const setting_m2 = (e) => setFarmlandm2(e.target.value);
  const setting_acrea = (e) => setLndpclAr(e.target.value);
  const setting_plant = (e) => setCropsInfo(e.target.value);
  const setting_check = () => setCheck(!check);

  // const fetchpnu = async () =>{
  //   const pnuValue = await get_pnu_api();
  //   setPnu(pnuValue);
  // }

  // const PutSerchApi = async (pnu) =>{
  //   const area = await search_area_api(pnu);
  //   setLndpclAr(area);
  // }
  const fetchpnu = async () => {
    try {
      const pnuValue = await get_pnu_api(); // PNU 값을 비동기적으로 가져옴
      console.log("fetchpnu", pnuValue); // 가져온 PNU 값 로그 출력
      setPnu(pnuValue); // 상태 업데이트

      await PutSerchApi(pnuValue); // 가져온 PNU 값을 즉시 사용하여 API 호출
    } catch (error) {
      console.error("Error fetching PNU:", error); // 오류 처리
    }
  };

  const PutSerchApi = async (pnu) => {
    try {
      if (!pnu) {
        return;
      }

      const area = await search_area_api(pnu); // PNU를 기반으로 API 호출
      console.log("PutSerchApi", area); // 가져온 Land Area 값 로그 출력
      setLndpclAr(area); // 상태 업데이트
    } catch (error) {
      console.error("Error fetching Land Area:", error); // 오류 처리
    }
  };


  useEffect(() => {
    if (pnu) {
      console.log("useEffectPnu", pnu); // PNU 값 변경 로그
      // 필요한 추가 작업이 있다면 여기서 수행
    }
  }, [pnu]);

  useEffect(() => {
    if (lndpclAr) {
      console.log("useEffectLndpclAr", lndpclAr); // Land Area 값 변경 로그
      // Land Area 변경 시 추가 작업 수행
    }
  }, [lndpclAr]);


  //cd값을 가져오는 함수
  const handleFetchCd = async (token) => {
    // getCdApi를 호출하여 CD 값을 비동기적으로 가져옴
    // token은 인증 토큰이며, getCdApi에서 요청 시 사용
    const cd = await getCdApi(token);

    // CD 값이 유효하면 상태를 업데이트하고 로그를 출력
    if (cd) {
      setCd(cd); // CD 값을 React 상태로 저장
      console.log("Fetched CD:", cd); // CD 값 출력 (디버깅용)
    } else {
      console.log("CD 값이 반환되지 않았습니다."); // CD 값이 없을 경우 로그 출력
    }
  };


  // 주소 찾기
  const search_addr_API = async () => {
    if (!searchAddr) {
      return alert("농지 주소를 입력하세요.");
    }
    // 주소를 좌표로 변환 후 주소값 리턴
    if (globalSearchAddressToCoordinate) {
      globalSearchAddressToCoordinate(searchAddr); // Naver Map API를 통해 주소 검색
      console.log(searchAddr)
      setJibunAddress(window.addressInfo.jibunAddress)
    }
    return searchAddr;
  };

  // 농지 등록
  const insert_API = async () => {
    handleSearch()
    if (lndpclAr == "") {
      return alert("검색하기를 눌러서 면적을 입력해주세요");
    }

    if (!check) {
      alert("동의를 체크해주세요!")
      return
    }
    InsertRefreshAccessToken();

    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    let accessToken = userInfo?.access_token;
    console.log(landinfo);

    // 첫 번째 POST 요청
    let res = await fetch(server + "/customer/lands/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(landinfo),
    });

    // 401 에러 발생 시 토큰 갱신 후 다시 시도
    if (res.status === 401) {
      accessToken = await InsertRefreshAccessToken();
      if (accessToken) {
        // 새로운 액세스 토큰으로 다시 시도
        res = await fetch(server + "/customer/lands/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(landinfo),
        });
      }
    }

    // 응답이 성공했을 때 데이터 처리
    if (res.ok) {
      const result = await res.json();
      alert("농지 등록이 완료되었습니다.");
      console.log("Success:", result);
      // 페이지 새로고침
      window.location.reload();
    } else {
      console.error('요청 실패');
    }
  };

  //주소 찾기를 클릭하면 순차적으로 실행되도록 하는 함수
  const handleSearch = async (searchAddr) => {
    if (!searchAddr) {
      return alert("농지 주소를 입력하세요.");
    }

    // 순차 실행 전부 for pnu, cd 등등
    await search_addr_API(searchAddr);
    const token = await cd_for_accessToken();
    await handleFetchCd(token);
    await fetchpnu();
    //await get_pnu_api();
    await PutSerchApi();
  };


  // 면적 div태그 css
  const [isfocuse_area, setIsfocuse_area] = useState("off");
  const [isfocuse_m2, setIsfocuse_m2] = useState("off");
  const onFocus = () => setIsfocuse_area("on");
  const offFocus = () => setIsfocuse_area("off");
  const onFocus_m2 = () => setIsfocuse_m2("on");
  const offFocus_m2 = () => setIsfocuse_m2("off");


  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"마이페이지"}
        submenu={"농지등록"}
        setSearchAddr={setSearchAddr}
        setTotalArea={setTotalArea} // 총 면적 전달
        setLandCount={setLandCount} // 필지 개수 전달
      >
        <InsertBox_Farmland_Insert>
          <div className="title">농지등록</div>

          <div className="subtitle">농지 별명</div>
          <InputBox_Farmland_Insert
            placeholder="농지 별명을 입력해주세요."
            value={landNickName}
            onChange={setting_name}
          />

          <div className="subtitle">농지 주소</div>
          <RowView2>
            <InputBox_Farmland_Insert
              placeholder="보유하신 농지 지번 주소를 입력해주세요."
              value={searchAddr}
              onChange={setting_addr}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Btn_Farmland_Insert className="small" onClick={handleSearch}>
              주소 등록
            </Btn_Farmland_Insert>
          </RowView2>
          <InputDiv_Farmland_Insert className="smallText">*주소등록을 눌러야 면적이 아래 계산됩니다</InputDiv_Farmland_Insert>


          <RowView2>
            <div className="subtitle">면적</div>
            <div className="subtitle"><InputDiv_Farmland_Insert className="smallText">*자동입력됩니다</InputDiv_Farmland_Insert></div>
          </RowView2>

          <RowView2>
            <InputDiv_Farmland_Insert
              style={{ marginRight: "1rem" }}
              $isfocused={isfocuse_area}
              disabled={true}
            >
              <input
                value={adlndpclArup}
                //onChange={setting_acrea}
                readOnly
                onFocus={onFocus}
                onBlur={offFocus}
              //disabled={true}
              />
              평
            </InputDiv_Farmland_Insert>
            <InputDiv_Farmland_Insert $isfocused={isfocuse_m2}>
              <input
                value={lndpclAr}
                readOnly
                onChange={setting_acrea}
                onFocus={onFocus_m2}
                onBlur={offFocus_m2}
              //disabled={true}
              />
              m²
            </InputDiv_Farmland_Insert>
          </RowView2>

          <div className="subtitle">작물</div>
          <InputBox_Farmland_Insert
            placeholder="작물을 입력해주세요. ex)벼,콩,보리,옥수수"
            value={cropsInfo}
            onChange={setting_plant}
          />

          <RowView2
            className="pointer wrap"
            style={{ marginTop: "2rem" }}
            onClick={setting_check}
          >
            <CheckBox type={"checkbox"} checked={check} readOnly />
            본인 토지가 아닌 경우 책임은 등록/신청자에게 있습니다.
            <span> (필수)</span>
          </RowView2>

          <Btn_Farmland_Insert onClick={() => { insert_API() }}>농지등록</Btn_Farmland_Insert>

          {/* <Btn onClick={() => {
            console.log(window.addressInfo.jibunAddress)
          }}>
            네이버 변수 확인 window.address
          </Btn> */}
        </InsertBox_Farmland_Insert>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_Insert;

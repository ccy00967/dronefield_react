import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CheckBox,
  GreenColor,
  hoverGreen,
  RowView2
} from "../../../Component/common_style";
import Component_mapList from "./Component_mapList";
import { globalSearchAddressToCoordinate } from "../../../Component/naver_maps/GWNaverMaps";
import $ from 'jquery';
import { server } from "../../url";


const InsertBox = styled.div`
  flex: 1;
  margin-right: 2rem;

  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subtitle {
    margin-top: 1rem;
    font-family: var(--font-Pretendard-Medium);
  }
  span {
    font-size: 14px;
    color: gray;
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
  }
`;
const InputDiv = styled(RowView2)`
  flex: 1;
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  margin-top: 0.5rem;
  border: 1px solid;
  border-color: ${(props) =>
    props.$isfocused === "on" ? GreenColor : "#f0f0f0"};
  border-radius: 8px;
  input {
    font-size: 16px;
    width: 75%;
    margin-right: 0.5rem;
    outline: 0;
    border: 0;
  }
  &.smallText {
    font-size: 14px;
    color: gray;
    border: 0;
    margin: 0;
    padding: 0.5rem 1rem;
  }
`;
const Btn = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &.small {
    margin: 0 0 0 1rem;
    padding: 0.8rem 1rem;
    width: 10rem;
  }
  &:hover {
    background-color: ${hoverGreen};
  }
`;

// 농지 데이터

// 디지털트윈국토 for 토지임야정보: 개발용 KEY임 나중에 변경 필요 - 127.0.0.1이 허용됨
const KEY = "6C934ED4-5978-324D-B7DE-AC3A0DDC3B38"
// kosis 단계별 행정구역 and 검색API for cd값
const consumer_KEY = "fb0450ed86ba405ba3ec"
const consumer_SECRET = "a7ec04e5c1f8401594d5"

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

  //농지 주소 -> PNU 정보 변환
  const get_pnu_api = async () => {
    const getPnu = "https://api.vworld.kr/req/search?key=" + KEY;
    $.ajax({
      type: "GET",
      url: getPnu + "&request=search" + `&query=${window.addressInfo.jibunAddress}` + "&type=address" + "&category=parcel" + "&format=json",
      dataType: "jsonp",
      success: function (res) {
        const pnuValue = res.response.result.items[0].id;
        console.log(pnuValue);
        setPnu(pnuValue); // Update the PNU state
      },
      // error: function (e) {
      //   alert(e.responseText);
      // }
    });
  };

  useEffect(() => {
    if (pnu) {
      search_area_api();
    }
    if (lndpclAr) {
      search_area_api();
    }
  }, [pnu, lndpclAr]);

  // 주소검색으로 농지 제곱미터 받는 api
  const search_area_api = async () => {
    const getLndpclAr = "https://api.vworld.kr/ned/data/ladfrlList?key=" + KEY;
    $.ajax({
      type: "POST",
      url: getLndpclAr + `&pnu=${pnu}` + "&format=json",
      dataType: "jsonp",
      success: function (respnu) {
        const area = respnu.ladfrlVOList.ladfrlVOList[0].lndpclAr;
        console.log(area);
        setLndpclAr(area);
      },
      // error: function (e) {
      //   alert(e.responseText);
      // }
    });
  };

  // cd값을 받기 위한 엑세스토큰 발급 API
  const cd_for_accessToken = async () => {
    const res = await fetch("https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json" +
      "?consumer_key=" + consumer_KEY +
      "&consumer_secret=" + consumer_SECRET,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    const data = await res.json();
    const accessToken = data.result.accessToken;
    //setcdtoken(accessToken);
    return accessToken;
  }

  // 발급받은 토큰으로 주소검색하여 cd값 받기
  const get_cd_api = async (cdAccesstoken) => {
    try {
      const res = await fetch(`https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=${window.addressInfo.jibunAddress}&accessToken=${cdAccesstoken}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = await res.json();
      if (data.result && data.result.resultdata && data.result.resultdata[0] && data.result.resultdata[0].adm_cd) {
        const cd = data.result.resultdata[0].adm_cd;
        setCd(cd);
      } else {
        console.error("CD값이 없습니다.");
      }
    } catch (error) {
      console.error("Fetch 에러:", error);
    }
  }


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

    // 액세스 토큰과 리프레시 토큰을 갱신하는 함수
    const refreshAccessToken = async () => {
      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      const refreshToken = userInfo?.refresh_token;

      const res = await fetch(server + '/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // 액세스 토큰을 로컬스토리지에 갱신
        userInfo.access_token = data.access;
        localStorage.setItem('User_Credential', JSON.stringify(userInfo));
        return data.access; // 새로운 액세스 토큰 반환
      } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
        alert('다시 로그인해주세요'); // 경고창 표시
        localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
        window.location.replace('/'); // 첫 페이지로 리다이렉트
        return null;
      }
    };

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
      accessToken = await refreshAccessToken();
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
  const handleSearch = async () => {
    if (!searchAddr) {
      return alert("농지 주소를 입력하세요.");
    }

    // 순차 실행 전부 for pnu, cd 등등
    await search_addr_API();
    const token = await cd_for_accessToken();
    await get_cd_api(token);
    await get_pnu_api();
    await search_area_api();
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
        <InsertBox>
          <div className="title">농지등록</div>

          <div className="subtitle">농지 별명</div>
          <InputBox
            placeholder="농지 별명을 입력해주세요."
            value={landNickName}
            onChange={setting_name}
          />

          <div className="subtitle">농지 주소</div>
          <RowView2>
            <InputBox
              placeholder="보유하신 농지 지번 주소를 입력해주세요."
              value={searchAddr}
              onChange={setting_addr}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <Btn className="small" onClick={handleSearch}>
              검색 하기
            </Btn>
          </RowView2>
          <InputDiv className="smallText">*검색하기를 눌러야 면적이 아래 계산됩니다</InputDiv>


          <RowView2>
            <div className="subtitle">면적</div>
            <div className="subtitle"><InputDiv className="smallText">*자동입력됩니다</InputDiv></div>
          </RowView2>

          <RowView2>
            <InputDiv
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
            </InputDiv>
            <InputDiv $isfocused={isfocuse_m2}>
              <input
                value={lndpclAr}
                readOnly
                onChange={setting_acrea}
                onFocus={onFocus_m2}
                onBlur={offFocus_m2}
              //disabled={true}
              />
              m²
            </InputDiv>
          </RowView2>

          <div className="subtitle">작물</div>
          <InputBox
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

          <Btn onClick={insert_API}>농지등록</Btn>

          {/* <Btn onClick={() => {
            console.log(window.addressInfo.jibunAddress)
          }}>
            네이버 변수 확인 window.address
          </Btn> */}
        </InsertBox>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_Insert;

//lsy
import { server } from "../page/url";
import { KEY, refreshAccessToken } from "./Farmer";
import $ from 'jquery';

// const uuid = User_Credential?.uuid


//Matching

/**

 * 토스api를 사용하는데 필요한 유저정보 가져오기
 */
export const fetchUserInfo = async () => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
  if (!User_Credential || !User_Credential.access_token) {
    throw new Error("Access token is missing. Please log in again.");
  }

  let accessToken = User_Credential.access_token;

  // 요청 처리 함수
  const fetchRequest = async () => {
    const res = await fetch(`${server}/user/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    // console.log("userinfo", data);
    return data;
  };

  try {
    return await fetchRequest(); // 첫 요청 시도
  } catch (error) {
    if (error.message.includes("401")) {
      // Access Token 만료 처리
      console.warn("Access token expired. Attempting to refresh token...");

      return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
    }

    console.error("Error fetching user info:", error);
    return { error: true, message: error.message }; // 기타 에러 반환
  }
};






/**
 *  드론방제사 거래 수락
 * orderid를 모은 checkedList를 받음
 * @returns {<[OrderData]>}
 */

export const putfarmrequest = async (checkedList) => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
  if (!User_Credential || !User_Credential.access_token) {
    throw new Error("Access token is missing. Please log in again.");
  }

  let accessToken = User_Credential.access_token;

  // 요청 처리 함수
  const fetchRequest = async () => {
    console.log("Checked List:", checkedList);

    const response = await fetch(`${server}/exterminator/accept/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ orderidlist: checkedList }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response Data:", data);
    return data;
  };

  try {
    return await fetchRequest(); // 첫 요청 시도
  } catch (error) {
    if (error.message.includes("401")) {
      // Access Token 만료 처리
      console.warn("Access token expired. Attempting to refresh token...");

      return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
    }

    console.error("Error in putFarmRequest:", error);
    return { error: true, message: error.message }; // 기타 에러 반환
  }
};


/**
 * sgis 단계별 주소조회 api 토큰 받아오기
 * @returns 
 */
export const fetchToken = async () => {
  try {
    const response = await fetch(
      "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=fb0450ed86ba405ba3ec&consumer_secret=a7ec04e5c1f8401594d5"
    );
    if (response.status === 200) {
      const data = await response.json();
      return data.result.accessToken; // 받아온 토큰 값
    } else {
      throw new Error("Failed to fetch token");
    }
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};


// TODO: 단계별 행정구역 조회 API 변경
// sgis.kostat 에서 디지털트윈으로 변경
// 시/도 조회 https://api.vworld.kr/ned/data/admCodeList
// 시군구 조회 https://api.vworld.kr/ned/data/admSiList
// 읍면동 조회 https://api.vworld.kr/ned/data/admDongList


/**
 * sgis 단계별 주소조회 api를 이용한 cd값으로 지역정보 불러오기
 */
// export const fetchAddressData = async (code, setData, token) => {
//   try {
//     const _code = code ? `&cd=${code}` : "";
//     const apiUrl = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${token}${_code}`;
//     const response = await fetch(apiUrl);
//     if (response.status === 200) {
//       const data = await response.json();
//       const result = data.result.map((item) => addressDepthServerModel(item));
//       setData(result);
//     } else {
//       setData([]);
//     }
//   } catch (error) {
//     setData([]);
//   }

// };


// 시/도 조회
export const getSiDo = async (cd, setData) => {
  const url = "https://api.vworld.kr/ned/data/admCodeList" + "?key=" + KEY;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url:
        url +
        "&format=json" +
        "&numOfRows=1000",
      dataType: "jsonp",
      success: function (response) {
        const data = response.admVOList.admVOList;
        console.log("=============")
        console.log(data)
        const result = data.map((item) => addressDepthServerModel(item));
        setData(result);
      },
      error: function (e) {
        reject(e.responseText || "AJAX request failed");
      },
    });
  });
}


// 시군구 조회
export const getSiGunGu = async (cd, setData) => {
  const url = "https://api.vworld.kr/ned/data/admSiList" + "?key=" + KEY;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url:
        url +
        `&admCode=${cd}` + // 시도 코드(2자리)
        "&format=json" +
        "&numOfRows=1000",
      dataType: "jsonp",
      success: function (response) {
        const data = response.admVOList.admVOList;
        console.log("=============")
        console.log(data)
        const result = data.map((item) => addressDepthServerModel(item));
        setData(result);
      },
      error: function (e) {
        reject(e.responseText || "AJAX request failed");
      },
    });
  });
}


// 읍면동 조회
export const getEupMyeonDong = async (cd, setData) => {
  const url = "https://api.vworld.kr/ned/data/admDongList" + "?key=" + KEY;

  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url:
        url +
        `&admCode=${cd}` + // 시도/시군구 코드(5자리)
        "&format=json" +
        "&numOfRows=1000",
      dataType: "jsonp",
      success: function (response) {
        const data = response.admVOList.admVOList;
        console.log("=============")
        console.log(data)
        const result = data.map((item) => addressDepthServerModel(item));
        setData(result);
      },
      error: function (e) {
        reject(e.responseText || "AJAX request failed");
      },
    });
  });
}

const addressDepthServerModel = (json) => {
  return {
    code: json.admCode, // cd값
    name: json.admCodeNm, // 한글주소
  };
};


/**
 * 거래매칭 화면 리스트 불러오기
 * 행정구역 cd에 따라 거래 리스트 받는다
 * @return {Promise<[OrderInfo]>} 
 */
export const getfarmrequest = async (cdInfo, page = 1, page_size = 10) => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
  let accessToken = User_Credential?.access_token;

  const fetchRequest = async () => {
    const cdInfoURL = cdInfo ? `${cdInfo}` : "";
    const url = `${server}/trade/lists/?cd=${cdInfoURL}&page=${page}&page_size=${page_size}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 기존 Access Token 사용
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("getfarmre", data); // 결과 출력
    return data; // 성공 시 데이터 반환
  };

  try {
    return await fetchRequest(); // 첫 요청 시도
  } catch (error) {
    if (error.message.includes("401")) {
      // Access Token이 만료된 경우
      return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
    }

    console.error("Error fetching farm requests:", error);
    return { error: true, message: error.message }; // 기타 에러 반환
  }
};








//Workstatus


/**
 * 공통 API 함수 작업 현재상황 리스트 상태변환
 */
export const updateExterminateState = async (orderid, exterminatedata, confirmMessage, successMessage) => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));

  if (!User_Credential || !User_Credential.access_token) {
    alert("로그인이 필요합니다. 다시 로그인해주세요.");
    return;
  }

  const accessToken = User_Credential.access_token;

  console.log("orderid:", orderid);
  console.log("exterminatedata:", exterminatedata); // 데이터 확인

  const fetchRequest = async () => {
    try {
      // JSON 형식으로 데이터 생성
      const bodyData = JSON.stringify({ exterminateState: exterminatedata });

      const res = await fetch(`${server}/trade/exterminate/${orderid}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json", // JSON 형식 설정
          Authorization: `Bearer ${accessToken}`, // 인증 토큰 추가
        },
        body: bodyData, // JSON 데이터 전송
      });

      if (res.ok) {
        alert(successMessage); // 성공 메시지
        window.location.reload(); // 새로고침
      } else {
        const errorData = await res.json();
        console.error("Error updating state:", errorData);
        alert(`상태 업데이트 중 문제가 발생했습니다: ${errorData.error || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("네트워크 오류로 상태 업데이트를 완료할 수 없습니다.");
    }
  };

  if (window.confirm(confirmMessage)) {
    try {
      return await fetchRequest();
    } catch (error) {
      console.error("Error:", error);
      alert("작업 중 문제가 발생했습니다.");
    }
  } else {
    alert("작업이 취소되었습니다.");
  }
};






// API 함수 정의
export const cancel1_API = (orderid) =>
  updateExterminateState(orderid, 1, "취소하시겠습니까?", "취소되었습니다.");

export const cancel2_API = (orderid) =>
  updateExterminateState(orderid, 2, "취소하시겠습니까?", "취소되었습니다.");

export const workFin_API = (orderid) =>
  updateExterminateState(orderid, 3, "작업이 끝났습니까?", "작업이 완료되었습니다.");

export const workStart_API = (orderid) =>
  updateExterminateState(orderid, 2, "시작하시겠습니까?", "작업이 시작되었습니다.");

//Workstatus 여기까지




/**
 * 정산페이지 정산리스트 받기
 * @returns {<[OrderInfo]>}
 * exterminateState 3
 * 
 */

export const getWorkStatus = async () => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
  if (!User_Credential || !User_Credential.access_token) {
    throw new Error("Access token is missing. Please log in again.");
  }

  let accessToken = User_Credential.access_token;

  // 요청 처리 함수
  const fetchRequest = async () => {
    const res = await fetch(`${server}/trade/work-list/?exterminateState=3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      const errorText = await res.text();
      throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorText}`);
    }

    const data = await res.json();
    console.log("Work Status List:", data);
    return data.data;
  };

  try {
    return await fetchRequest(); // 첫 요청 시도
  } catch (error) {
    if (error.message.includes("Unauthorized")) {
      // 401 에러 처리: Access Token 갱신 후 재시도
      console.warn("Access token expired. Attempting to refresh token...");

      return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
    }

    console.error("Error fetching work status:", error);
    return { error: true, message: error.message }; // 기타 에러 반환
  }
};


/**
 * @typedef {Object} Address
 * @property {number} id - 고유 식별자
 * @property {string} roadaddress - 도로명 주소
 * @property {string} jibunAddress - 지번 주소
 * @property {string} detailAddress - 상세 주소
 */

/**
 * @typedef {Object} Owner
 * @property {string} uuid - 소유자 고유 식별자
 * @property {string} name - 소유자 이름
 * @property {string} email - 이메일
 * @property {string} mobileno - 휴대전화 번호
 * @property {string} birthdate - 생년월일
 * @property {number} role - 사용자 역할
 * @property {string} nationalinfo - 국적 정보
 * @property {Address} address - 주소 정보
 */

/**
 * @typedef {Object} LandInfo
 * @property {string} uuid - 농지 고유 식별자
 * @property {Owner} owner - 소유자 정보
 * @property {string} pnu - PNU 코드
 * @property {string} lndpclAr - 농지 면적
 * @property {string} landNickName - 농지 별칭
 * @property {string} cropsInfo - 재배 작물 정보
 * @property {Address} address - 주소 정보
 * @property {string} additionalPhoneNum - 추가 연락처
 */

/**
 * @typedef {Object} ExterminatorInfo
 * @property {string} name - 작업자 이름
 * @property {string} email - 이메일
 * @property {string} mobileno - 휴대전화 번호
 * @property {string} birthdate - 생년월일
 * @property {number} role - 사용자 역할
 * @property {Address} address - 주소 정보
 */

/**
 * @typedef {Object} OrderInfo
 * @property {string} orderid - 주문 ID
 * @property {Owner} owner - 주문자 정보
 * @property {LandInfo} landInfo - 농지 정보
 * @property {number} requestAmount - 요청 금액
 * @property {number} requestDepositState - 요청 보증 상태
 * @property {number} reservateDepositAmount - 예약 보증 금액
 * @property {number} reservateDepositState - 예약 보증 상태
 * @property {string} startDate - 작업 시작일
 * @property {string} endDate - 작업 종료일
 * @property {number} exterminateState - 작업 상태
 * @property {number} customerCheckState - 고객 확인 상태
 * @property {number} calculation - 정산 상태
 * @property {number} dealmothod - 거래 방식
 * @property {string} pesticide - 사용한 농약
 * @property {number} setAveragePrice - 설정 평균 가격
 * @property {ExterminatorInfo} exterminatorinfo - 작업자 정보
 */

/**
 * @typedef {Object} Userinfo
 * @property {Address} address - 주소 정보
 * @property {string} birthdate - 생년월일
 * @property {string} email - 이메일
 * @property {string} gender - 성별
 * @property {string} mobileno - 휴대전화 번호
 * @property {string} name - 이름
 * @property {string} nationalinfo - 국적 정보
 * @property {number} role - 사용자 역할
 */

/**
 * 주문 데이터 정보
 * @typedef {Object} OrderData
 * @property {Amount} amount - 결제 금액 정보
 * @property {string} customerEmail - 고객 이메일
 * @property {string} customerMobilePhone - 고객 휴대전화 번호
 * @property {string} customerName - 고객 이름
 * @property {string} failUrl - 실패 URL
 * @property {string} orderId - 주문 ID
 * @property {string} orderName - 주문 이름
 * @property {string} successUrl - 성공 URL
 */

/**
 * 결제 금액 정보
 * @typedef {Object} Amount
 * @property {string} currency - 통화 단위 (예: KRW)
 * @property {number} value - 결제 금액
 */


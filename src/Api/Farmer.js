// Written by Ccy 
// 각 정확한 url들은 나중에 수정이 필요합니다.

import { server } from "../page/url";
import $ from 'jquery';

// 장고에서 확정된 URL들을 적는다.
// API 이름 규칙 => /farmer/farms == api_farmer_farms
const api_getAccessToken = server + "/user/refresh/"
const api_farmer_farm = server + "/farmer/lands/";
// const api_getAccessToken = server + "/user/token/refresh/"
// const api_farmer_farm = server + "/customer/lands/";
// 디지털트윈국토 for 토지임야정보: 개발용 KEY임 나중에 변경 필요 - 127.0.0.1이 허용됨
const KEY = "6C934ED4-5978-324D-B7DE-AC3A0DDC3B38"
// kosis 단계별 행정구역 and 검색API for cd값
const consumer_KEY = "fb0450ed86ba405ba3ec"
const consumer_SECRET = "a7ec04e5c1f8401594d5"


const loadAccessToken = () => {
  // 액세스 토큰을 가져오기 - 여기서 입력할지 각 페이지에서 넣을지
  // 액세스 토큰이 만료된 경우 리프레시토큰으로 자동 갱신 함수 필요
  // 리프레시토큰도 만료된 경우 로그인 창으로 이동하는 함수 필요
  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  const accessToken = userInfo?.access_token;

  return accessToken;
}

// 리프레시토큰으로 액세스 토큰 새로 발급 with 다시 실행할 함수
export const refreshAccessToken = async (reTryFunc) => {
  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  const refreshToken = userInfo?.refresh_token
  // console.log(userInfo.refresh_token)


  try {
    const res = await fetch(api_getAccessToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${refreshToken}`,
      },
      body: new URLSearchParams({
        refresh: refreshToken  // refresh 토큰을 넣어줍니다.
      })
      // body: JSON.stringify({
      //   refresh: refreshToken,
      // }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    // 응답으로 액세스 토큰을 받음 - 장고 API 필요
    const token = await res.json();
    // console.log('token', token);
    userInfo.access_token = token.access;
    // console.log('userinfo', userInfo);

    localStorage.setItem('User_Credential', JSON.stringify(userInfo))

    if (typeof reTryFunc === 'function') {
      const data = await reTryFunc();
      return data;
    }

  } catch (e) {
    alert("다시 로그인 해주세요!");
    // 로그인 화면으로 리턴시키는 로직 작성
    localStorage.removeItem('User_Credential');
    window.location.href = '/'; // 로그인 페이지로 이동
  }
}

// Component_mapList에서 사용 - 페이지를 처음 들어가면 농지 리스트를 가져옴
/** 
 * 농지 리스트를 가져온다
 * currentPage page 현재 페이지
 * perPage page_size 페이지당 게시글 갯수
 * @returns {Promise<LandInfo[]>} 
*/
export const getLandInfo = async (perPage, currentPage) => {
  const accessToken = loadAccessToken(); // 토큰 로드
  const actualCurrentPage = currentPage || 1; // 페이지 초기값 설정
  const actualPerPage = perPage || 10;

  try {
    const res = await fetch(server + `/farmer/lands/?page=${actualCurrentPage}&page_size=${actualPerPage}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 401) {
      console.log("Access token expired. Refreshing...");
      return await refreshAccessToken(() => getLandInfo(perPage, currentPage));
    }

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched land info:", data);
    return data; // 올바른 데이터 반환
  } catch (e) {
    console.error("Error fetching land info:", e.message);
    alert("정보를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요.");
    return { data: [], total_items: 0 }; // 기본값 반환
  }
};

export const getLandcounts = async (setDone_count, setExterminating_count, setMatching_count, setPreparing_count, setBefore_pay_count) => {
  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  const accessToken = loadAccessToken();

  try {
    const res = await fetch(server + `/trade/counts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.status == 401) {
      return await refreshAccessToken(getLandInfo);
    }
    else if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log('counts', data);
    setDone_count(data.done_count)
    setExterminating_count(data.exterminating_count)
    setMatching_count(data.matching_count)
    setPreparing_count(data.preparing_count)
    setBefore_pay_count(data.before_pay_count)
  } catch (e) {
    alert("정보를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
    return [];
  }
}
/**
 * 서버에 삭제 요청
 * @param {*} uuid 
 * @returns 
 */
export const deleteLandInfo = async (landId) => {
  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  const accessToken = userInfo?.access_token;

  console.log("Access Token:", accessToken); // 디버깅용
  console.log("Land ID:", landId); // 디버깅용

  try {
    const res = await fetch(`${server}/farmer/land/${landId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Postman과 동일한 형식
      },
    });

    console.log("Response Status:", res.status); // 응답 상태 확인

    if (res.status === 401) {
      console.log("Access token expired. Refreshing token...");
      return await refreshAccessToken(() => deleteLandInfo(landId));
    }

    if (!res.ok) {
      const error = await res.json();
      console.error("Error deleting land:", error);
      throw new Error(error.message || `Error: ${res.statusText}`);
    }

    console.log("Land deleted successfully.");
    return true; // 삭제 성공
  } catch (e) {
    console.error("Delete Land Error:", e.message || e);
    return false; // 삭제 실패
  }
};



// 농지 Polygon 객체 받기
export const get_polygon_api = async (x, y) => {
  const getPolygon = "https://api.vworld.kr/req/data?key=" + KEY;
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url:
        getPolygon +
        "&request=GetFeature" +
        "&data=LP_PA_CBND_BUBUN" +
        // "&geomFilter=" +
        //`&attrFilter=pnu:=:4617012200113820009`,
        `&geomFilter=POINT(${x} ${y})`,
      dataType: "jsonp",
      success: function (res) {
        try {
          const polygon = res.response.result.featureCollection.features[0].geometry.coordinates[0]
          console.log(res)
          // console.log("pnu", pnuValue);
          console.log("polygon", polygon)
          resolve(polygon); // Promise 성공 시 값 반환
        } catch (error) {
          reject("Error parsing response");
        }
      },
      error: function (e) {
        reject(e.responseText || "AJAX request failed");
      },
    });
  });
}


/**

 * 농지 주소 -> PNU 정보 변환
 */
export const get_pnu_api = async () => {
  const getPnu = "https://api.vworld.kr/req/search?key=" + KEY;
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url:
        getPnu +
        "&request=search" +
        `&query=${window.addressInfo.jibunAddress}` +
        "&type=address" +
        "&category=parcel" +
        "&format=json",
      dataType: "jsonp",
      success: function (res) {
        try {
          const pnuValue = res.response.result.items[0].id;
          // console.log("pnu", pnuValue);
          resolve(pnuValue); // Promise 성공 시 값 반환
        } catch (error) {
          reject("Error parsing response");
        }
      },
      error: function (e) {
        reject(e.responseText || "AJAX request failed");
      },
    });
  });
};

/**
 * 주소검색으로 농지 제곱미터 받는 api
 * @param {*} pnu 
 * @returns 
 */
export const search_area_api = async (pnu) => {
  const getLndpclAr = "https://api.vworld.kr/ned/data/ladfrlList?key=" + KEY;
  // console.log("pnu1", pnu);
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: getLndpclAr + `&pnu=${pnu}` + "&format=json",
      dataType: "jsonp",
      success: function (respnu) {
        try {
          const area = respnu.ladfrlVOList.ladfrlVOList[0]?.lndpclAr; // 안전하게 데이터 접근
          // console.log("pnu2", pnu);
          console.log("search_area_api", area);
          resolve(area); // area 값을 Promise 성공 상태로 반환
        } catch (error) {
          console.error("Error parsing response:", error, respnu);
          reject("Error parsing response data");
        }
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", {
          status,
          error,
          responseText: xhr.responseText,
        });
        reject(xhr.responseText || `AJAX request failed: ${status}`);
      },
    });
  });
};

/**
 * cd값을 받기 위한 엑세스토큰 발급 API
 */
export const cd_for_accessToken = async () => {
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
/**
* Get CD API
* @param {string} cdAccesstoken - 인증 토큰
* @param {string} address - 주소 (기본값으로 window.addressInfo.jibunAddress 사용 가능)
* @returns {Promise<string | undefined>} - CD 값 반환 또는 undefined
*/
export const getCdApi = async (cdAccesstoken, address = window.addressInfo.jibunAddress) => {
  try {
    const res = await fetch(
      `https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocode.json?address=${address}&accessToken=${cdAccesstoken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = await res.json();

    if (data.result?.resultdata?.[0]?.adm_cd) {
      return data.result.resultdata[0].adm_cd; // CD 값 반환
    } else {
      console.error("CD 값이 없습니다.");
      return undefined;
    }
  } catch (error) {
    console.error("Fetch 에러:", error);
    return undefined;
  }
};
/**
 * 액세스 토큰과 리프레시 토큰을 갱신하는 함수
 */
export const InsertRefreshAccessToken = async () => {
  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  const refreshToken = userInfo?.refresh_token;

  const res = await fetch(server + api_getAccessToken, {
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

//Pestcontrol_apply
//방제신청
export const applyPestControl = async (postData, uuid, openModal) => {
  try {
    // 로컬 스토리지에서 사용자 정보 가져오기
    const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
    let accessToken = userInfo?.access_token;
    const refreshToken = userInfo?.refresh_token;

    console.log("POST Data:", postData);

    // 첫 번째 요청
    let res = await fetch(`${server}/trade/${uuid}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    // 401 Unauthorized 에러 처리
    if (res.status === 401) {
      console.warn("Access token expired. Attempting refresh...");
      accessToken = await refreshAccessToken(refreshToken); // 토큰 갱신 호출
      if (accessToken) {
        // 갱신된 토큰으로 다시 요청
        res = await fetch(`${server}/trade/${uuid}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(postData),
        });
      }
    }

    // 성공 처리
    if (res.status === 201) {
      const responseData = await res.json();
      console.log("Response Data:", responseData);
      openModal(responseData); // 성공 시 모달 열기
    } else {
      console.error("Request failed:", res.statusText);
      alert("방제 신청에 실패했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error("Error in applyPestControl:", error);
    alert("예기치 못한 오류가 발생했습니다. 다시 시도해주세요.");
  }
};



//방제이용목록의 정보 불러오기
export const load_API = async (
  setDataList,
  setCnt,
  currentPage = 1, // 기본값: 1
  perPage = 10, // 기본값: 10
  requestDepositState = 1, // 기본값: 1 (결제 완료 상태)
  exterminateState = 0 // 기본값: 0 (매칭 중 상태)
) => {
  const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
  const accessToken = userInfo?.access_token;

  const fetchData = async () => {
    // URL 매개변수 설정
    const params = new URLSearchParams({
      page: currentPage, // 기본값 1
      page_size: perPage, // 기본값 10
      exterminateState, // 기본값 0 (매칭 중)
      requestDepositState, // 기본값 1 (결제 완료)
    });

    // URL 생성
    const url = `${server}/trade/list/?${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    setCnt(data.total_items); // 전체 게시글 수 업데이트
    setDataList(data.data); // 데이터 리스트 업데이트
    console.log("datalist", data);
    return data; // 데이터 반환
  };

  try {
    return await fetchData();
  } catch (e) {
    if (e.message.includes("401")) {
      // 401 오류 발생 시 토큰 갱신 후 재시도
      return await refreshAccessToken(fetchData);
    }
    console.error("데이터 로드 실패:", e);
    throw e;
  }
};








//농지등록 함수
export const insert_API = async (landinfo, lndpclAr, check) => {
  if (lndpclAr === "") {
    return alert("검색하기를 눌러서 면적을 입력해주세요");
  }

  if (!check) {
    return alert("동의를 체크해주세요!");
  }

  // 토큰 갱신
  await refreshAccessToken();

  const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
  let accessToken = userInfo?.access_token;

  // URLSearchParams로 데이터 변환
  const formData = new URLSearchParams({
    detail: landinfo.detail || "값이 없음",
    cropsInfo: landinfo.cropsInfo || "값이 없음",
    landNickName: landinfo.landNickName || "값이 없음",
    additionalPhoneNum: landinfo.additionalPhoneNum || "값이 없음",
    pnu: landinfo.pnu || "값이 없음",
    lndpclAr: lndpclAr || "값이 없음",
    cd: landinfo.cd || "값이 없음",
    jibun: landinfo.jibun || "값이 없음",
    road: landinfo.road || "값이 없음"
  });

  // 첫 번째 POST 요청
  let res = await fetch(server + "/farmer/land/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", // 변경
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData.toString(), // URL-encoded 데이터
  });

  // 401 에러 발생 시 토큰 갱신 후 다시 시도
  if (res.status === 401) {
    accessToken = await refreshAccessToken();
    if (accessToken) {
      res = await fetch(server + "/farmer/land/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // 변경
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData.toString(), // URL-encoded 데이터
      });
    }
  }

  // 응답이 성공했을 때 처리
  if (res.ok) {
    const result = await res.json();
    alert("농지 등록이 완료되었습니다.");
    console.log("Success:", result);
    window.location.reload(); // 페이지 새로고침
  } else {
    const errorResponse = await res.text();
    console.error('요청 실패:', errorResponse);
    alert('농지 등록에 실패했습니다.');
  }
};



//농지정보 수정함수
export const editLandInfo = async (uuid, landinfo) => {
  console.log("landinfo", landinfo);
  const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
  const accessToken = userInfo?.access_token;

  try {
    const res = await fetch(server + `/farmer/land/${uuid}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(landinfo),
    });

    console.log("Response status:", res.status);

    // 성공 상태 반환
    if (res.ok) {
      return true; // 수정 성공 시 true 반환
    } else {
      console.error("Edit failed with status:", res.status);
      return false; // 수정 실패 시 false 반환
    }
  } catch (error) {
    console.error("EditLandInfo Error:", error);
    return false; // 예외 발생 시 false 반환
  }
};







/**
 * 농민 유저의 전부더한 농지 크기를 가져온다다
 * @param {농민유저의 농지 전부 더한 값} setAllLndpclAr 
 */
export const allLndpclAr_API = async (setAllLndpclAr) => {
  const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
  let accessToken = userInfo?.access_token;
  const res = await fetch(server + `/farmer/land/total-area/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();
  setAllLndpclAr(data.total_lndpclAr.toFixed(2));
  console.log('123', data);

}
/**
 * 쌍방 확인용 api
 */
export const updateCheckState = async (orderId, checkState) => {
  const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));

  if (!User_Credential || !User_Credential.access_token) {
    alert("로그인이 필요합니다. 다시 로그인해주세요.");
    return;
  }

  const accessToken = User_Credential.access_token;

  try {
    const res = await fetch(`${server}/trade/check/${orderId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // x-www-form-urlencoded 형식
        Authorization: `Bearer ${accessToken}`, // 인증 토큰
      },
      body: `checkState=${encodeURIComponent(checkState)}`, // URL-encoded Body
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error updating checkState:", errorData);
      alert(`상태 업데이트 중 문제가 발생했습니다: ${errorData.error || "알 수 없는 오류"}`);
      return null;
    }

    const data = await res.json();
    console.log("Check state updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    alert("네트워크 오류로 상태 업데이트를 완료할 수 없습니다.");
    return null;
  }
};


/**
 * orderId로 tossOrderId를 가져오는 API 요청
 * @param {string} orderId - 주문 ID
 * @returns {Promise<string>} tossOrderId
 */

export const getTradeDetail = async (orderId) => {
  try {
    // 로컬 스토리지에서 토큰 가져오기
    const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
    const accessToken = User_Credential?.access_token;

    if (!accessToken) {
      throw new Error("Access token is missing. Please log in again.");
    }

    // 요청 보내기
    const response = await fetch(`${server}/trade/detail/${orderId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 추가
      },
    });

    // 응답 확인
    if (!response.ok) {
      throw new Error(`Failed to fetch tossOrderId: ${response.statusText}`);
    }

    // JSON 데이터 파싱
    const data = await response.json();
    console.log("detaildata", data);

    return data.requestTosspayments; // tossOrderId 반환
  } catch (error) {
    console.error("Error fetching tossOrderId:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};







/** 농지
 * @typedef {Object} LandInfo
 * @property {string} uuid
 * @property {Owner} owner
 * @property {string} pnu
 * @property {string} lndpclAr
 * @property {Address} address
 * ...etc
 * // 더 필요한 속성들을 적는다
 */

/** 유저
 * @typedef {Object} Owner
 * @property {string} uuid
 * @property {string} name
 * @property {number} userType
 * @property {string} phoneNum
 * ...etc
 */

/** 주소
 * @typedef {Object} Address
 * @property {string} roadaddress
 * @property {string} jibunAddress 
 * @property {string} detailAddress 
 * ...etc
 */

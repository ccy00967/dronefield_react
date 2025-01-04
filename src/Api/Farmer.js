// Written by Ccy 
// 각 정확한 url들은 나중에 수정이 필요합니다.

import { server } from "../page/url";
import $ from 'jquery';

// 장고에서 확정된 URL들을 적는다.
// API 이름 규칙 => /farmer/farms == api_farmer_farms
const api_getAccessToken = server + "/user/token/refresh/"
const api_farmer_farm = server + "/customer/lands/";
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
const refreshAccessToken = async (reTryFunc) => {
    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const refreshToken = userInfo?.refresh_token
    try {
        const res = await fetch(api_getAccessToken, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        });
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        // 응답으로 액세스 토큰을 받음 - 장고 API 필요
        const token = await res.json();

        userInfo.access_token = token;

        localStorage.setItem('User_Credential', JSON.stringify(userInfo))

        const data = await reTryFunc();
        return data

    } catch (e) {
        alert("다시 로그인 해주세요!");
        // 로그인 화면으로 리턴시키는 로직 작성
        window.location.href = '/'; // 로그인 페이지로 이동
    }
}

// Component_mapList에서 사용 - 페이지를 처음 들어가면 농지 리스트를 가져옴
/** 
 * 농지 리스트를 가져온다
 * @returns {Promise<LandInfo[]>} 
*/
export const getLandInfo = async () => {
    const accessToken = loadAccessToken();
    try {
        const res = await fetch(api_farmer_farm, {
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
        return data;
    } catch (e) {
        alert("정보를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
        return [];
    }
}
//서버에 삭제 요청
export const deleteLandInfo = async (uuid) => {
    const accessToken = loadAccessToken();
    try {
        const res = await fetch(server + `/customer/landinfo/${uuid}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (res.status == 401) {
            return await refreshAccessToken(deleteLandInfo);
        }
        else if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        return true;
    } catch (e) {
        return false;
    }
}

// export const deleteLandInfo = async (uuid) => {
//     if (!uuid) {
//       alert("유효한 농지 ID(UUID)가 제공되지 않았습니다.");
//       return;
//     }
  
//     if (!window.confirm("삭제하시겠습니까?")) {
//       return;
//     }
  
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
//       const accessToken = userInfo?.access_token;
  
//       if (!accessToken) {
//         alert("로그인이 필요합니다. 다시 로그인해주세요.");
//         window.location.replace("/");
//         return;
//       }
  
//       const res = await fetch(`${server}/customer/landinfo/${uuid}/`, {
//         method: "DELETE",
//         headers: {
//           "Authorization": `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       if (res.ok) {
//         alert("농지 삭제가 완료되었습니다.");
//         window.location.reload();
//       } else if (res.status === 401) {
//         alert("권한이 없습니다. 다시 로그인해주세요.");
//         window.location.replace("/");
//       } else if (res.status === 404) {
//         alert("삭제하려는 농지를 찾을 수 없습니다.");
//       } else {
//         const errorText = await res.text();
//         console.error("Unexpected response:", errorText);
//         alert("농지 삭제 중 문제가 발생했습니다. 다시 시도해주세요.");
//       }
//     } catch (error) {
//       console.error("삭제 요청 중 오류 발생:", error);
//       alert("예기치 못한 오류가 발생했습니다. 다시 시도해주세요.");
//     }
//   };
  


//농지 주소 -> PNU 정보 변환
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

// 주소검색으로 농지 제곱미터 받는 api

export const search_area_api = async (pnu) => {
    const getLndpclAr = "https://api.vworld.kr/ned/data/ladfrlList?key=" + KEY;
    // console.log("pnu1", pnu);
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: getLndpclAr + `&pnu=${pnu}` + "&format=json",
            dataType: "jsonp",
            success: function (respnu) {
                try {
                    const area = respnu.ladfrlVOList.ladfrlVOList[0]?.lndpclAr; // 안전하게 데이터 접근
                    // console.log("pnu2", pnu);
                    // console.log("LndcplAr1", area);
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


// cd값을 받기 위한 엑세스토큰 발급 API
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

// 액세스 토큰과 리프레시 토큰을 갱신하는 함수
export const InsertRefreshAccessToken = async () => {
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
      let res = await fetch(`${server}/farmrequest/send/${uuid}/`, {
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
          res = await fetch(`${server}/farmrequest/send/${uuid}/`, {
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

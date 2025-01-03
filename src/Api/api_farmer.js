// Written by Ccy 
// 각 정확한 url들은 나중에 수정이 필요합니다.

import { server } from "../page/url";

// 장고에서 확정된 URL들을 적는다.
// API 이름 규칙 => /farmer/farms == api_farmer_farms
const api_getAccessToken = server + "/user/token/refresh/"
const api_farmer_farm = server + "/customer/lands/";

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
        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        console.log(data)
        return data;
    } catch (e) {
        alert("삭제하는데 오류가 발생했습니다. 다시 시도해 주세요.");
    }
}


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

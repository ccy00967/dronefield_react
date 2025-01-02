// Written by Ccy 
// 각 정확한 url들은 나중에 수정이 필요합니다.

import { server } from "../page/url";


// 액세스 토큰을 가져오기 - 여기서 입력할지 각 페이지에서 넣을지 
const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
const accessToken = userInfo?.access_token;

// API 이름 규칙 => /farmer/farms == api_farmer_farms
const api_farmer_farm = server + "/customer/lands/";


// Component_mapList에서 사용 - 페이지를 처음 들어가면 농지 리스트를 가져옴
/** 
 * 농지 리스트를 가져온다
 * @returns {Promise<LandInfo[]>} 
*/
export const getLandInfo = async () => {
    try {
        const res = await fetch(api_farmer_farm, {
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
        return data;

    } catch (error) {
        alert("정보를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.");
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

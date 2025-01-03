//lsy
import { server } from "../page/url";

// const uuid = User_Credential?.uuid


//Matching


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


/**

 * 토스api를 사용하는데 필요한 유저정보 가져오기
 */
export const fetchUserInfo = async () => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token
    const uuid = User_Credential?.uuid
    const res = await fetch(server + `/user/userinfo/${uuid}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`
        },
        credentials: 'include',
    })
    const data = await res.json();
    console.log('userinfo', data)
    return data;
};





/**
 *  드론방제사 거래 수락
 * @returns {<[OrderData]>}
 */

export const putfarmrequest = async (checkedList) => {
    try {
        console.log("Checked List:", checkedList);
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        const accessToken = User_Credential?.access_token
        const response = await fetch(`${server}/exterminator/accept/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ orderidlist: checkedList }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);
        return data;
    } catch (error) {
        console.error("Error in putFarmRequest:", error);
        return { error: true, message: error.message };
    }
};



/**
 * sgis 단계별 주소조회 api를 이용한 cd값으로 지역정보 불러오기
 */
export const fetchAddressData = async (code, setData, token) => {
    try {
        const _code = code ? `&cd=${code}` : "";
        const apiUrl = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${token}${_code}`;
        const response = await fetch(apiUrl);
        if (response.status === 200) {
            const data = await response.json();
            const result = data.result.map((item) => addressDepthServerModel(item));
            setData(result);
        } else {
            setData([]);
        }
    } catch (error) {
        setData([]);
    }

};



const addressDepthServerModel = (json) => {
    return {
        code: json.cd,
        name: json.addr_name,
    };
};


/**
 * 행정구역 cd에 따라 거래 리스트 받는다
 * @return {Promise<[OrderInfo]>} 
 */

export const getfarmrequest = async (cdInfo) => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token;
    try {
        const cdInfoURL = cdInfo ? `${cdInfo}/` : "";
        const url = `${server}/exterminator/getrequests/${cdInfoURL}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': "application/json",
                'authorization': `Bearer ${accessToken}`,
            },
        });

        // HTTP 응답 상태 확인
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Response Data:", data);
        return data;
    } catch (error) {
        console.error("Error fetching farm requests:", error);
        return { error: true, message: error.message };
    }
};




//Workstatus


/**
 * 공통 API 함수 작업 현재상황 리스트 상태변환
 */
export const updateExterminateState = async (orderid, exterminateState, confirmMessage, successMessage) => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token
    if (window.confirm(confirmMessage)) {
        alert(successMessage);
        try {
            const res = await fetch(`${server}/exterminator/exterminatestate/${orderid}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ exterminateState }),
            });

            if (res.ok) {
                window.location.reload();
            } else {
                const errorData = await res.json();
                console.error("Error updating state:", errorData);
                alert("상태 업데이트 중 문제가 발생했습니다.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("네트워크 오류로 상태 업데이트를 완료할 수 없습니다.");
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
    
    try {
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        if (!User_Credential || !User_Credential.access_token) {
            throw new Error("Access token is missing. Please log in again.");
        }

        const accessToken = User_Credential.access_token;
        const res = await fetch(`${server}/exterminator/workinglist/3/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            if (res.status === 401) {
                // 인증 실패 처리
                console.error("Unauthorized. Redirecting to login.");
                window.location.href = "/login"; // 로그인 페이지로 리다이렉트
            }
            const errorText = await res.text();
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching work status:", error);
        return { error: true, message: error.message };
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


import { server } from "../page/url";
import { refreshAccessToken } from "./Farmer";

// 예시1 - 유저 정보 가져오기
// try - catch 또는 if문으로 오류를 잡는다
// export const fetchUserInfo = async () => {
//     const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
//     const uuid = User_Credential?.uuid
//     const accessToken = User_Credential?.access_token;
//     const res = await fetch(server + `/user/userinfo/${uuid}/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${accessToken}`
//         },
//         credentials: 'include',
//     })
//     const data = await res.json();

//     return data;
// };


export const logout = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
        const refreshToken = userInfo?.refresh_token;
        console.log(refreshToken)

        if (!refreshToken) {
            console.error("Refresh token is not available.");
            return;
        }

        console.log('refresh', refreshToken)
        const res = await fetch(`${server}/user/logout/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                refresh: refreshToken, // 서버에 전달할 refresh token
            }),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        // 서버 요청 성공 시 처리
        console.log("Logout successful.");
        localStorage.removeItem("User_Credential"); // 로컬 스토리지에서 사용자 정보 제거
        window.location.href = "/"; // 로그인 페이지로 리다이렉션
    } catch (error) {
        console.error("Logout failed:", error);

    }
};


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

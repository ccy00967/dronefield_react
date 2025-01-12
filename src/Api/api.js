import { server } from "../page/url";

// 예시1 - 유저 정보 가져오기
// try - catch 또는 if문으로 오류를 잡는다
export const fetchUserInfo = async () => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const uuid = User_Credential?.uuid
    const accessToken = User_Credential?.access_token;
    const res = await fetch(server + `/user/userinfo/${uuid}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`
        },
        credentials: 'include',
    })
    const data = await res.json();

    return data;
};


export const logout = async () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
        const refreshToken = userInfo?.refresh_token;

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
                refresh_token: refreshToken, // 서버에 전달할 refresh token
            }),
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        // 서버 요청 성공 시 처리
        console.log("Logout successful.");
        localStorage.removeItem("User_Credential"); // 로컬 스토리지에서 사용자 정보 제거
        window.location.href = "/login"; // 로그인 페이지로 리다이렉션
    } catch (error) {
        console.error("Logout failed:", error);
        alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
};

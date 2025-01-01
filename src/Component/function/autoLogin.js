// 리프레시 토큰으로 액세스 토큰을 자동으로 갱신하는 함수
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

    const data = await res.json();
    if (res.ok) {
        // 액세스 토큰과 리프레시 토큰을 로컬스토리지와 상태에 갱신
        userInfo.access_token = data.access;
        localStorage.setItem('User_Credential', JSON.stringify(userInfo));
        setUser_info(userInfo); // 상태 업데이트
        return data.access; // 새로운 액세스 토큰 반환
    } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
        alert('로그인이 만료되었습니다.'); // 경고창 표시
        localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
        window.location.replace('/'); // 첫 페이지로 리다이렉트
        return null;
    }
};

const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
const accessToken = userInfo?.access_token;

const firstResponse = await fetch(server + "/customer/lands/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
});

// 401 에러 발생 시 토큰 갱신 후 재시도
if (firstResponse.status === 401) {
    const newAccessToken = await refreshAccessToken();
    if (newAccessToken) {
        const retryResponse = await fetch(server + "/customer/lands/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newAccessToken}`,
            },
        });

        if (retryResponse.ok) {
            const data = await retryResponse.json();
            console.log(data);
            setDataList(data);  // 받아온 데이터를 상태에 저장
            // 총 면적과 필지 개수를 계산하고 부모 컴포넌트로 전달
            const totalArea = data.reduce((sum, item) => sum + item.lndpclAr, 0);
            setTotalArea(totalArea);
            setLandCount(data.length);
        } else {
            console.error('데이터 로드 실패');
        }
    }
} else if (firstResponse.ok) {
    const data = await firstResponse.json();
    setDataList(data);  // 받아온 데이터를 상태에 저장
    // 총 면적과 필지 개수를 계산하고 부모 컴포넌트로 전달
    const totalArea = data.reduce((sum, item) => sum + parseFloat(item.lndpclAr), 0);
    setTotalArea(totalArea);
    setLandCount(data.length);
} else {
    console.error('데이터 로드 실패');
}

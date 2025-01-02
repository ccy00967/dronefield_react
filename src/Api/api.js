
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
import { server } from "../url";


// 인증이메일 발송
export const sendOTPEmail = async function (id) {
    console.log(id);
    return fetch(server + '/user/validatekey/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ email: id }),
    });
}

export const emailValidateCheck = async function (otp) {
    console.log(otp);
    return fetch(server + '/user/validatekeycheck/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ validatekey: otp }),
    });
}
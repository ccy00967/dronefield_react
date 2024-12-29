import { server } from "../url";


// 인증이메일 발송
export const sendOTPEmail = async function (id) {
    return fetch(server + '/validation/emailsend/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ email: id }),
    });
}

export const emailValidateCheck = async function (otp) {
    return fetch(server + '/validation/validatekeycheck/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify({ validatekey: otp }),
    });
}
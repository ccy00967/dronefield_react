import { server } from "../url";


// 인증이메일 발송
export const sendOTPEmail = async function (id,token_version_id) {
    const bodyData = {
        email: id,
        token_version_id: token_version_id
    }
    console.log(bodyData);
    return fetch(server + '/user/validatekey/', {
        method: 'POST',
        headers: [["Content-Type", 'application/json']],
        credentials: "include",
        body: JSON.stringify(bodyData),
    });
}

export const emailValidateCheck = async function (otp, token_version_id) {
    const bodyData = new URLSearchParams();
    bodyData.append("validate_key", otp);
    bodyData.append("token_version_id", token_version_id);

    console.log(`값: ${otp}, 타입: ${typeof otp}`);
    console.log(bodyData.toString());

    return fetch(server + '/user/validatekeycheck/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: "include",
        body: bodyData.toString(),
    });
};

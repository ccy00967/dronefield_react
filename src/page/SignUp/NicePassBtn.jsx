import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
    GreenColor,
    lightGreenColor,
} from "../../Component/common_style";
import noScroll from "../../Component/function/noScroll";
import { server } from "../url";
import { useDispatch } from "react-redux";
import { nicePassFail, nicePassSuccess } from "../../state/niceSuccessState";


const PASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c4e6d2;
  }
`;

const nice_pass_model = {
    name: "",
    birth: "",
    nationalinfo: "",
    mobileco: "",
    phone_number: "",
}

// 나이스 본인인증 순서
// 백엔드에 필요정보 요청 -> form에 들어갈 3가지: token_version_id, enc_data, integrity
// 받으면 form에 넣어서 nice표준창 호출하기 -> 호출 완료

const NicePassBtn = ({ isOpen, closeModal, setNicepass }) => {

    const dispatch = useDispatch();

    noScroll(isOpen);

    // 표준창을 띄우기
    const fnPopup = async () => {

        const { form_chk } = document;

        //표준창 호출에 필요한 정보를 백엔드에서 가져오기
        const res = await fetch(server + '/validation/callnicepass/', {
            method: 'POST',
            headers: { "Content-Type": "application/json", },
            credentials: "include",
            body: JSON.stringify({
                returnURL: window.location.origin + "/SignUp" + "/nicepass",
            }),
        })
            .then((res) => res.json())
            .then((data) => data)

        window.open('', 'popupChk', 'width=480, height=812, top=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
        document.form_chk.action = "https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb";
        document.form_chk.target = "popupChk";
        form_chk.token_version_id.value = res.token_version_id;
        form_chk.enc_data.value = res.enc_data;
        form_chk.integrity_value.value = res.integrity_value;
        document.form_chk.submit();

        function receiveMessage(event) {
            //if (event.origin !== window.location.href) return;
            console.log(event.data)
            if (event.data === "ok") {
                dispatch(nicePassSuccess())
            }
            if (event.data === "no") {
                dispatch(nicePassFail())
            }
            return;
        }
        window.addEventListener("message", receiveMessage, false);
    }

    return (
        <div>
            <form name="form_chk" method="post">
                <input type="hidden" name="m" value="service" />
                <input type="hidden" name="token_version_id" />
                <input type="hidden" name="enc_data" />
                <input type="hidden" name="integrity_value" />
                <PASSBtn onClick={fnPopup}>나이스 본인인증</PASSBtn>
            </form>
        </div>
    );
};

export default NicePassBtn
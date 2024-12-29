import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BackgroundArea, Icon, RowView2 } from "../../Component/common_style";
import { server } from "../url";




const ModalBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 28rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  margin: auto 0rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;


export function PaymentSuccessPage() {
    const [modalOpen, setModalOpen] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        async function confirm() {
            const requestData = {
                paymentKey: searchParams.get("paymentKey"),
                amount: searchParams.get("amount"),
                orderId: searchParams.get("orderId"),
                orderidlist: [searchParams.get("orderId")],
            };

            console.log("bbbbbbbbbbbbbb")
            console.log(requestData)
            const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
            const accessToken = userInfo.access_token;

            const response = await fetch(server+`/payments/success/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`,
                    // "X-CSRFToken": csrfToken,  // CSRF 토큰 헤더에 추가
                },
                body: JSON.stringify(requestData),
                credentials: "include",
            });

            const json = await response.json();

            console.log({ message: json.message, code: json.code })
            if (!response.ok) {
                console.log({ message: json.message, code: json.code })
                throw { message: json.message, code: json.code };
            }

            return json;
        }

        confirm()
            .then((data) => {
                setResponseData(data);
            })
            .catch((error) => {
                navigate(`/fail?code=${error.code}&message=${error.message}`);
            });

    }, [searchParams]);

    const closeModal = () => {
        setModalOpen(false);
        navigate(-1)
        //navigate("/pestcontrol/apply")
    };
    //useEscapeKey(closeModal);

    return (
        <BackgroundArea style={modalOpen ? {} : { display: "none" }}>
            <ModalBox>
                <RowView2 className="end">
                    <Icon
                        className="pointer"
                        onClick={closeModal}
                        src={require("../../img/icon_close.png")}
                    />
                </RowView2>
                <div className="box_section" style={{ width: "600px" }}>
                    <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
                    <h2>결제를 완료했어요</h2>
                    <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                        <div className="p-grid-col text--left">
                            <b>결제금액</b>
                        </div>
                        <div className="p-grid-col text--right" id="amount">
                            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
                        </div>
                    </div>
                </div>
                <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
                    <b>Response Data :</b>
                    <div id="response" style={{ whiteSpace: "initial" }}>
                        {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
                    </div>
                </div>
            </ModalBox>
        </BackgroundArea>

    );
}
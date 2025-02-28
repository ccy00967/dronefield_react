import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { useEffect, useState } from "react";

// 클라이언트 키
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

// 결제 요청 함수
export async function requestPaymentwidget(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid) {
    const orderId = generateRandomString();
    const userid = JSON.parse(localStorage.getItem('User_Credential'));

    //   const customerKey = generateRandomString(); // 유저 고유 ID (localStorage에서 가져와도 가능)
    const customerKey = userid.user.uuid;

    localStorage.setItem("payorderid", JSON.stringify(payorderid)); // 나중에 URL 형식으로 변경 가능
    console.log("결제 요청:", { selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid });

    return { orderId, customerKey, totalAmount, name, phonenum, email };
}

// 결제 UI 페이지
export function CheckoutPage({ selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid }) {
    const [amount, setAmount] = useState({ currency: "KRW", value: totalAmount });
    const [ready, setReady] = useState(false);
    const [widgets, setWidgets] = useState(null);
    const [orderInfo, setOrderInfo] = useState({}); // 주문 정보 상태 저장

    useEffect(() => {
        async function fetchPaymentWidgets() {
            try {
                const paymentData = await requestPaymentwidget(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid);
                setOrderInfo(paymentData);

                const tossPayments = await loadTossPayments(clientKey);
                const widgetsInstance = tossPayments.widgets({
                    customerKey: paymentData.customerKey,
                });

                setWidgets(widgetsInstance);
            } catch (error) {
                console.error("결제 위젯 로드 실패:", error);
            }
        }

        fetchPaymentWidgets();
    }, [selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid]);

    useEffect(() => {
        async function renderPaymentWidgets() {
            if (!widgets) return;

            await widgets.setAmount(amount);

            // 결제 UI 렌더링
            await widgets.renderPaymentMethods({
                selector: "#payment-method",
                variantKey: "DEFAULT",
            });

            // 이용약관 UI 렌더링
            await widgets.renderAgreement({
                selector: "#agreement",
                variantKey: "AGREEMENT",
            });

            setReady(true);
        }

        renderPaymentWidgets();
    }, [widgets]);

    const updateAmount = async (newAmount) => {
        setAmount(newAmount);
        await widgets.setAmount(newAmount);
    };

    return (
        <div className="wrapper">
            <div className="box_section">
                {/* 결제 UI */}
                <div id="payment-method" />
                {/* 이용약관 UI */}
                <div id="agreement" />
                {/* 쿠폰 체크박스 */}
                <div style={{ paddingLeft: "24px" }}>
                    <label className="checkable typography--p">
                        <input
                            type="checkbox"
                            disabled={!ready}
                            onChange={async (event) => {
                                await updateAmount({
                                    currency: amount.currency,
                                    value: event.target.checked ? amount.value - 5000 : amount.value + 5000,
                                });
                            }}
                        />
                        <span className="checkable__label-text">5,000원 쿠폰 적용</span>
                    </label>
                </div>

                {/* 결제하기 버튼 */}
                <button
                    className="button"
                    style={{ marginTop: "30px" }}
                    disabled={!ready}
                    onClick={async () => {
                        try {
                            await widgets.requestPaymentwidget({
                                orderId: orderInfo.orderId,
                                orderName: "상품 결제",
                                successUrl: window.location.origin + "/success",
                                failUrl: window.location.origin + "/fail",
                                customerEmail: orderInfo.email,
                                customerName: orderInfo.name,
                                customerMobilePhone: orderInfo.phonenum,
                            });
                        } catch (error) {
                            console.error("결제 오류:", error);
                        }
                    }}
                >
                    결제하기
                </button>
            </div>
        </div>
    );
}

// 랜덤 문자열 생성 함수 (orderId, customerKey 용)
function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}

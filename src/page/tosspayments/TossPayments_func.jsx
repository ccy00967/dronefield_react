// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { v4 as uuidv4 } from "uuid";




export async function requestPayment(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid) {
    const orderid = uuidv4()
    const userid = JSON.parse(localStorage.getItem('User_Credential'));
    localStorage.setItem("payorderid", JSON.stringify(payorderid)); //나중에 url형식으로 보내는걸로 바꾸기
    console.log('repayorderid', payorderid); //
    const customerKey = userid.user.uuid;
    console.log('orderid', orderid)
    const clientKey = "test_ck_LlDJaYngro2ZZaqGR00xVezGdRpX";
    try {
        const tossPayments = await loadTossPayments(clientKey);
        // console.log(customerKey,selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid)

        // 회원 결제
        // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
        const payment = tossPayments.payment({
            customerKey,
        });
        // console.log(payment, selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid)
        // 비회원 결제
        // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

        //console.log(window.location.origin)
        const paymentInfo = {
            amount: {
                currency: "KRW",
                value: totalAmount,
            }, //최종 결제 값으로 바꾸기
            orderId: orderid,
            orderName: "방제 서비스",
            successUrl: window.location.origin + "/success",
            failUrl: window.location.origin + "/fail",
            customerEmail: email,
            customerName: name,
            customerMobilePhone: phonenum,
        }

        // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        switch (selectedPaymentMethod) {
            case "CARD":
                console.log(payment, payorderid)
                await payment.requestPayment({
                    method: "CARD", // 카드 및 간편결제
                    ...paymentInfo,
                    card: {
                        useEscrow: false,
                        flowMode: "DEFAULT",
                        useCardPoint: false,
                        useAppCardOnly: false,
                    },
                });
                break;

            // 다른 결제 수단도 추가 가능 (e.g., TRANSFER, EASY_PAY 등)
            default:
                throw new Error("지원되지 않는 결제 방식입니다.");
        }
    } catch (error) {
        console.error("Error fetching payment:", error);

        // 결제 취소 처리
        if (error.code === "USER_CANCEL") {
            console.log("결제가 취소되었습니다.");
            return { status: "CANCEL", message: "결제가 취소되었습니다." };
        }

        // 기타 에러 처리
        return { status: "FAIL", message: error.message || "결제 요청 중 오류가 발생했습니다." };
    }

    // 결제 성공 처리
    return { status: "SUCCESS", message: "결제가 완료되었습니다." };
}
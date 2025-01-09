// ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
// @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";

export async function requestPayment(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid) {
    const userid = JSON.parse(localStorage.getItem('User_Credential'));
    const customerKey = userid.user.uuid;
    console.log('totalAmount',totalAmount)
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
            orderId: payorderid,
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
                console.log(payment, paymentInfo)
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
        }
    } catch (error) {
        console.error("Error fetching payment:", error);
    }
}

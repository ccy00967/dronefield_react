import { server } from "../url";


/**
 * tossOrderId로 결제를 취소하는 API 요청
 * @param {string} tossOrderId - 토스 주문 ID
 * @param {string} cancelReason - 환불 사유
 * @param {Array<string>} orderidlist - 환불 대상 주문 ID 목록
 */
export const cancelPayment = async ( cancelReason, orderid) => {
    const User_Credential = JSON.parse(localStorage.getItem("User_Credential"));
    const accessToken = User_Credential.access_token;
    // const orderid = "b779cabd-d591-4510-b445-7f8ed1c3439e"
    console.log(cancelReason,orderid);
    try {
      const response = await fetch(`${server}/payments/cancel/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // 인증 토큰
        },
        body: JSON.stringify({
          cancelReason,
          orderid,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to cancel payment: ${response.statusText}`);
      }
      const data = await response.json();
      return data; // 응답 데이터 반환
    } catch (error) {
      console.error("Error canceling payment:", error);
      throw error; // 에러를 호출한 곳으로 전달
    }
  };
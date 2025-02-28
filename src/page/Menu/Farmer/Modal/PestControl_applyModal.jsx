import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
  BackgroundArea,
  CenterView,
  GreenColor,
  hoverGreen,
  Icon,
  redColor,
  RowView,
  RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";
import { loadTossPayments, ANONYMOUS } from "@tosspayments/tosspayments-sdk";
import { requestPayment } from "../../../tosspayments/TossPayments_func";
import { ModalBox, Hr ,DataRow, TextSemiBold, TextMedium, Btn} from "../css/PestControl_applyModalCss";
import { CheckoutPage } from "../../../tosspayments/TossPayments_widget";

const PestControl_applyModal = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});

  useImperativeHandle(ref, () => ({
    visible: (data) => {
      data ? setData(data) : setData({});
      console.log('data',data);
      setModalOpen(true);
    },
  }));
  // 모달 open시 스크롤방지
  noScroll(modalOpen);

  const name = data.owner?.name || "이름 없음";
  const phonenum = data.owner?.mobileno || "번호 없음";
  const amount = data?.requestAmount || 0;
  const email = data.owner?.email || "이메일 없음";
  const payorderid = data?.orderId || "주문번호 없음";
  const [serviceAmount, setServiceAmount] = useState(10000);
  const [payment, setPayment] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD");
  const totalAmount = amount + serviceAmount;


  // 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  useEscapeKey(closeModal);

  return (
    <BackgroundArea style={modalOpen ? {} : { display: "none" }}>
      <ModalBox>
        <RowView2 className="end">
          <Icon
            className="pointer"
            onClick={closeModal}
            src={require("../../../../img/icon_close.png")}
          />
        </RowView2>

        <CenterView>
          <TextSemiBold className="title" $fontsize={22}>
            신청정보
          </TextSemiBold>
        </CenterView>

        <DataRow>
          <TextMedium>이ㅤㅤ름</TextMedium>
          <div className="gray">{name}</div>
        </DataRow>
        <DataRow>
          <TextMedium>전화번호</TextMedium>
          <div className="gray">{phonenum}</div>
        </DataRow>

        <Hr />

        <DataRow>
          <TextMedium>거래방식</TextMedium>
          <div className="gray">{data.dealmothod === 0 ? "일반거래" : data.dealmothod === 1 ? "개인거래" : ""}</div>
        </DataRow>
        <DataRow>
          <TextMedium>농ㅤㅤ지</TextMedium>
          <div className="gray">{data.landInfo?.jibun|| "(선택안함)"}</div>
        </DataRow>
        <DataRow>
          <TextMedium className="letter">평단가</TextMedium>
          <div className="gray">{/*price*/data?.setAveragePrice || 30 + "원" || "-"}</div>
        </DataRow>
        <DataRow>
          <TextMedium className="letter">마감일</TextMedium>
          <div className="gray">{data?.endDate || "-"}</div>
        </DataRow>
        <DataRow>
          <TextMedium>사용농약</TextMedium>
          <RowView2 className="wrap top" style={{ flex: 1 }}>
            <div className="gray_w">{data?.pesticide || "-"}</div>
            <div className="bold">농약을 준비해주세요!</div>
          </RowView2>
        </DataRow>

        <Hr />

        <DataRow>
          <TextMedium>방제금액</TextMedium>
          <div className="gray">{amount.toLocaleString("ko-KR")}원</div>
        </DataRow>
        <DataRow>
          <TextMedium className="auto">서비스 이용금액</TextMedium>
          <div className="gray">{serviceAmount.toLocaleString("ko-KR")}원</div>
        </DataRow>

        <Hr className="black" />

        <RowView>
          <TextSemiBold $fontsize={20}>최종결제금액</TextSemiBold>
          <TextMedium className="auto" $fontsize={20} $color={true}>
            {(totalAmount).toLocaleString("ko-KR")}원
          </TextMedium>
        </RowView>

        <Btn onClick={() => requestPayment(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid)}>결제하기</Btn> 
        {/* <CheckoutPage
            selectedPaymentMethod={selectedPaymentMethod}
            totalAmount={totalAmount}
            name={name}
            phonenum={phonenum}
            email={email}
            payorderid={payorderid}
          /> */}
        {/* <Btn onClick={() => console.log(selectedPaymentMethod, totalAmount, name, phonenum, email, payorderid)}>콘솔솔</Btn> */}
      </ModalBox>
    </BackgroundArea>
  );
});

export default PestControl_applyModal;

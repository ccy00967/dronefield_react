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
const Hr = styled.div`
  width: 100%;
  height: 1px;
  margin: 1.2rem 0rem;
  background-color: #f0f0f0;
  &.black {
    background-color: #1d1d1d;
  }
`;
const DataRow = styled(RowView2)`
  align-items: flex-start;
  margin-top: 0.7rem;
  div {
    width: 4rem;
  }
  div.letter {
    letter-spacing: 7px;
  }
  div.gray {
    flex: 1;
    margin-left: 1rem;
    color: #555555;
  }
  div.gray_w {
    width: auto;
    margin-left: 1rem;
    color: #555555;
  }
  div.bold {
    width: auto;
    margin-left: 1rem;
    color: #555555;
    font-family: var(--font-Pretendard-Bold);
  }
`;
const TextSemiBold = styled.div`
  &.title {
    margin-bottom: 2rem;
  }
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-SemiBold);
`;
const TextMedium = styled.div`
  color: ${(props) => (props.$color ? redColor : "#1d1d1d")};
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-Medium);
  width: 4rem;
  &.auto {
    width: auto;
  }
`;
const Btn = styled.div`
  padding: 1rem 0rem;
  margin: 2rem 0 1rem 0;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;

const PestControl_applyModal = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});

  useImperativeHandle(ref, () => ({
    visible: (data) => {
      data ? setData(data) : setData({});
      setModalOpen(true);
    },
  }));
  // 모달 open시 스크롤방지
  noScroll(modalOpen);

  const name = data.owner?.name || "이름 없음";
  const phonenum = data.owner?.mobileno || "번호 없음";
  const amount = data?.requestAmount || 0;
  const email = data.owner?.email || "이메일 없음";
  const payorderid = data?.orderid || "주문번호 없음";
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
          <div className="gray">{data.landInfo?.address.jibunAddress || "(선택안함)"}</div>
        </DataRow>
        <DataRow>
          <TextMedium className="letter">평단가</TextMedium>
          <div className="gray">{/*price*/data?.setAmount || 30 + "원" || "-"}</div>
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
      </ModalBox>
    </BackgroundArea>
  );
});

export default PestControl_applyModal;

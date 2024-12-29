import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
  BackgroundArea,
  CenterView,
  blueColor,
  Icon,
  redColor,
  RowView,
  RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";

const ConBox = styled(CenterView)`
  width: 100%;
  max-width: 32rem;
  margin: auto 0rem;
  div.btn {
    padding: 3rem 0.4rem;
    font-size: 14px;
    color: #555555;
    background-color: #f0f0f0;
    border-radius: 4px;
    cursor: pointer;
  }
`;
const ModalBox = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  margin: 0rem 1rem;
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
`;
const TextSemiBold = styled.div`
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-SemiBold);
`;
const TextMedium = styled.div`
  width: 4rem;
  &.auto {
    width: auto;
  }
  color: ${(props) => (props.$color ? redColor : "#1d1d1d")};
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-Medium);
`;

const WorkStatus_Modal = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});

  useImperativeHandle(ref, () => ({
    visible: (data) => {
      data ? setData(data) : setData({});
      setModalOpen(true);
    },
  }));
  // 모달 open시 스크롤방지F
  noScroll(modalOpen);

  const name = data.owner?.name || "이름 없음"
  const phonenum = data.owner?.phone_number || "번호 없음";
  // -
  const transaction = data.dealmothod === 0 ? "일반거래" : "개인거래";
  const farmland = data.landInfo?.address.jibunAddress || "농지 없음";
  const date =data.endDate
  // const [date, setDate] = useState("8/19");
  const [price, setPrice] = useState("30원");
  const pesticidesUsed = data.pesticide || "농약 없음";
  // -
  const [amount, setAmount] = useState(360000);
  const [serviceAmount, setServiceAmount] = useState(1000);
  // -
 

  // 닫기
  const closeModal = () => {
    setModalOpen(false);
  };
  useEscapeKey(closeModal);

  return (
    <BackgroundArea style={modalOpen ? {} : { display: "none" }}>
      <ConBox>
        {/* <div className="btn">◀︎</div> */}

        <ModalBox>
          <RowView2 className="end">
            <Icon
              className="pointer"
              onClick={closeModal}
              src={require("../../../../img/icon_close.png")}
            />
          </RowView2>

          <CenterView style={{ marginBottom: "2rem" }}>
            <TextSemiBold className="title" $fontsize={22}>
              신청정보
            </TextSemiBold>
            {/* <span style={{ color: "gray" }}>(4/10)</span> */}
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
            <div className="gray">{transaction}</div>
          </DataRow>
          <DataRow>
            <TextMedium>농ㅤㅤ지</TextMedium>
            <div className="gray">{farmland}</div>
          </DataRow>
          <DataRow>
            <TextMedium className="letter">평단가</TextMedium>
            <div className="gray">{price}</div>
          </DataRow>
          <DataRow>
            <TextMedium className="letter">마감일</TextMedium>
            <div className="gray">{date}</div>
          </DataRow>
          <DataRow>
            <TextMedium>사용농약</TextMedium>
            <div className="gray">{pesticidesUsed}</div>
          </DataRow>

          <Hr />

          <DataRow>
            <TextMedium>방제대금</TextMedium>
            <div className="gray">{amount.toLocaleString("ko-KR")}원</div>
          </DataRow>
          <DataRow>
            <TextMedium className="auto">서비스 이용금액</TextMedium>
            <div className="gray">
              {serviceAmount.toLocaleString("ko-KR")}원
            </div>
          </DataRow>

          {/* <Hr /> */}

          {/* <DataRow>
            <TextMedium>농업인</TextMedium>
            <div className="gray">{company}</div>
          </DataRow>
          <DataRow>
            <TextMedium>전화번호</TextMedium>
            <div className="gray">{company_tel}</div>
          </DataRow> */}

          <Hr className="black" />

          <RowView style={{ marginBottom: "1rem" }}>
            <TextSemiBold $fontsize={20}>최종결제금액</TextSemiBold>
            <TextMedium className="auto" $fontsize={20} $color={true}>
              {(serviceAmount).toLocaleString("ko-KR")}원
            </TextMedium>
          </RowView>
          <RowView style={{ marginBottom: "1rem" }}>
            <TextSemiBold $fontsize={20}>
              총 <span style={{ color: blueColor }}>{1}</span>건 서비스 이용금액
            </TextSemiBold>
            <TextMedium className="auto" $fontsize={20} $color={true}>
              {(amount + serviceAmount).toLocaleString("ko-KR")}원
            </TextMedium>
          </RowView>
        </ModalBox>

        {/* <div className="btn">▶︎</div> */}
      </ConBox>
    </BackgroundArea>
  );
});

export default WorkStatus_Modal;

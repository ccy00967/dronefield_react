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

  const [name, setName] = useState("홍길동");
  const [phonenum, setPhoneNum] = useState("101-1010-1010");
  // -
  const [transaction, setTransaction] = useState("일반거래");
  const [farmland, setFarmland] = useState("김가네벼");
  const [date, setDate] = useState("8/19");
  const [price, setPrice] = useState("직접입력");
  const [pesticidesUsed, setPesticidesUsed] = useState("튼튼농약");
  // -
  const [amount, setAmount] = useState(360000);
  const [serviceAmount, setServiceAmount] = useState(10000);
  // -
  const [company, setCompany] = useState("홍길동 방제");
  const [company_tel, setCompany_tel] = useState("010-1010-1010");

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

        <CenterView style={{ marginBottom: "2rem" }}>
          <TextSemiBold className="title" $fontsize={22}>
            신청정보
          </TextSemiBold>
          <span style={{ color: "gray" }}>(4/10)</span>
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
          <TextMedium>농업인</TextMedium>
          <div className="gray">{company}</div>
        </DataRow>
        <DataRow>
          <TextMedium>전화번호</TextMedium>
          <div className="gray">{company_tel}</div>
        </DataRow>

        <Hr />

        <DataRow>
          <TextMedium className="auto">드론조종사</TextMedium>
          <div className="gray">{company}</div>
        </DataRow>
        <DataRow>
          <TextMedium>전화번호</TextMedium>
          <div className="gray">{company_tel}</div>
        </DataRow>

        <Hr className="black" />

        <RowView style={{ marginBottom: "1rem" }}>
          <TextSemiBold $fontsize={20}>받으실 돈(농약)</TextSemiBold>
          <TextMedium className="auto" $fontsize={20} $color={true}>
            {(amount + serviceAmount).toLocaleString("ko-KR")}원
          </TextMedium>
        </RowView>
      </ModalBox>
    </BackgroundArea>
  );
});

export default WorkStatus_Modal;

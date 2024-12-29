import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
  BackgroundArea,
  CenterView,
  GreenColor,
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
  padding: 1rem 1.5rem 2rem 1.5rem;
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

const FarmlandAnalyze_useListModal = forwardRef((props, ref) => {
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
          <TextMedium>농ㅤㅤ지</TextMedium>
          <div className="gray">{data.addr || "(선택안함)"} </div>
        </DataRow>
        <DataRow>
          <TextMedium className="letter">마감일</TextMedium>
          <div className="gray">{data.마감일 || "-"}</div>
        </DataRow>

        <Hr />

        <DataRow>
          <TextMedium className="auto">서비스 이용금액</TextMedium>
          <div className="gray">30,000원</div>
        </DataRow>

        <Hr className="black" />

        <RowView>
          <TextSemiBold $fontsize={20}>최종결제금액</TextSemiBold>
          <TextMedium className="auto" $fontsize={20} $color={true}>
            30,000원
          </TextMedium>
        </RowView>
      </ModalBox>
    </BackgroundArea>
  );
});

export default FarmlandAnalyze_useListModal;

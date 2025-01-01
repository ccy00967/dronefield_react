import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  BackgroundArea,
  CenterView,
  Icon,
  RowView,
  RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";
import { ModalBox,Hr, DataRow, TextSemiBold, TextMedium } from "../css/FarmlandAnalyze_useListModalCss";

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

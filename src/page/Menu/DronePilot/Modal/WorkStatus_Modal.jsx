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
  ConBox,
  ModalBox,
  Hr,
  DataRow,
  TextSemiBold,
  TextMedium,

} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";
import { MapArea } from "../../Farmer/css/FarmerCss";



const WorkStatus_Modal = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  // console.log("123",data.landInfo);
  //.lndpclAr
  useImperativeHandle(ref, () => ({
    visible: (data) => {
      data ? setData(data) : setData({});
      setModalOpen(true);
    },
  }));
  // 모달 open시 스크롤방지F
  noScroll(modalOpen);

  const name = data?.owner_name || "이름 없음"
  const phonenum = data?.owner_mobileno || "번호 없음";
  // -
  const transaction = data.dealmothod === 0 ? "일반거래" : "개인거래";
  const farmland = data?.jibun || "농지 없음";
  const date = data.endDate
  const price = data?.price || "30원";
  // const [date, setDate] = useState("8/19");
  // const [price, setPrice] = useState("30원");
  const pesticidesUsed = data.pesticide || "농약 없음";
  const amount = 30 * Math.round(data?.lndpclAr * 0.3025).toString() || "대금 없음";
  // -
  // const [amount, setAmount] = useState(360000);
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

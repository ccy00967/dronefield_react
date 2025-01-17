import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  Icon,
  RowView,
  RowView2,
} from "../../../Component/common_style";

import {
  InsertBox_Pest_apply,
  InputBox_Pest_apply,
  DateBox_Pest_apply,
  LightBtn_Pest_apply,
  Btn_Pest_apply, StyledDatePicker
} from "./css/FarmerCss";
import Component_mapList from "./Component_mapList";
import PestControl_applyModal from "./Modal/PestControl_applyModal";
import { server } from "../../url";
import { applyPestControl } from "../../../Api/Farmer";

const PestControl_apply = () => {

  const [totalArea, setTotalArea] = useState(0); // 총 면적
  const [landCount, setLandCount] = useState(0); // 필지 개수

  const [transaction, setTransaction] = useState("일반거래");
  const [selectFarmland, setSelectFarmland] = useState("");
  const [price, setPrice] = useState(30);
  const [pesticidesUsed, setPesticidesUsed] = useState("");
  const [startDate, setStartDate] = useState("");
  const [uuid, setUuid] = useState("");
  const [dummy, setDummy] = useState("");
  const [selectlndpclAr, setSelectlndpclAr] = useState(0);
  const [endDate, setEndDate] = useState("");
  const totalPrice = price * selectlndpclAr;

  const setting_General = () => setTransaction("일반거래");
  const setting_personal = () => setTransaction("개인거래");
  const setting_price = (e) => setPrice(e.target.value);
  const setting_pesticides = (e) => setPesticidesUsed(e.target.value);
  const setting_startDate = (date) => setStartDate(date);

  const transactionType = (menu) => {
    if (transaction === menu) {
      return "this";
    }
    return "";
  };


  // 모달 열기
  const applyRef = useRef();
  const openModal = (postData) => {
    applyRef.current.visible(postData);
    console.log("apply", postData);
  };



  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value); // 선택된 날짜
    setStartDate(e.target.value); // 시작일 설정

    // 2주 후 날짜 계산
    const twoWeeksLater = new Date(selectedDate);
    twoWeeksLater.setDate(selectedDate.getDate() + 14); // 14일 추가

    // YYYY-MM-DD 형식으로 endDate 설정
    const formattedEndDate = twoWeeksLater.toISOString().split("T")[0];
    setEndDate(formattedEndDate);
  };
  const apply = () => {
    const postData = {
      dealmothod: transaction === "일반거래" ? 0 : 1,
      setAveragePrice: price,
      startDate: startDate || "2024-10-30",
      endDate: endDate || "2021-11-03",
      pesticide: pesticidesUsed,
    };

    applyPestControl(postData, uuid, openModal); // 토큰 갱신은 applyPestControl 내부에서 처리
  };

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"방제"}
        submenu={"방제신청"}
        setSearchAddr={setDummy}
        setSelectFarmland={(data) => {
          const farmland = `${data.landNickName}(${data.jibun})`;
          setSelectFarmland(farmland); // 선택된 농지 이름
          setUuid(data.uuid);
          setSelectlndpclAr(data.lndpclAr);
        }}
        setTotalArea={setTotalArea} // 총 면적 전달
        setLandCount={setLandCount} // 필지 개수 전달
      >
        <InsertBox_Pest_apply>
          <div className="title">방제신청</div>

          <div className="subtitle">거래 방식</div>
          <RowView2>
            <LightBtn_Pest_apply
              className={transactionType("일반거래")}
              onClick={setting_General}
            >
              일반거래
              {transactionType("일반거래") && (
                <Icon
                  style={{ marginLeft: "5px" }}
                  src={require("../../../img/icon_check.png")}
                />
              )}
            </LightBtn_Pest_apply>
            <LightBtn_Pest_apply
              className={transactionType("개인거래")}
              onClick={setting_personal}
            >
              개인거래
              {transactionType("개인거래") && (
                <Icon
                  style={{ marginLeft: "5px" }}
                  src={require("../../../img/icon_check.png")}
                />
              )}
            </LightBtn_Pest_apply>
          </RowView2>

          <div className="subtitle">농지선택</div>
          <InputBox_Pest_apply
            placeholder="아래 목록에서 농지를 선택해주세요."
            value={selectFarmland}
            readOnly
          />

          <div className="subtitle">평단가</div>
          <InputBox_Pest_apply
            type={"number"}
            placeholder="원하시는 평단가를 입력해주세요.(최소 24원)"
            value={price}
            onChange={setting_price}
          />
          <span>일반거래의 평단가는 30원입니다.</span>

          <div className="subtitle">시작일</div>
          <RowView2>
            <StyledDatePicker
              type="date"
              value={startDate}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value); // 선택된 시작일
                setStartDate(e.target.value); // 시작일 설정

                // 2주 뒤 날짜 계산
                const twoWeeksLater = new Date(selectedDate);
                twoWeeksLater.setDate(selectedDate.getDate() + 14); // 14일 추가

                // YYYY-MM-DD 형식으로 종료일 설정
                const formattedEndDate = twoWeeksLater.toISOString().split("T")[0];
                setEndDate(formattedEndDate); // 종료일 업데이트
              }}
            />
          </RowView2>

          <div className="subtitle">종료일</div>
          <RowView2>
            <StyledDatePicker
              type="date"
              value={endDate}
              readOnly // 종료일은 읽기 전용
              style={{
                backgroundColor: "#f9f9f9", // 읽기 전용 스타일
                color: "#999", // 텍스트 색상 변경
                cursor: "not-allowed", // 마우스 커서 변경
              }}
            />
            <span style={{ marginLeft: "8px", fontSize: "14px", color: "gray" }}>
              (신청일 기준 2주 후 마감입니다)
            </span>
          </RowView2>



          <span>신청일 기준 2주 후 마감입니다.</span>

          <div className="subtitle">사용 농약</div>
          <InputBox_Pest_apply
            placeholder="농약은 미리 준비해주세요."
            value={pesticidesUsed}
            onChange={setting_pesticides}
          />

          <Btn_Pest_apply onClick={apply}>신청하기</Btn_Pest_apply>
        </InsertBox_Pest_apply>
      </Component_mapList>

      <PestControl_applyModal ref={applyRef} />
    </Common_Layout>
  );
};

export default PestControl_apply;

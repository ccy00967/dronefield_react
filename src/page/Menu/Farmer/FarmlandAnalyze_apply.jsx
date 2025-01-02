import { useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  lightGreenColor,
  RowView,
} from "../../../Component/common_style";
import { InsertBox_apply, InputBox, DateBox, Btn } from "./css/FarmerCss";
import Component_mapList from "./Component_mapList";
import FarmlandAnalyze_applyModal from "./Modal/FarmlandAnalyze_applyModal";


const FarmlandAnalyze_apply = () => {
  const [selectFarmland, setSelectFarmland] = useState("");

  // 방제 신청
  const applyRef = useRef();
  const apply = () => {
    applyRef.current.visible({
      농지선택: selectFarmland,
      마감일: "8/30",
    });
  };

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"농지분석"}
        submenu={"농지분석신청"}
        setSelectFarmland={setSelectFarmland}
      >
        <InsertBox_apply>
          <div className="title">농지분석신청</div>

          <div className="subtitle">농지선택</div>
          <InputBox
            placeholder="아래 목록에서 농지를 선택해주세요."
            value={selectFarmland}
            readOnly
          />

          <div className="subtitle">마감일</div>
          <RowView>
            <DateBox>8/30</DateBox>
            <DateBox>9/6</DateBox>
            <DateBox>9/13</DateBox>
          </RowView>
          <span>신청일 기준 익주 금요일이 마감입니다.</span>

          <Btn onClick={apply}>신청하기</Btn>
        </InsertBox_apply>
      </Component_mapList>

      <FarmlandAnalyze_applyModal ref={applyRef} />
    </Common_Layout>
  );
};

export default FarmlandAnalyze_apply;

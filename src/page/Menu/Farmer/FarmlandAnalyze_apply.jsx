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
import Component_mapList from "./Component_mapList";
import FarmlandAnalyze_applyModal from "./Modal/FarmlandAnalyze_applyModal";

const InsertBox = styled.div`
  flex: 1;
  margin-right: 2rem;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subtitle {
    margin-top: 1rem;
    font-family: var(--font-Pretendard-Medium);
  }
  span {
    padding-left: 1rem;
    font-size: 14px;
    color: gray;
  }
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
  }
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
const DateBox = styled.div`
  flex: 1;
  padding: 1rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
`;
const LightBtn = styled(CenterView)`
  box-sizing: border-box;
  width: 100%;
  max-width: 10rem;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  text-align: center;
  color: #8e8e8e;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  &.this {
    font-family: var(--font-Pretendard-SemiBold);
    color: ${GreenColor};
    background-color: ${lightGreenColor};
    border: 1px solid ${lightGreenColor};
  }
`;
const Btn = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover{
    background-color: ${hoverGreen};
  }
`;

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
        <InsertBox>
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
        </InsertBox>
      </Component_mapList>

      <FarmlandAnalyze_applyModal ref={applyRef} />
    </Common_Layout>
  );
};

export default FarmlandAnalyze_apply;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  GreenColor,
  Icon,
  lightBlueColor,
  lightRedColor,
  redColor,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";

const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const FilterBox = styled(RowView)`
  margin: 2rem 0rem;
  div {
    flex: 1;
    padding: 1rem 0rem;
    text-align: center;
    font-size: 20px;
    color: #8e8e8e;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  span {
    color: #d8d8d8;
    margin: 0rem 1rem;
  }
  div.this {
    font-family: var(--font-Pretendard-SemiBold);
    color: white;
    background-color: ${redColor};
  }
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightRedColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
`;
const BtnArea = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1rem;
    border-radius: 4px;
  }
  span.green {
    background-color: ${GreenColor};
    cursor: pointer;
  }
  span.blue {
    background-color: ${blueColor};
    cursor: pointer;
  }
`;

const Adjustment = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [count_미정산, setCount_미정산] = useState(12);
  const [count_정산, setCount_정산] = useState(13);
  const [filter, setFilter] = useState("");
  const setting_reset = () => setFilter("");
  const setting_미정산 = () => setFilter("미정산");
  const setting_정산 = () => setFilter("정산");

  // 필터 선택 판별 className
  const isSelect = (menu) => {
    if (filter === menu) return "this";
    return "";
  };
  // 정산 버튼 state 판별 className
  const isFinalCheck = (state_btn) => {
    if (state_btn === "확인 완료") return "gray";
    return "blue";
  };

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  const testData = Array(parseInt(perPage)).fill("");
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"농약"} submenu={"정산2"} />

        <ContentArea>
          <RowView2 className="title">
            정산
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox>
            <div className={isSelect("미정산")} onClick={setting_미정산}>
              미정산 ({count_미정산})
            </div>
            <span>▶︎</span>
            <div className={isSelect("정산")} onClick={setting_정산}>
              정산({count_정산})
            </div>
          </FilterBox>

          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />

          <TableHeader>
            <div>전달할 농약</div>
            <div>받으실 분(방제사)</div>
            <div>농업인</div>
            <div>농업인 전화번호</div>
            <div>드론조종사</div>
            <div>드론조종사 전화번호</div>
            <div>상태</div>
          </TableHeader>

          {dataList.map((data, idx) => {
            // 테스트용 state
            const testState =
              filter !== "" ? filter : (idx + 1) % 5 === 0 ? "미정산" : "정산";

            return (
              <TableList key={idx} className={(idx + 1) % 2 === 0 ? "x2" : ""}>
                <div>튼튼농약</div>
                <div>홍길동</div>
                <div>홍길동</div>
                <div>010-0101-1010</div>
                <div>홍길동</div>
                <div>010-0101-1010</div>
                <div>{testState}</div>
              </TableList>
            );
          })}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea>
      </RowView>
    </Common_Layout>
  );
};

export default Adjustment;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  GreenColor,
  Icon,
  lightGreenColor,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import FarmlandAnalyze_useListModal from "./Modal/FarmlandAnalyze_useListModal";

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
    background-color: ${GreenColor};
  }
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
  span {
    width: 6rem;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  cursor: pointer;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
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
  span.gray {
    background-color: #8e8e8e;
    cursor: pointer;
  }
  span.blue {
    background-color: ${blueColor};
    cursor: pointer;
  }
`;

const FarmlandAnalyze_useList = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [count_매칭중, setCount_매칭중] = useState(12);
  const [count_작업중, setCount_작업중] = useState(3);
  const [count_작업확인, setCount_작업확인] = useState(13);
  const [filter, setFilter] = useState("");
  const setting_reset = () => setFilter("");
  const setting_매칭중 = () => setFilter("매칭중");
  const setting_작업중 = () => setFilter("작업중");
  const setting_작업확인 = () => setFilter("작업확인");

  // 필터 선택 판별 className
  const isSelect = (menu) => {
    if (filter === menu) return "this";
    return "";
  };
  // 작업확인 버튼 state 판별 className
  const isFinalCheck = (state_btn) => {
    if (state_btn === "확인 완료") return "gray";
    return "blue";
  };

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  const testData = Array(parseInt(perPage)).fill({
    name: "김가네벼",
    addr: "전북특별자치도 김제시 백산읍 공덕 2길",
    state: "작업중", // 매칭중/작업중/작업확인
    state_btn: "최종 확인", //최종 확인 / 확인 완료
  });
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  const refund_API = () => {
    alert("환불되었습니다.");
  };
  const final_check_API = (state_btn) => {
    if (state_btn === "확인 완료") {
      return;
    }
    alert("최종 확인 되었습니다.");
  };

  // 더블클릭시 열리는 모달
  const ModalRef = useRef();
  const openModal = (data) => {
    ModalRef.current.visible(data);
  };

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"농지분석"} submenu={"농지분석 이용목록"} />

        <ContentArea>
          <RowView2 className="title">
            농지분석 이용목록
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox>
            <div className={isSelect("매칭중")} onClick={setting_매칭중}>
              매칭중 ({count_매칭중})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업중")} onClick={setting_작업중}>
              작업중({count_작업중})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업확인")} onClick={setting_작업확인}>
              작업확인({count_작업확인})
            </div>
          </FilterBox>

          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />

          <TableHeader>
            <div>농지별명</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {filter !== "작업중" && <span />}
          </TableHeader>

          {dataList.map((data, idx) => {
            // 테스트용 state
            const testState =
              filter !== ""
                ? filter
                : (idx + 1) % 5 === 0
                ? "매칭중"
                : (idx + 1) % 2 === 0
                ? "작업중"
                : "작업확인";
            const testState_btn =
              idx === 0 || idx === 1 ? "확인 완료" : "최종 확인";

            // 필터가 작업중이 아니라면 버튼 보여줌
            const isBtnShow = filter !== "작업중";

            return (
              <TableList
                key={idx}
                className={(idx + 1) % 2 === 0 ? "x2" : ""}
                onDoubleClick={() => openModal(data)}
              >
                <div>{data.name}</div>
                <div className="addr">{data.addr}</div>
                <div>{testState}</div>

                {isBtnShow && (
                  <BtnArea>
                    {testState === "매칭중" ? (
                      <span className="gray" onClick={refund_API}>
                        환불
                      </span>
                    ) : (
                      testState === "작업확인" && (
                        <span
                          className={isFinalCheck(testState_btn)}
                          onClick={() => final_check_API(testState_btn)}
                        >
                          {testState_btn}
                        </span>
                      )
                    )}
                  </BtnArea>
                )}
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

        <FarmlandAnalyze_useListModal ref={ModalRef} />
      </RowView>
    </Common_Layout>
  );
};

export default FarmlandAnalyze_useList;

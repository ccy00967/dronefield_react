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
import { ContentArea_Farm_useList,FilterBox, TableHeader_Farm_useList, TableList_Farm_useList, BtnArea } from "./css/FarmerCss";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import FarmlandAnalyze_useListModal from "./Modal/FarmlandAnalyze_useListModal";


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

        <ContentArea_Farm_useList>
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

          <TableHeader_Farm_useList>
            <div>농지별명</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {filter !== "작업중" && <span />}
          </TableHeader_Farm_useList>

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
              <TableList_Farm_useList
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
              </TableList_Farm_useList>
            );
          })}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea_Farm_useList>
      </RowView>
    </Common_Layout>
  );
};

export default FarmlandAnalyze_useList;

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  Icon,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import { ContentArea_Pest_useList,
  FilterBox_Pest_useList,
  TableHeader_Pest_useList,
  TableList_Pest_useList,
  BtnArea_Pest_useList
 } from "./css/FarmerCss";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import PestControl_useListModal from "./Modal/PestControl_useListModal";
import { server } from "../../url";
import { load_API } from "../../../Api/Farmer";


const PestControl_useList = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [count_매칭중, setCount_매칭중] = useState(12);
  // const [count_작업대기중, setCount_작업대기중] = useState(3);
  // const [count_작업중, setCount_작업중] = useState(3);
  // const [count_작업확인, setCount_작업확인] = useState(13);
  const [filter, setFilter] = useState("");
  const setting_reset = () => setFilter("");
  // const setting_매칭중 = () => setFilter("매칭중");
  // const setting_작업대기중 = () => setFilter("작업대기중");
  // const setting_작업중 = () => setFilter("작업중");
  // const setting_작업확인 = () => setFilter("작업확인");

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

  useEffect(() => {
    load_API(setDataList, setCnt);
    // load_API();
  }, [currentPage, perPage]);

  //필터 로직
// 필터링된 데이터 반환 및 카운트 계산 로직
const processData = (filterType) => {
  if (!dataList || dataList.length === 0) {
    return { filteredData: [], count: 0 }; // 데이터가 없을 경우 빈 배열과 0 반환
  }

  if ([0, 1, 2, 3].includes(filterType)) {
    const filteredData = dataList.filter((item) => item.exterminateState === filterType);
    return { filteredData, count: filteredData.length };
  }

  // 유효하지 않은 filterType일 경우 전체 데이터 반환
  return { filteredData: dataList, count: dataList.length };
};

// 필터 로직
const filterData = () => {
  return processData(filter).filteredData; // 선택된 필터에 해당하는 데이터 반환
};

// 카운트 로직
const getcountlength = (filterType) => {
  return processData(filterType).count; // 선택된 필터에 해당하는 데이터 개수 반환
};



  const refund_API = () => {
    alert("환불되었습니다.");
  };
  const final_check_API = (state_btn) => {
    if (state_btn === "확인 완료") {
      return;
    }
    alert("최종 확인 되었습니다.");
  };

  // 클릭시 열리는 모달
  const ModalRef = useRef();
  const openModal = (data) => {
    ModalRef.current.visible(data);
    console.log(data);
  };

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제"} submenu={"방제이용목록"} />

        <ContentArea_Pest_useList>
          <RowView2 className="title">
            방제이용목록
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox_Pest_useList>
            <div className={isSelect(0)} onClick={() => setFilter(0)}>
              매칭중 ({getcountlength(0)})
            </div>
            <span>▶︎</span>
            <div
              className={isSelect(1)} onClick={() => setFilter(1)}>
              작업대기중({getcountlength(1)})
            </div>
            <span>▶︎</span>
            <div className={isSelect(2)} onClick={() => setFilter(2)}>
              작업중({getcountlength(2)})
            </div>
            <span>▶︎</span>
            <div className={isSelect(3)} onClick={() => setFilter(3)}>
              작업확인({getcountlength(3)})
            </div>
          </FilterBox_Pest_useList>

          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />

          <TableHeader_Pest_useList>
            <div>농지별명</div>
            <div>
              <select>
                <option value={""}>신청일자</option>
                <option value={"오름차순"}>오름차순</option>
                <option value={"내림차순"}>내림차순</option>
              </select>
            </div>
            <div>방제업체</div>
            <div>업체전화번호</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {/* {filter !== "작업대기중" && filter !== "작업중" && <span />} */}
          </TableHeader_Pest_useList>

          {filterData().map((data, idx) => {
            // 테스트용 state
            // const testState =
            //   filter !== ""
            //     ? filter
            //     : (idx + 1) % 3 === 0
            //       ? "매칭중"
            //       : (idx + 1) % 2 === 0
            //         ? "작업대기중"
            //         : "작업확인";
            // const testState_btn =
            //   idx === 0 || idx === 1 ? "확인 완료" : "최종 확인";

            // 필터가 작업대기중도, 작업중도 아니라면 버튼 보여줌
            // const isBtnShow = filter !== "작업대기중" && filter !== "작업중";

            return (
              <TableList_Pest_useList
                key={idx}
                className={(idx + 1) % 2 === 0 ? "x2" : ""}
                onClick={() => openModal(data)}
              >
                <div>{data.landInfo.landNickName}</div>
                <div>{data.landInfo.lastUpdtDt}</div>
                <div>{data.exterminatorinfo != null ? data.exterminatorinfo.name : ""}</div>
                <div>{data.exterminatorinfo != null ? data.exterminatorinfo.phone_number : ""}</div>
                <div className="addr">{data.landInfo.address.jibunAddress}</div>
                <div>{data.exterminateSate}</div>


                <BtnArea_Pest_useList>
                  {data.exterminateSate === 0 ? (
                    <span className="yellow">
                      매칭 중
                    </span>
                  ) : (
                    data.exterminateSate === 1 ? (
                      <span className="green" >
                        작업 대기
                      </span>
                    ) : (
                      data.exterminateSate === 2 ? (
                        <span className="blue" >
                          작업 중
                        </span>
                      ) : (
                        data.exterminateSate === 3 && (
                          <span className="gray">
                            작업 완료
                          </span>
                        )
                      )
                    ))}
                </BtnArea_Pest_useList>

              </TableList_Pest_useList>
            );
          })}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea_Pest_useList>

        <PestControl_useListModal ref={ModalRef} />
      </RowView>
    </Common_Layout>
  );
};

export default PestControl_useList;

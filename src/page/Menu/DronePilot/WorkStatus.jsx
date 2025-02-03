import { useEffect, useRef, useState } from "react";
import Common_Layout from "../../../Component/common_Layout";
import {
  Icon,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import WorkStatus_Modal from "./Modal/WorkStatus_Modal";
import { server } from "../../url";
import { ContentArea, FilterBox, TableHeader, TableList, BtnArea } from "./css/WorkStatusCss";
import { workStart_API, workFin_API, cancel1_API, cancel2_API } from "../../../Api/DronePilot";
import { refreshAccessToken } from "../../../Api/Farmer";

const WorkStatus = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [filter, setFilter] = useState([]);
  const [preparing_count, setPreparing_count] = useState('')
  const [exterminating_count, setExterminating_count] = useState('')
  const [done_count, setDone_count] = useState('')

  const setting_reset = () => setFilter("");

  const [dataList, setDataList] = useState([]);

  const handleFilterClick = async (state) => {
    await getWorkStatus(state); // 서버에서 상태별 데이터 요청
    setFilter(state); // 현재 선택된 필터 상태 업데이트
  };




  const getWorkStatus = async (exterminateState = null) => {
    const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
    if (!userInfo || !userInfo.access_token) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    let accessToken = userInfo.access_token;

    // 요청 처리 함수
    const fetchRequest = async () => {
      // 쿼리 파라미터 추가
      const endpoint = exterminateState !== null
        ? `${server}/trade/work-list/?exterminateState=${exterminateState}`
        : `${server}/trade/work-list/`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setDataList(data.data); // 데이터를 상태로 설정
      console.log(`Work Status (${exterminateState || "전체"})`, data);
      return data.data;
    };

    try {
      return await fetchRequest(); // 첫 요청 시도
    } catch (error) {
      if (error.message.includes("401")) {
        // Access Token 만료 처리
        console.warn("Access token expired. Attempting to refresh token...");
        return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
      }

      console.error("Error fetching work status:", error);
      return { error: true, message: error.message }; // 기타 에러 반환
    }
  };



  const getcount = async () => {
    const userInfo = JSON.parse(localStorage.getItem("User_Credential"));
    if (!userInfo || !userInfo.access_token) {
      alert("로그인이 필요합니다. 다시 로그인해주세요.");
      return;
    }

    let accessToken = userInfo.access_token;

    // 요청 처리 함수
    const fetchRequest = async () => {
      const res = await fetch(server + "/trade/counts/?type=3", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setPreparing_count(data.preparing_count); // 준비 중 상태 수
      setExterminating_count(data.exterminating_count); // 진행 중 상태 수
      setDone_count(data.done_count); // 완료 상태 수
      console.log("getcounts", data);
      return data;
    };

    try {
      return await fetchRequest(); // 첫 요청 시도
    } catch (error) {
      if (error.message.includes("401")) {
        // Access Token 만료 처리
        console.warn("Access token expired. Attempting to refresh token...");
        return await refreshAccessToken(fetchRequest); // 토큰 갱신 후 재시도
      }

      console.error("Error fetching counts:", error);
      return { error: true, message: error.message }; // 기타 에러 반환
    }
  };


  useEffect(() => {
    getWorkStatus()
    getcount()
  }, []);




  //필터 함수


  // 필터 선택 판별 className
  const isSelect = (menu) => {
    if (filter === menu) return "this";
    return "";
  };
  // 작업완료 버튼 state 판별 className
  const isFinalCheck = (state_btn) => {
    if (state_btn === "확인 완료") return "gray";
    return "blue";
  };




  const filterData = () => {
    if (!dataList || dataList.length === 0) {
      return [];  // data가 undefined 또는 빈 배열일 때 빈 배열 반환
    }

    if (filter === 1) {
      return dataList.filter(item => item.exterminateState === 1);
    } else if (filter === 2) {
      return dataList.filter(item => item.exterminateState === 2);
    }
    else if (filter === 3) {
      return dataList.filter(item => item.exterminateState === 3);
    }
    else {
      return dataList;
    }
  };





  const load_API = () => {
    // 호출 성공시
    setCnt(dataList.length);
    //setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);






  // 더블클릭시 열리는 모달
  const ModalRef = useRef();
  const openModal = (data) => {
    ModalRef.current.visible(data);
  };

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제/농지분석"} submenu={"작업현재상황"} />

        <ContentArea>
          <RowView2 className="title">
            작업현재상황
            <Icon
              onClick={setting_reset}
              src={require("../../../img/icon_reset.png")}
            />
          </RowView2>

          <FilterBox>
            <div className={isSelect(1)} onClick={() => handleFilterClick(1)}>
              작업 준비 중({preparing_count})
            </div>
            <span>▶︎</span>
            <div className={isSelect(2)} onClick={() => handleFilterClick(2)}>
              작업 시작({exterminating_count})
            </div>
            <span>▶︎</span>
            <div className={isSelect(3)} onClick={() => handleFilterClick(3)}>
              작업 완료({done_count})
            </div>
          </FilterBox>


          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />

          <TableHeader>
            <div>농지별명</div>
            <div>
              <select>
                <option value={""}>수락일자</option>
                <option value={"오름차순"}>오름차순</option>
                <option value={"내림차순"}>내림차순</option>
              </select>
            </div>
            <div>농업인</div>
            <div>농업인 전화번호</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            {filter !== "작업완료" && <span />}
          </TableHeader>

          {filterData().map((data, idx) => {
            //'매칭중'인 데이터는 cut
            if (data.exterminateState !== 0) {

              return (
                <TableList
                  key={idx}
                  className={(idx + 1) % 2 === 0 ? "x2" : ""}
                  onDoubleClick={() => openModal(data)}
                >
                  <div>{data.landNickName}</div>
                  <div>{data.startDate}</div>
                  <div>{data.owner_name}</div>
                  <div>{data.owner_mobileno}</div>
                  <div className="addr">{data.jibun}</div>
                  <div>{data.exterminateState === 1 ? ("작업 준비 중") : (data.exterminateState === 2 ? ("작업 중") : data.exterminateState === 3 && ("작업완료"))}</div>


                  <BtnArea>

                    {data.exterminateState === 1 ? (
                      <span className="green" onClick={() => workStart_API(data.orderId)}>
                        시작
                      </span>
                    ) : (
                      data.exterminateState === 2 ? (
                        <RowView2>
                          <span className="blue" onClick={() => workFin_API(data.orderId)}>
                            완료
                          </span>
                          <span className="yellow" onClick={() => cancel1_API(data.orderId)}>
                            취소
                          </span>
                        </RowView2>

                      ) : (
                        data.exterminateState === 3 && (
                          <RowView>
                            {/* <span className="gray">
                              완료
                            </span> */}
                            <span className="yellow" onClick={() => cancel2_API(data.orderId)}>취소</span>
                          </RowView>
                        )
                      )
                    )}
                  </BtnArea>

                </TableList>
              );
              //}
            }
          })}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea>

        <WorkStatus_Modal ref={ModalRef} />
      </RowView>
    </Common_Layout>
  );
};

export default WorkStatus;

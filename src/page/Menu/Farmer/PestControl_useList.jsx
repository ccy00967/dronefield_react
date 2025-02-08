import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CheckBox,
  Icon,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import {
  ContentArea_Pest_useList,
  FilterBox_Pest_useList,
  TableHeader_Pest_useList,
  TableList_Pest_useList,
  BtnArea_Pest_useList,
  Btn
} from "./css/FarmerCss";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import CheckButton from "../../../Component/UI/CheckButton";
import PestControl_useListModal from "./Modal/PestControl_useListModal";
import { server } from "../../url";
import { getLandcounts, load_API,getTradeDetail } from "../../../Api/Farmer";
import HeaderCheckBox from "../../../Component/UI/HeaderCheckBox";
import { fetchUserInfo } from "../../../Api/api";
import { requestPayment } from "../../tosspayments/TossPayments_func";
import { cancelPayment } from "../../tosspayments/cancelPayment";


const PestControl_useList = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 갯수 (디폴트:10)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지


  // back에서 카운트 되서 넘어옴옴
  const [done_count, setDone_count] = useState(''); // 작업 확인
  const [exterminating_count, setExterminating_count] = useState(''); // 작업중
  const [matching_count, setMatching_count] = useState('') // 매칭중
  const [perparing_count, setPreparing_count] = useState(''); // 작업대기중
  const [before_pay_count, setBefore_pay_count] = useState(''); // 결제 대기기
  const [requestDepositState, setrequestDepositState] = useState(1); //requestDepositState값 변경하여 load_API실행
  const [exterminateState, setExterminateState] = useState(0); // exterminateState값 변경하여 load_API실행
  const [filter, setFilter] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [checkedOrderIds, setCheckedOrderIds] = useState([]);
  const [userdata, setUserData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD");

  const handleRefundRequest = async (orderId) => {
    try {
      // 1. orderId로 tossOrderId 가져오기
      // const tossOrderId = await getTradeDetail(orderId);

      if (!orderId) {
        console.error("OrderId가 없습니다.");
        return;
      }

      // 2. tossOrderId로 결제 취소 요청
      const cancelReason = "사용자 요청에 의한 환불";
      // const orderidlist = orderId;
      await cancelPayment(cancelReason, orderId);

      // 성공 메시지
      alert("환불이 성공적으로 처리되었습니다.");
      await load_API(setDataList, setCnt, currentPage, perPage, requestDepositState, exterminateState);
    } catch (error) {
      console.error("환불 요청 중 오류 발생:", error);
      alert("환불 요청 중 오류가 발생했습니다.");
    }
  };




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

  useEffect(() => {
    load_API(setDataList, setCnt, currentPage, perPage, requestDepositState, exterminateState);
    getLandcounts(setDone_count, setExterminating_count, setMatching_count, setPreparing_count, setBefore_pay_count);

    // load_API();
  }, [currentPage, perPage, requestDepositState, exterminateState]);

  //필터 로직
  // 필터링된 데이터 반환 및 카운트 계산 로직
  const processData = (filterType) => {
    if (!dataList || dataList.length === 0) {
      return { filteredData: [], count: 0 }; // 데이터가 없을 경우 빈 배열과 0 반환
    }

    // 기본 상태: 모든 데이터를 반환
    if (filterType === null || filterType === undefined || filterType === -1) {
      return { filteredData: dataList, count: dataList.length };
    }

    // 특정 필터 처리
    const filteredData = dataList.filter((item) => {
      if (filterType === 4) {
        // 결제 대기 상태 필터
        return item.requestDepositState === 0; // 결제 대기중
      }

      // 나머지 필터 (매칭중, 작업대기중 등)
      return (
        item.exterminateState === filterType &&
        item.requestDepositState !== 0 // 결제 대기중 제외
      );
    });

    return { filteredData, count: filteredData.length };
  };
  // 필터 로직
  const filterData = () => {
    return processData(filter).filteredData; // 선택된 필터에 해당하는 데이터 반환
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
            {/* <Icon
              onClick={() => { setFilter(-1); setrequestDepositState(''); setExterminateState('') }}
              src={require("../../../img/icon_reset.png")}
            /> */}
          </RowView2>

          <FilterBox_Pest_useList>
            {/* <div className={isSelect(4)} onClick={() => { setFilter(4); setrequestDepositState(0) }}>
              결제 대기 ({before_pay_count})</div>
            <span>▶︎</span> */}
            <div className={isSelect(0)} onClick={() => { setFilter(0); setExterminateState(0); setrequestDepositState(1) }}>
              매칭중 ({matching_count})
            </div>
            <span>▶︎</span>
            <div
              className={isSelect(1)} onClick={() => { setFilter(1); setExterminateState(1); setrequestDepositState(1) }}>
              작업 준비 중({perparing_count})
            </div>
            <span>▶︎</span>
            <div className={isSelect(2)} onClick={() => { setFilter(2); setExterminateState(2); setrequestDepositState(1) }}>
              작업중({exterminating_count})
            </div>
            <span>▶︎</span>
            <div className={isSelect(3)} onClick={() => { setFilter(3); setExterminateState(3); setrequestDepositState(1) }}>
              작업 완료({done_count})
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
           
            
            <div className="custom-div" />
          </TableHeader_Pest_useList>

          {filterData().map((data, idx) => {
            // 결제 대기 상태 확인
           

            return (
              <TableList_Pest_useList
                key={idx}
                className={(idx + 1) % 2 === 0 ? "x2" : ""}
                onClick={() => openModal(data)}
              >
                <div>{data.landNickName}</div>
                <div>{data.startDate}</div>
                <div>{data.exterminator ? data.exterminator.name : "미지정"}</div>
                <div>{data.exterminator ? data.exterminator.mobileno : "미지정"}</div>
                <div className="addr">{data.jibun}</div>
                <div>
                  {
                    data.exterminateState === 0
                      ? "매칭 중"
                      : data.exterminateState === 1
                        ? "작업 대기"
                        : data.exterminateState === 2
                          ? "작업 중"
                          : "작업 완료"}
                </div>


                <BtnArea_Pest_useList>
               
                  {/* 매칭중 상태에 '환불하기' 버튼 추가 */}
                  {data.exterminateState === 0 && data.requestDepositState === 1 && (
                    <div>
                      <Btn
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation(); // Row 클릭 이벤트 차단
                          handleRefundRequest(data.orderId);;
                        }}
                      >
                        환불하기
                      </Btn>
                    </div>
                  )}
                  {/* 작업 완료 상태에 버튼 추가 */}
                  {data.exterminateState === 3 && (
                    <div>
                      <CheckButton
                        orderId={data.orderId}
                        checkState={data.checkState} // data의 checkState 값을 전달
                        onButtonClick={(e) => e.stopPropagation()} // Row 클릭 이벤트 차단
                      />
                    </div>
                  )}

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

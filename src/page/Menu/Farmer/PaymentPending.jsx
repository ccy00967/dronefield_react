import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  ContentArea_Pest_useList,
  TableHeader_Pest_useList,
  TableList_Pest_useList,
  BtnArea_Pest_useList,
  Btn,
} from "./css/FarmerCss";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import { load_API } from "../../../Api/Farmer";
import SideMenuBar from "../SideMenuBar";
import { fetchUserInfo } from "../../../Api/api";
import { requestPayment } from "../../tosspayments/TossPayments_func";
import { CheckBox, Icon, RowView, RowView2 } from "../../../Component/common_style";
import useEscapeKey from "../../../Component/function/useEscapeKey";

const PaymentPending = () => {
  const [cnt, setCnt] = useState(0); // 전체 게시글 갯수
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 갯수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [dataList, setDataList] = useState([]); // 데이터 목록
  const [checkedOrderIds, setCheckedOrderIds] = useState([]); // 선택된 주문 ID
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD"); // 결제 방식
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태
  const [selectedData, setSelectedData] = useState([]); // 선택된 데이터 정보

  useEffect(() => {
    // 결제 대기 상태의 데이터만 로드
    load_API(setDataList, setCnt, currentPage, perPage, 0, 0);
  }, [currentPage, perPage]);

  // 전체 선택 상태 확인
  const isAllChecked =
    dataList.length > 0 &&
    dataList.every((data) => checkedOrderIds.includes(data.orderId));

  // 헤더 체크박스 핸들러
  const handleHeaderCheckboxChange = (isChecked) => {
    if (isChecked) {
      // 모든 데이터의 orderId 추가
      setCheckedOrderIds(dataList.map((data) => data.orderId));
    } else {
      // 선택된 ID 초기화
      setCheckedOrderIds([]);
    }
  };

  // 개별 체크박스 핸들러
  const handleCheckboxChange = (orderId, isChecked) => {
    setCheckedOrderIds((prev) => {
      if (isChecked) {
        return [...prev, orderId];
      } else {
        return prev.filter((id) => id !== orderId);
      }
    });
  };

  // 모달 열기
  const openModal = () => {
    const selected = dataList.filter((data) =>
      checkedOrderIds.includes(data.orderId)
    );
    setSelectedData(selected);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEscapeKey(closeModal);


  // 결제 버튼 클릭 핸들러
  const handlePayment = async () => {
    try {
      const userdata = await fetchUserInfo();
      const name = userdata?.name || "이름 없음";
      const phone = userdata?.mobileno || "번호 없음";
      const email = userdata?.email || "이메일 없음";

      // 선택된 데이터에서 requestAmount 합산
      const selectedAmounts = selectedData.reduce(
        (sum, data) => sum + data.requestAmount,
        0
      );

      const serviceAmount = selectedData.length * 10000; // 예제 금액 계산
      const totalAmount = selectedAmounts + serviceAmount; // 합산
      console.log({
        selectedPaymentMethod,
        totalAmount,
        name,
        phone,
        email,
        checkedOrderIds,
      });

      // 결제 요청
      const response = await requestPayment(
        selectedPaymentMethod,
        totalAmount,
        name,
        phone,
        email,
        checkedOrderIds
      );

      // TossPayments_func.jsx에서 requestPayment가 성공/실패 상태를 반환해야 함
      if (response.status === "CANCEL") {
        alert("결제가 취소되었습니다.");
      } else if (response.status === "SUCCESS") {
        alert("결제가 완료되었습니다.");
        // 데이터 새로고침
        load_API(setDataList, setCnt, currentPage, perPage, 0, null);
      } else {
        throw new Error("결제 상태를 확인할 수 없습니다.");
      }
      closeModal(); // 결제 완료 후 모달 닫기
    } catch (error) {
      console.error("결제 중 오류 발생:", error);
      if (error.message === "취소되었습니다.") {
        alert("결제가 취소되었습니다.");
      } else {
        alert("결제 처리 중 오류가 발생했습니다.");
      }
    }
  };

  // 선택된 데이터의 총 결제금액 계산
  const totalSelectedAmount =
    selectedData.reduce((sum, data) => sum + data.requestAmount, 0) +
    selectedData.length * 10000;

  return (
    <Common_Layout>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제"} submenu={"결제대기"} />

        <ContentArea_Pest_useList>
          <h2>결제대기</h2>
          <PerPageControl
            perPage={perPage}
            setPerPage={setPerPage}
            setCurrentPage={setCurrentPage}
          />
          <TableHeader_Pest_useList>
            <div>농지별명</div>
            <div>신청일자</div>
            <div>방제업체</div>
            <div>업체전화번호</div>
            <div className="addr">농지주소</div>
            <div>상태</div>
            <div>
              {/* 헤더 체크박스 */}
              <CheckBox
                type="checkbox"
                checked={isAllChecked}
                onChange={(e) => handleHeaderCheckboxChange(e.target.checked)}
              />
            </div>
          </TableHeader_Pest_useList>
          {dataList.map((data, idx) => (
            <TableList_Pest_useList
              key={idx}
              className={(idx + 1) % 2 === 0 ? "x2" : ""}
            >
              <div>{data.landNickName}</div>
              <div>{data.startDate}</div>
              <div>{data.exterminator ? data.exterminator.name : "미지정"}</div>
              <div>
                {data.exterminator ? data.exterminator.mobileno : "미지정"}
              </div>
              <div className="addr">{data.jibun}</div>
              <div>결제대기</div>
              <div>
                {/* 개별 체크박스 */}
                <CheckBox
                  type="checkbox"
                  checked={checkedOrderIds.includes(data.orderId)}
                  onChange={(e) =>
                    handleCheckboxChange(data.orderId, e.target.checked)
                  }
                />
              </div>
            </TableList_Pest_useList>
          ))}
          {/* 결제 버튼 렌더링 */}
          {checkedOrderIds.length > 0 && (
            <Btn size="small" onClick={openModal}>
              결제하기
            </Btn>
          )}

          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea_Pest_useList>

        {/* 모달 */}
        {isModalOpen && (
          <ModalOverlay>
            <ModalContent>
              <RowView2 className="end">
                <CloseIcon
                  className="pointer"
                  onClick={closeModal}
                >
                  ✖
                </CloseIcon>
              </RowView2>
              <Title>결제 확인</Title>
              <Divider />
              <Table>
                <thead>
                  <tr>
                    <th>농지별명</th>
                    <th>신청일자</th>
                    <th>농지주소</th>
                    <th>가격</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.landNickName}</td>
                      <td>{item.startDate}</td>
                      <td>{item.jibun}</td>
                      <td>{item.requestAmount.toLocaleString()}원</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Divider />
              <CenteredText>결제 전 정보를 다시 한 번 확인하세요!</CenteredText>


              <TotalAmountWrapper>
                <TotalAmountTitle>서비스 이용금액:</TotalAmountTitle>
                <TotalAmountValue>
                  {(selectedData.length * 10000).toLocaleString()}원
                </TotalAmountValue>
              </TotalAmountWrapper>

              <TotalAmountWrapper>
                <TotalAmountTitle>총 <TotalAmountValue>{selectedData.length}</TotalAmountValue>건 결제금액:</TotalAmountTitle>
                <TotalAmountValue>
                  {totalSelectedAmount.toLocaleString()}원
                </TotalAmountValue>
              </TotalAmountWrapper>
              <ActionWrapper>
                <StyledButton onClick={handlePayment}>
                  결제하기
                </StyledButton>
              </ActionWrapper>
            </ModalContent>
          </ModalOverlay>
        )}

      </RowView>
    </Common_Layout>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7); /* 배경 어두운 효과 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.3s ease;
  position: relative;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseIcon = styled.span`
  font-size: 20px;
  cursor: pointer;
  color: #555;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #000;
  }
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: #ddd;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  thead {
    background: #f9f9f9;

    th {
      text-align: left;
      padding: 10px;
      font-weight: bold;
      color: #555;
      border-bottom: 2px solid #ddd;
    }
  }

  tbody {
    tr {
      &:nth-child(even) {
        background: #f4f4f4;
      }

      td {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 14px;
        color: #333;

        &:nth-child(4) { /* '가격' 열의 텍스트만 볼드 */
          font-weight: bold;
        }
      }
    }
  }
`;


const TotalAmountWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 우측 정렬 */
  align-items: center;
  gap: 8px; /* 글자와 금액 사이의 간격 */
  margin: 20px 0;
`;

const TotalAmountTitle = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const TotalAmountValue = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #ff5722;
`;


const ActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const CenteredText = styled.div`
  text-align: center;
  font-size: 16px; /* 조금 더 읽기 쉬운 크기로 */
  font-weight: 500; /* 약간 두꺼운 글씨체 */
  margin: 24px 0; /* 위아래 여백을 약간 더 추가 */
  line-height: 1.6; /* 줄 간격을 늘려 가독성 향상 */
`;
const StyledButton = styled(Btn)`
  width: 100%; /* 버튼을 부모 컨테이너의 너비만큼 늘림 */
  max-width: 200px; /* 너무 길어지지 않도록 최대 너비 설정 */
  padding: 16px 24px; /* 버튼의 높이와 내부 여백 증가 */
  font-size: 18px; /* 글씨 크기 증가 */
  border-radius: 8px; /* 둥근 모서리 */
  background-color: #28a745; /* 버튼 색상 */
  color: white; /* 텍스트 색상 */
  font-weight: bold; /* 텍스트를 강조 */
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 효과 */

  &:hover {
    background-color: #218838; /* 호버 시 색상 변경 */
    cursor: pointer; /* 마우스 포인터 변경 */
  }
`;

export default PaymentPending;

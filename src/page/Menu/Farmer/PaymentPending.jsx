import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  ContentArea_Pest_useList,
  TableHeader_Pest_useList,
  TableList_Pest_useList,
  BtnArea_Pest_useList,
} from "./css/FarmerCss";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import { load_API } from "../../../Api/Farmer";
import SideMenuBar from "../SideMenuBar";

const PaymentPending = () => {
  const [cnt, setCnt] = useState(0); // 전체 게시글 갯수
  const [perPage, setPerPage] = useState(10); // 페이지당 게시글 갯수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [dataList, setDataList] = useState([]);

  // 데이터 로드
  useEffect(() => {
    load_API(setDataList, setCnt, currentPage, perPage, 0, null); // 결제대기 필터 설정
  }, [currentPage, perPage]);

  return (
    <Common_Layout>
      <RowView className="top">
        {/* 사이드 메뉴바 추가 */}
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
          </TableHeader_Pest_useList>
          {dataList.map((data, idx) => (
            <TableList_Pest_useList key={idx} className={(idx + 1) % 2 === 0 ? "x2" : ""}>
              <div>{data.landNickName}</div>
              <div>{data.startDate}</div>
              <div>{data.exterminator ? data.exterminator.name : "미지정"}</div>
              <div>{data.exterminator ? data.exterminator.mobileno : "미지정"}</div>
              <div className="addr">{data.jibun}</div>
              <div>결제대기</div>
              <BtnArea_Pest_useList>
                {/* 결제 관련 버튼 추가 가능 */}
              </BtnArea_Pest_useList>
            </TableList_Pest_useList>
          ))}
          <PagingControl
            cnt={cnt}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            perPage={perPage}
          />
        </ContentArea_Pest_useList>
      </RowView>
    </Common_Layout>
  );
};

const RowView = styled.div`
  display: flex;
  flex-direction: row;
`;

export default PaymentPending;

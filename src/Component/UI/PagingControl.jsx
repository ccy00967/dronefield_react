import { useEffect, useState } from "react";
import styled from "styled-components";
import { CenterView, Icon } from "../common_style";

// 스타일 정의
const PageDiv = styled(CenterView)`
  margin: 2.5rem 0rem;
`;

const PageNum = styled(CenterView)`
  width: 2.5rem;
  height: 2.5rem;
  margin-left: 0.5rem;
  border: 1px solid #f0f0f0;
  border-radius: 50px;
  cursor: pointer;
  &.currentPage {
    background-color: #f0f0f0;
    font-weight: bold;
  }
`;

const ArrowIcon = styled(Icon)`
  width: 1.3rem;
  height: 1.3rem;
  padding: 0.6rem;
  margin: 0rem 1rem;
  background-color: white;
  border: 1px solid #f0f0f0;
  border-radius: 50px;
  cursor: pointer;
  &.none {
    border: 1px solid #dddddd;
    opacity: 0.5;
    cursor: default;
  }
`;

// 컴포넌트 정의
const PagingControl = (props) => {
  const cnt = props.cnt || 0; // 전체 게시글 수
  const currentPage = props.currentPage || 1; // 현재 페이지 번호
  const setCurrentPage = props.setCurrentPage; // 페이지 상태 변경 함수
  const perPage = props.perPage || 10; // 한 페이지에 보여줄 게시글 수

  // 마지막 페이지 번호 계산
  const finalPagenum = Math.ceil(cnt / perPage); // 총 페이지 수

  // 표시할 페이지 배열 상태
  const [pageArray, setPageArray] = useState([]);

  // 페이지 계산 함수
  const paging = () => {
    /*
      현재 페이지에 따라 10개씩 묶어서 페이지 배열 생성
      예: 1~10 → [1, 2, 3, ..., 10], 11~20 → [11, 12, ..., 20]
    */
    const start_to_end_num = Math.floor((currentPage - 1) / 10);
    let new_arr = [];

    const startNum = start_to_end_num * 10 + 1; // 시작 페이지 번호
    const endNum = Math.min((start_to_end_num + 1) * 10, finalPagenum); // 마지막 페이지 번호

    for (let i = startNum; i <= endNum; i++) {
      new_arr.push(i);
    }
    setPageArray(new_arr);
  };

  // `currentPage`, `cnt`, 또는 `perPage` 변경 시 페이지 계산
  useEffect(() => {
    paging();
  }, [currentPage, cnt, perPage]);

  // 이전 페이지로 이동
  const pre_page = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 다음 페이지로 이동
  const next_page = () => {
    if (currentPage < finalPagenum) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 렌더링
  return (
    <PageDiv>
      {/* 이전 화살표 */}
      <ArrowIcon
        className={currentPage > 1 ? "" : "none"} // 첫 페이지에서 비활성화
        src={require("../../img/icon_arrow_left.png")}
        onClick={pre_page}
      />
      {/* 페이지 번호 */}
      {pageArray.map((item) => (
        <PageNum
          key={item}
          onClick={() => setCurrentPage(item)} // 페이지 번호 클릭 시 이동
          className={currentPage === item ? "currentPage" : ""}
        >
          {item}
        </PageNum>
      ))}
      {/* 다음 화살표 */}
      <ArrowIcon
        className={
          currentPage < finalPagenum ? "" : "none" // 마지막 페이지에서 비활성화
        }
        src={require("../../img/icon_arrow_right.png")}
        onClick={next_page}
      />
    </PageDiv>
  );
};

export default PagingControl;

import { useEffect, useState } from "react";
import styled from "styled-components";
import { CenterView, Icon } from "../common_style";

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

const PagingControl = (props) => {
  const cnt = props.cnt || 0; // 전체 개시글 갯수
  const currentPage = props.currentPage; // 현재 페이지 넘버
  const setCurrentPage = props.setCurrentPage; // 페이지 set함수
  const perPage = props.perPage || 20; // 몇개씩 보여줄건지. (디폴트 20개)

  // 마지막 페이지 넘버
  const finalPagenum =
    cnt % perPage > 0
      ? Math.floor(cnt / perPage) + 1
      : Math.floor(cnt / perPage);

  // 보여줄 페이지 배열
  const [pageArray, setPageArray] = useState([]);
  const paging = () => {
    /* 
     start_to_end_num 는,
     현재 페이지(currentPage) 기준으로
     현재 페이지(currentPage)가 1~10 사이에 있다면 0,
     11~20 이면 1, 21~30: 2 ... 출력 
     */
    const start_to_end_num = Math.floor((currentPage - 1) / 10);
    let new_arr = [];

    const startNum = start_to_end_num * 10 + 1;
    const endNum = (start_to_end_num + 1) * 10;

    for (let i = startNum; i <= endNum && i <= finalPagenum; i++) {
      new_arr.push(i);
    }
    setPageArray(new_arr);
  };
  useEffect(() => {
    paging();
  }, [currentPage, cnt, perPage]);

  // 이전 페이지
  const pre_page = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // 다음 페이지
  const next_page = () => {
    if (currentPage !== finalPagenum) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <PageDiv>
      <ArrowIcon
        className={currentPage !== 1 ? "" : "none"}
        src={require("../../img/icon_arrow_left.png")}
        onClick={pre_page}
      />
      {pageArray.map((item, idx) => (
        <PageNum
          key={idx}
          onClick={() => setCurrentPage(item)}
          className={currentPage === item ? "currentPage" : ""}
        >
          {item}
        </PageNum>
      ))}
      <ArrowIcon
        className={
          currentPage === finalPagenum || finalPagenum === 0 ? "none" : ""
        }
        src={require("../../img/icon_arrow_right.png")}
        onClick={next_page}
      />
    </PageDiv>
  );
};

export default PagingControl;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  Icon,
  lightGreenColor,
  RowView,
  RowView2,
} from "../../Component/common_style";
import PagingControl from "../../Component/UI/PagingControl";

const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const CSInfo = styled(RowView2)`
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  color: gray;
  span {
    margin-left: 0.5rem;
    font-family: var(--font-Pretendard-Medium);
    color: #1d1d1d;
  }
`;
const SearchBar = styled(RowView2)`
  padding: 0rem 1rem;
  border: 1px solid
    ${(props) => (props.$isfocused === "on" ? "#454545" : "#eeeeee")};
  border-radius: 8px;
  transition: all 0.4s ease;
  img {
    padding: 0.5rem 0rem;
    cursor: pointer;
  }
`;
const SearchSelect = styled.select`
  width: 3rem;
  padding: 0.5rem 0rem;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
`;
const SearchInput = styled.input`
  box-sizing: border-box;
  width: 20rem;
  height: 2.5rem;
  padding-left: 1rem;
  font-size: 15px;
  border: 0px;
  outline: 0px;
  &::placeholder {
    font-size: 14px;
    color: darkgray;
  }
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  text-align: center;
  span {
    width: 5rem;
    margin-right: 1rem;
  }
  div {
    flex: 1;
  }
  div.long {
    flex: 2;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  text-align: center;
  cursor: pointer;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  span {
    width: 5rem;
    margin-right: 1rem;
  }
  div {
    flex: 1;
  }
  div.long {
    flex: 2;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Btn = styled.div`
  padding: 1rem 3rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;

const CS = () => {
  const Navigate = useNavigate();

  const [searchType, setSearchType] = useState("병원");
  const [search, setSearch] = useState("");
  const setting_serchType = (e) => setSearchType(e.target.value);
  const settingg_search = (e) => setSearch(e.target.value);

  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  const [dataList, setDataList] = useState([]);
  const testData = Array(parseInt(perPage)).fill();

  const load_API = () => {
    // 호출 성공시
    setCnt(40);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  // 검색
  const search_API = () => {
    alert(search);
  };

  // 엔터 시 검색
  const keyPress_keyword = (e) => {
    if (search.trim() === "") {
      return;
    }
    if (e.key === "Enter") {
      search_API();
    }
  };

  // 검색창 css
  const [isfocuse, setIsfocuse] = useState("off");
  const onFocus = () => setIsfocuse("on");
  const offFocus = () => setIsfocuse("off");

  const go_write = () => Navigate("insert");

  return (
    <Common_Layout minWidth={700} topMenu={"고객센터"}>
      <CenterView>
        <ContentArea>
          <div className="title">고객문의게시판</div>
          <CSInfo>
            고객문의게시판
            <span>010-7735-3953</span>
          </CSInfo>

          <RowView>
            <RowView2>
              <SearchBar $isfocused={isfocuse}>
                <SearchSelect
                  value={searchType}
                  onChange={setting_serchType}
                  onFocus={onFocus}
                  onBlur={offFocus}
                >
                  <option value={"제목"}>제목</option>
                  <option value={"작성자"}>작성자</option>
                </SearchSelect>

                <SearchInput
                  type="text"
                  value={search}
                  onChange={settingg_search}
                  onKeyPress={keyPress_keyword}
                  onFocus={onFocus}
                  onBlur={offFocus}
                />
                <Icon
                  onClick={search_API}
                  src={require("../../img/icon_search.png")}
                />
              </SearchBar>
            </RowView2>

            <Btn onClick={go_write}>글 작성</Btn>
          </RowView>

          <TableHeader>
            <span>번호</span>
            <div className="long">제목</div>
            <div>작성자</div>
            <div>작성일</div>
          </TableHeader>

          {dataList.map((data, idx) => {
            const boardNum = (currentPage - 1) * perPage + (idx + 1);
            const go_detail = () => Navigate(`detail/${idx}`);

            return (
              <TableList
                key={idx}
                className={(idx + 1) % 2 === 0 ? "x2" : ""}
                onClick={go_detail}
              >
                <span>{boardNum}</span>
                <div className="long">비밀번호 어떻게 변경하나요?</div>
                <div>홍길동</div>
                <div>2021.02.02</div>
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
      </CenterView>
    </Common_Layout>
  );
};

export default CS;

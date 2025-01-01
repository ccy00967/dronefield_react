import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  Icon,
  RowView,
  RowView2,
} from "../../Component/common_style";
import PagingControl from "../../Component/UI/PagingControl";
import {
  ContentArea,
  CSInfo,
  SearchBar,
  SearchSelect,
  SearchInput,
  TableHeader,
  TableList,
  Btn,
} from "./css/CSCss";


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

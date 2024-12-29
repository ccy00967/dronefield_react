import { useEffect, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  CenterView,
  lightRedColor,
  redColor,
  RowView
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import SideMenuBar from "../SideMenuBar";

const TextSemiBold = styled.div`
  margin-bottom: 2rem;
  font-size: ${(props) => `${props.$size || 16}px`};
  font-family: var(--font-Pretendard-SemiBold);
`;
const TextMedium = styled.div`
  margin-bottom: 5px;
  font-size: ${(props) => `${props.$size || 16}px`};
  font-family: var(--font-Pretendard-Medium);
`;
const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const Content = styled(RowView)`
  div.table {
    flex: 1;
  }
`;
const TableHeader = styled(RowView)`
  height: 3.8rem;
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  background-color: ${lightRedColor};
  div {
    text-align: center;
    flex: 1;
  }
`;
const TableList = styled(RowView)`
  height: 3.8rem;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
`;
const Bill = styled(RowView)`
  box-sizing: border-box;
  width: 26rem;
  padding: 1.5rem 1rem;
  margin-left: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  div.btn {
    padding: 3rem 0.4rem;
    font-size: 14px;
    color: #555555;
    background-color: #f0f0f0;
    border-radius: 5px;
    box-shadow: 0px 0px 4px #c6c6c6;
    cursor: pointer;
  }
  div.content {
    box-sizing: border-box;
    width: 100%;
    padding: 1rem;
  }
`;
const Btn = styled.div`
  margin-top: 2rem;
  padding: 0.8rem 0rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${redColor};
  border-radius: 8px;
  cursor: pointer;
`;
const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
`;
const InputDiv = styled(RowView)`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid;
  border-color: ${(props) =>
    props.$isfocused === "on" ? "#454545" : "#f0f0f0"};
  border-radius: 8px;
  input {
    width: 100%;
    font-size: 16px;
    border: 0;
    outline: 0;
  }
`;

const Inventory_manage = () => {
  const [cnt, setCnt] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // 농지 데이터 load
  const [dataList, setDataList] = useState([]);
  // 이건 테스트 데이터
  const testData = Array(parseInt(perPage)).fill("");
  const load_API = () => {
    // 호출 성공시
    setCnt(960);
    setDataList(testData);
  };
  useEffect(() => {
    load_API();
  }, [currentPage, perPage]);

  // 면적 div태그 css
  const [isfocuse, setIsfocuse] = useState("off");
  const onFocus = () => setIsfocuse("on");
  const offFocus = () => setIsfocuse("off");

  return (
    <Common_Layout minWidth={1400}>
      <RowView className="top">
        <SideMenuBar mainmenu={"농약"} submenu={"재고등록"} />

        <ContentArea>
          <TextSemiBold $size={28}>재고등록</TextSemiBold>

          <Content className="top">
            <div className="table">
              <TableHeader>
                <div>농약 이름</div>
                <div>가격</div>
                <div>수량</div>
              </TableHeader>

              {dataList.map((data, idx) => {
                return (
                  <TableList
                    key={idx}
                    className={(idx + 1) % 2 === 0 ? "x2" : ""}
                  >
                    <div>튼튼농약</div>
                    <div>30,000원</div>
                    <div>1</div>
                  </TableList>
                );
              })}

              <PagingControl
                cnt={cnt}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                perPage={perPage}
              />
            </div>

            <Bill>
              <div className="content">
                <CenterView>
                  <TextSemiBold $size={22}>재고등록</TextSemiBold>
                </CenterView>

                <TextMedium>농약이름</TextMedium>
                <InputBox placeholder="농약 이름을 입력해주세요." />

                <TextMedium>가격</TextMedium>
                <InputDiv $isfocused={isfocuse}>
                  <input
                    placeholder="가격을 입력해주세요."
                    onFocus={onFocus}
                    onBlur={offFocus}
                  />
                  원
                </InputDiv>

                <TextMedium>수량</TextMedium>
                <InputBox placeholder="수량을 입력해주세요." />

                <Btn>등록하기</Btn>
              </div>
            </Bill>
          </Content>
        </ContentArea>
      </RowView>
    </Common_Layout>
  );
};

export default Inventory_manage;

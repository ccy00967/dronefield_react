import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  grayColor,
  GreenColor,
  greyColor,
  Icon,
  lightBlueColor,
  RowView,
  RowView2,
  yellowColor,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import PerPageControl from "../../../Component/UI/PerPageControl";
import SideMenuBar from "../SideMenuBar";
import WorkStatus_Modal from "./Modal/WorkStatus_Modal";
import { server } from "../../url";
import { workStart_API, workFin_API, cancel1_API, cancel2_API } from "./pilotFetchFunc";



const ContentArea = styled.div`
  flex: 1;
  padding: 2rem;
  border-left: 1px solid #f0f0f0;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const FilterBox = styled(RowView)`
  margin: 2rem 0rem;
  div {
    flex: 1;
    padding: 1rem 0rem;
    text-align: center;
    font-size: 20px;
    color: #8e8e8e;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  span {
    color: #d8d8d8;
    margin: 0rem 1rem;
  }
  div.this {
    font-family: var(--font-Pretendard-SemiBold);
    color: white;
    background-color: ${blueColor};
  }
`;
const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightBlueColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
  span {
    width: 6rem;
  }
  select {
    background-color: ${lightBlueColor};
    font-size: 18px;
    font-family: var(--font-Pretendard-Medium);
    outline: 0;
    border: 0;
    cursor: pointer;
  }
`;
const TableList = styled(RowView)`
  height: 4rem;
  cursor: pointer;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  div {
    text-align: center;
    flex: 1;
  }
  div.addr {
    flex: 2;
  }
`;
const BtnArea = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  margin-right: 0px;
  margin-left: 0px;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1.2rem;
    border-radius: 4px;
    }
    span.green {
      background-color: ${GreenColor};
      cursor: pointer;
      }
      span.blue {
        background-color: ${blueColor};
        cursor: pointer;
        }
        span.gray {
          background-color: ${grayColor};
          cursor: pointer;
          }
          span.yellow {
            background-color: ${yellowColor};
            cursor: pointer;}
            `;





const WorkStatus = () => {
  const [cnt, setCnt] = useState(0); // 전체 개시글 갯수
  const [perPage, setPerPage] = useState(20); // 페이지당 게시글 갯수 (디폴트:20)
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [filter, setFilter] = useState([]);
  const setting_reset = () => setFilter("");

  const [dataList, setDataList] = useState([]);




  const getWorkStatus = async () => {
    let length = 0;
    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = userInfo.access_token;

    const res = await fetch(server + "/exterminator/workinglist/0/", {

      method: 'GET',
      headers: {
        'Content-Type': "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        length = data.length;
        //store.dispatch(workdatalistSlice.actions.setWorkData(data));
        //console.log(length);
        setDataList(data)
        console.log(data)

        //return data
      });
  }

  useEffect(() => {
  getWorkStatus()
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

  const getcountlength = (filterType) => {

    if (filterType === 1) {
      return dataList.filter(item => item.exterminateState === 1).length;
    } else if (filterType === 2) {
      return dataList.filter(item => item.exterminateState === 2).length;
    } else if (filterType === 3) {
      return dataList.filter(item => item.exterminateState === 3).length;
    }
    return dataList.length;
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
            <div className={isSelect("매칭완료")} onClick={() => setFilter(1)}>
              작업 준비 중({getcountlength(1)})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업시작")} onClick={() => setFilter(2)}>
              작업 중({getcountlength(2)})
            </div>
            <span>▶︎</span>
            <div className={isSelect("작업완료")} onClick={() => setFilter(3)}>
              작업 완료({getcountlength(3)})
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
                  <div>{data.landInfo.landNickName}</div>
                  <div>{data.startDate}</div>
                  <div>{data.owner.name}</div>
                  <div>{data.owner.mobileno}</div>
                  <div className="addr">{data.owner.address.jibunAddress}</div>
                  <div>{data.exterminateState === 1 ? ("작업 준비 중") : (data.exterminateState === 2 ? ("작업 중") : data.exterminateState === 3 && ("작업완료"))}</div>


                  <BtnArea>

                    {data.exterminateState === 1 ? (
                      <span className="green" onClick={() => workStart_API(data.orderid)}>
                        시작
                      </span>
                    ) : (
                      data.exterminateState === 2 ? (
                        <RowView2>
                          <span className="blue" onClick={() => workFin_API(data.orderid)}>
                            완료
                          </span>
                           <span className="yellow" onClick={() => cancel1_API(data.orderid)}>
                            취소
                          </span> 
                        </RowView2>

                      ) : (
                        data.exterminateState === 3 && (
                          <RowView>
                            {/* <span className="gray">
                              완료
                            </span> */}
                            <span className="yellow" onClick={() => cancel2_API(data.orderid)}>취소</span>
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

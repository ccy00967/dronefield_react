import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  blueColor,
  CenterView,
  CheckBox,
  lightBlueColor,
  redColor,
  RowView,
  RowView2,
} from "../../../Component/common_style";
import PagingControl from "../../../Component/UI/PagingControl";
import SideMenuBar from "../SideMenuBar";
import { requestPayment } from "../../tosspayments/TossPayments_func";
import { server } from "../../url";
import { fetchToken, fetchUserInfo, fetchAddressData,getfarmrequest, putfarmrequest } from "../../../Api/api_DronePilot";
import {
  TextSemiBold, TextMedium,
  DataRow, ContentArea,
  FilterBox, SearchBox,
  Content, TableHeader, TableList,
  Hr, SearchBtn, Bill, Btn
} from "./css/MatchingCss";

const Matching = ({ }) => {
  const [cnt, setCnt] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [seqList, setSeqList] = useState([]);
  const [token, setToken] = useState(null);
  const [provinces, setProvinces] = useState([]); // 시/도 데이터
  const [cities, setCities] = useState([]); // 시/군/구 데이터
  const [towns, setTowns] = useState([]); // 읍/면/동 데이터
  const [selectedProvince, setSelectedProvince] = useState(""); // 선택한 시/도
  const [selectedCity, setSelectedCity] = useState(""); // 선택한 시/군/구
  const [selectedTown, setSelectedTown] = useState(""); // 선택한 읍/면/동
  const [errorMessage, setErrorMessage] = useState("");
  const [cdInfo, setCdInfo] = useState(""); //cd값 저장
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false); //체크한 orderid
  const [selectData, setSelectData] = useState([]); // 체크한 데이터 신청정보창 정보
  const [pilotdata, setPilotdata] = useState([]); // pilot data 
  const [see_seq, setSee_Seq] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [lndpcl, setlndpcl] = useState([]);
  const [sum, setsum] = useState([]);

  const name = pilotdata?.name || "이름 없음";
  const phone = pilotdata?.mobileno || "번호 없음";
  const amount = pilotdata?.requestAmount || 0;
  const email = pilotdata?.email || "이메일 없음";
  const serviceAmount = checkedList.length * 1000;
  const payorderid = checkedList[0] || "";
  const totalAmount = amount + serviceAmount;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("CARD");



  //체크박스 로직
  const checkedItemHandler = (value, isChecked) => {
    // landInfo가 유효한 객체인지 확인
    if (value.landInfo && typeof value.landInfo === 'object') {
      const lndpclAr = parseFloat(value.landInfo.lndpclAr); // 문자열을 숫자로 변환

      // lndpclAr가 유효한 숫자인지 확인
      if (!isNaN(lndpclAr)) {
        const calculatedLndpcl = lndpclAr * 30 * 0.3025; // 숫자로 계산

        if (isChecked) {
          // 항목이 체크된 경우
          setCheckedList((prev) => [...prev, value.orderid]);
          setSelectData((prev) => [...prev, value]);
          // lndpcl에 숫자 값 추가 (중복 허용)
          setlndpcl((prev) => [...prev, calculatedLndpcl]);

          return;
        }

        // 항목이 체크 해제된 경우
        if (!isChecked && checkedList.includes(value.orderid)) {
          // 선택된 마지막 항목이라면 see_seq 감소
          if (see_seq + 1 === selectData.length) {
            setSee_Seq(see_seq - 1);
          }

          // 체크리스트에서 orderid 제거
          setCheckedList((prev) => prev.filter((item) => item !== value.orderid));

          // selectData에서 해당 값 제거
          setSelectData((prev) => prev.filter((item) => item.orderid !== value.orderid));

          // lndpcl에서 계산된 값 제거
          setlndpcl((prev) => {
            // 해당 값을 제거 (중복된 값 제거)
            const updatedLndpcl = [...prev];
            const index = updatedLndpcl.lastIndexOf(calculatedLndpcl); // 마지막으로 추가된 값의 인덱스 찾기
            if (index !== -1) {
              updatedLndpcl.splice(index, 1); // 해당 인덱스의 값 제거
            }
            return updatedLndpcl;
          });

          console.log(lndpcl);
          console.log(selectData);

          return;
        }
      } else {
        console.error('Invalid lndpclAr value:', value.landInfo.lndpclAr);
      }
    } else {
      console.error('landInfo is not a valid object:', value.landInfo);
    }

    return;
  };

  // 숫자만 포함된 lndpcl 배열에서 합계 계산
  const formattedTotal = Math.round(
    lndpcl.reduce((acc, cur) => acc + cur, 0) // lndpcl에는 이미 숫자만 들어있음
  )
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";






  const checkHandler = (e, value) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);

  };

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log('checkedList:', [...checkedList]);
      console.log('selectData', selectData)

    },
    [checkedList]
  );
  // 여기까지




  // 토큰을 먼저 받아오고, 받은 토큰을 사용해 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      // 토큰을 받아오는 로직
      const fetchedToken = await fetchToken();
      if (!fetchedToken) {
        setErrorMessage("Failed to fetch token");
        return;
      }

      setToken(fetchedToken); // 토큰 상태 설정

      // 시/도 데이터를 가져오는 함수 호출 (처음에는 code 없이 전체 시/도 데이터를 불러옴)
      fetchAddressData("", setProvinces, fetchedToken);
    };

    fetchData();
  }, []); // 최초 로드 시 호출

  // 시/군/구 데이터를 가져오는 로직
  useEffect(() => {
    if (selectedProvince) {
      fetchAddressData(selectedProvince, setCities, token);
      setSelectedCity("");
      setTowns([]);
    }
  }, [selectedProvince, token]);

  // 읍/면/동 데이터를 가져오는 로직
  useEffect(() => {
    if (selectedCity) {
      fetchAddressData(selectedCity, setTowns, token);
    }
  }, [selectedCity, token]);

  // 주소 데이터를 가져오는 함수


  // 필터박스에서 선택될 때 cd 값을 출력하는 함수
  const handleProvinceChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 시/도 코드 출력
    setSelectedProvince(selectedCd);
    setCdInfo(selectedCd);

  };

  const handleCityChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 시/군/구 코드 출력
    setSelectedCity(selectedCd);
    setCdInfo(selectedCd);

  };

  const handleTownChange = (e) => {
    const selectedCd = e.target.value;
    console.log(selectedCd); // 읍/면/동 코드 출력
    setSelectedTown(selectedCd);
    setCdInfo(selectedCd);

  };



  //cd값을 받아서 정보를 뿌려줌
  const fetchfarmrequest = async () => {
    const farmdata = await getfarmrequest(cdInfo);
    setDataList(farmdata)

  }


  useEffect(() => {
    //getfarmrequest();
    setCnt(dataList.length);
    fetchUserInfo();


    const fetchinfo = async () => {
      //방제사 정보 가져오기
      const pilotdata = await fetchUserInfo();
      setPilotdata(pilotdata);
    }
    //매칭 리스트 가져오기 
    fetchfarmrequest();
    fetchinfo();


  }, []);




  // 선택 게시글
  const selectSeq = (seq) => {
    if (seqList.includes(seq)) {
      {
        setSeqList(seqList.filter((item) => item !== seq));
      }
    } else {
      if (seqList.length < 10) {
        setSeqList([...seqList, seq]);
        //console.log(seqdata);
      }
    }
  };



  // 신청정보 seq
  const setting_pre = () => {
    if (see_seq !== 0) {
      setSee_Seq(see_seq - 1);
    }
  };
  const setting_next = () => {
    if (see_seq + 1 !== seqList.length) {
      setSee_Seq(see_seq + 1);
    }
  };


  useEffect(() => {
    setSee_Seq(0);
  }, [seqList]);

  return (
    <Common_Layout minWidth={1400}>
      <RowView className="top">
        <SideMenuBar mainmenu={"방제/농지분석"} submenu={"거래매칭"} />

        <ContentArea>
          <form onSubmit={onSubmit}>
            <TextSemiBold $size={28}>거래매칭</TextSemiBold>

            <div>
              {errorMessage && <p>Error: {errorMessage}</p>}

              {/* 시/도 필터 */}
              <FilterBox>
                <select value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">시/도 선택</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>

                {/* 시/군/구 필터 */}
                <select value={selectedCity} onChange={handleCityChange}>
                  <option value="">시/군/구 선택</option>
                  {cities.map((city) => (
                    <option key={city.code} value={city.code}>
                      {city.name}
                    </option>
                  ))}
                </select>


                {/* 읍/면/동 필터 */}
                <select value={selectedTown} onChange={handleTownChange}>
                  <option value="">읍/면/동 선택</option>
                  {towns.map((town) => (
                    <option key={town.code} value={town.code}>
                      {town.name}
                    </option>
                  ))}
                </select>


                <SearchBtn onClick={() => fetchfarmrequest()}>
                  검색하기
                </SearchBtn>



              </FilterBox>


            </div>

            <SearchBox
              type={"number"}
              placeholder="원하시는 묶음의 숫자를 입력해주세요."
            />

            <Content className="top">
              <div className="table">
                <TableHeader>
                  <CheckBox
                    type={"checkbox"}
                    $color={"#555555"}
                  // onClick={}
                  />
                  <div>농지별명</div>
                  <div className="long">
                    <select>
                      <option value={""}>농지주소</option>
                    </select>
                  </div>
                  <div>면적</div>
                  <div>작물</div>
                  <div>
                    <select>
                      <option value={""}>농약</option>
                      <option value={"오름차순"}>오름</option>
                      <option value={"내림차순"}>내림</option>
                    </select>
                  </div>
                </TableHeader>

                {dataList.map((data, idx) => {
                  if (data.exterminateState == 0) {
                    if (!data || data.length === 0) {
                      return [];  // data가 undefined 또는 빈 배열일 때 빈 배열 반환
                    }
                    return (
                      <TableList
                        key={idx}
                        className={(idx + 1) % 2 === 0 ? "x2" : ""}

                      >
                        <CheckBox
                          type={"checkbox"}
                          $color={"#555555"}
                          id={data.orderid}
                          checked={checkedList.includes(data.orderid)}
                          onClick={(e) => { selectSeq(idx); }}
                          onChange={(e) => checkHandler(e, data)}
                        // getCheckboxData(data.orderid);
                        />
                        <div>{data.landInfo.landNickName}</div>
                        <div className="long">{data.landInfo.address.jibunAddress}</div>
                        <div className="long">{data.landInfo.lndpclAr}m<sup>2</sup></div>
                        <div>{data.landInfo.cropsInfo}</div>
                        <div>{data.pesticide}</div>
                      </TableList>
                    );
                  }
                })}

                <PagingControl
                  cnt={cnt}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  perPage={perPage}
                />
              </div>

              {selectData.length !== 0 && (

                <Bill>
                  <div className="btn" onClick={setting_pre}>
                    ◀︎
                  </div>
                  <div className="content">
                    <CenterView style={{ marginBottom: "2rem" }}>
                      <TextSemiBold $size={22}>신청정보</TextSemiBold>
                      <div style={{ color: "gray" }}>
                        ({see_seq + 1}/{seqList.length})
                      </div>
                    </CenterView>

                    <DataRow>
                      <TextMedium>이ㅤㅤ름</TextMedium>
                      <div className="gray">{selectData[see_seq].owner.name}</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium>전화번호</TextMedium>
                      <div className="gray">{selectData[see_seq].owner.mobileno}</div>
                    </DataRow>

                    <Hr />

                    <DataRow>
                      <TextMedium>거래방식</TextMedium>
                      <div className="gray">일반거래</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium>농ㅤㅤ지</TextMedium>
                      <div className="gray">{selectData[see_seq].landInfo.landNickName}</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium className="letter">평단가</TextMedium>
                      <div className="gray">{selectData[see_seq].setAmount}30원</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium className="letter">마감일</TextMedium>
                      <div className="gray">{selectData[see_seq].endDate}</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium>사용농약</TextMedium>
                      <RowView2 className="wrap top" style={{ flex: 1 }}>
                        <div className="gray_w">{selectData[see_seq].pesticide}</div>
                      </RowView2>
                    </DataRow>

                    <Hr />

                    <DataRow>
                      <TextMedium className="auto">
                        개별 방제대금(받으실 돈)
                      </TextMedium>
                      {/* 소수점 반올림 */}
                      <div className="gray">{Math.round(30 * selectData[see_seq].landInfo.lndpclAr * 0.3025).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
                    </DataRow>
                    <DataRow>
                      <TextMedium className="auto">서비스 이용금액</TextMedium>
                      <div className="gray">1,000원</div>
                    </DataRow>

                    <Hr className="black" />

                    <RowView>
                      <TextSemiBold $fontsize={20}>
                        총 방제대금(받으실 돈)
                      </TextSemiBold>
                      <TextMedium className="auto" $fontsize={20} $color={true}>
                        {formattedTotal}
                      </TextMedium>
                    </RowView>
                    <RowView>
                      <TextSemiBold $fontsize={20}>
                        총<span style={{ color: blueColor }}> {selectData.length}</span>건 서비스
                        이용금액
                      </TextSemiBold>
                      <TextMedium className="auto" $fontsize={20} $color={true}>
                        {(seqList.length * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원

                      </TextMedium>
                    </RowView>

                    {/* <button type='submit' >콘솔 찍어보기</button>
                 
                  <Btn onClick={() => { putfarmrequest() }}>찍어</Btn> */}
                    {/* <Btn onClick={() => { requestPayment(selectedPaymentMethod, totalAmount, name, phone, email, payorderid); }}>결제하기</Btn> */}
                    <Btn onClick={() => { putfarmrequest(checkedList); requestPayment(selectedPaymentMethod, totalAmount, name, phone, email, payorderid); }}>결제하기</Btn>

                  </div>

                  <div className="btn" onClick={setting_next}>
                    ▶︎
                  </div>
                </Bill>
              )}
            </Content>
          </form>
        </ContentArea>
      </RowView>
    </Common_Layout >
  );
};

export default Matching;

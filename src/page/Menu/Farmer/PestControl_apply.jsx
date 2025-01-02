import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Common_Layout from "../../../Component/common_Layout";
import {
  Icon,
  RowView,
  RowView2,
} from "../../../Component/common_style";

import { InsertBox_Pest_apply,
   InputBox_Pest_apply,
    DateBox_Pest_apply,
    LightBtn_Pest_apply,
  Btn_Pest_apply } from "./css/FarmerCss";
import Component_mapList from "./Component_mapList";
import PestControl_applyModal from "./Modal/PestControl_applyModal";
import { server } from "../../url";

const PestControl_apply = () => {

  const [totalArea, setTotalArea] = useState(0); // 총 면적
  const [landCount, setLandCount] = useState(0); // 필지 개수

  const [transaction, setTransaction] = useState("일반거래");
  const [selectFarmland, setSelectFarmland] = useState("");
  const [price, setPrice] = useState(30);
  const [pesticidesUsed, setPesticidesUsed] = useState("");
  const [startDate, setStartDate] = useState("");
  const [uuid, setUuid] = useState("");
  const [dummy, setDummy] = useState("");
  const [selectlndpclAr, setSelectlndpclAr] = useState(0);
  const totalPrice = price * selectlndpclAr;

  const setting_General = () => setTransaction("일반거래");
  const setting_personal = () => setTransaction("개인거래");
  const setting_price = (e) => setPrice(e.target.value);
  const setting_pesticides = (e) => setPesticidesUsed(e.target.value);
  const setting_startDate = (date) => setStartDate(date);

  const transactionType = (menu) => {
    if (transaction === menu) {
      return "this";
    }
    return "";
  };
  const postData = {
    dealmothod: transaction === "일반거래" ? 0 : 1,
    startDate: '2024-10-30',
    endDate: '2021-11-03',
    pesticide: pesticidesUsed,
    setAveragePrice: price,
    // requestAmount: totalPrice,
  };

  // 모달 열기
  const applyRef = useRef();
  const openModal = (postData) => {
    applyRef.current.visible(postData);
    console.log(postData);
  };

  // 방제 신청
  const apply = async () => {
    // 액세스 토큰과 리프레시 토큰을 갱신하는 함수
    const refreshAccessToken = async () => {
      const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
      const refreshToken = userInfo?.refresh_token;

      const res = await fetch(server + '/user/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // 액세스 토큰과 리프레시 토큰을 로컬스토리지와 상태에 갱신
        userInfo.access_token = data.access;
        localStorage.setItem('User_Credential', JSON.stringify(userInfo));
        return data.access; // 새로운 액세스 토큰 반환
      } else {
        // 리프레시 토큰이 만료되었거나 유효하지 않을 경우 처리
        alert('다시 로그인해주세요'); // 경고창 표시
        localStorage.removeItem('User_Credential'); // 로컬 스토리지에서 정보 제거
        window.location.replace('/'); // 첫 페이지로 리다이렉트
        return null;
      }
    };

    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    let accessToken = userInfo?.access_token;
    console.log(postData);

    let res = await fetch(server + `/farmrequest/send/${uuid}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    });

    // 401 에러가 발생하면 리프레시 토큰으로 액세스 토큰 갱신 후 다시 시도
    if (res.status === 401) {
      accessToken = await refreshAccessToken();
      if (accessToken) {
        // 새로운 액세스 토큰으로 다시 시도
        res = await fetch(server + `/farmrequest/send/${uuid}/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(postData),
        });
      }
    }

    if (res.status === 201) {
      const responseData = await res.json();
      console.log(responseData);
      openModal(responseData);
    } else {
      console.error('요청 실패');
    }
  };

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"방제"}
        submenu={"방제신청"}
        setSearchAddr={setDummy}
        setSelectFarmland={(data) => {
          const farmland = `${data.landNickName}(${data.address.jibunAddress})`;
          setSelectFarmland(farmland); // 선택된 농지 이름
          setUuid(data.uuid);
          setSelectlndpclAr(data.lndpclAr);
        }}
        setTotalArea={setTotalArea} // 총 면적 전달
        setLandCount={setLandCount} // 필지 개수 전달
      >
        <InsertBox_Pest_apply>
          <div className="title">방제신청</div>

          <div className="subtitle">거래 방식</div>
          <RowView2>
            <LightBtn_Pest_apply
              className={transactionType("일반거래")}
              onClick={setting_General}
            >
              일반거래
              {transactionType("일반거래") && (
                <Icon
                  style={{ marginLeft: "5px" }}
                  src={require("../../../img/icon_check.png")}
                />
              )}
            </LightBtn_Pest_apply>
            <LightBtn_Pest_apply
              className={transactionType("개인거래")}
              onClick={setting_personal}
            >
              개인거래
              {transactionType("개인거래") && (
                <Icon
                  style={{ marginLeft: "5px" }}
                  src={require("../../../img/icon_check.png")}
                />
              )}
            </LightBtn_Pest_apply>
          </RowView2>

          <div className="subtitle">농지선택</div>
          <InputBox_Pest_apply
            placeholder="아래 목록에서 농지를 선택해주세요."
            value={selectFarmland}
            readOnly
          />

          <div className="subtitle">평단가</div>
          <InputBox_Pest_apply
            type={"number"}
            placeholder="원하시는 평단가를 입력해주세요.(최소 24원)"
            value={price}
            onChange={setting_price}
          />
          <span>일반거래의 평단가는 30원입니다.</span>

          <div className="subtitle">시작일</div>
          <RowView>
            <DateBox_Pest_apply onClick={() => setting_startDate('2024-08-30')}>8/30</DateBox_Pest_apply>
            <DateBox_Pest_apply onClick={() => setting_startDate('2024-09-06')}>9/6</DateBox_Pest_apply>
            <DateBox_Pest_apply onClick={() => setting_startDate('2024-09-13')}>9/13</DateBox_Pest_apply>
          </RowView>
          <span>신청일 기준 2주 후 마감입니다.</span>

          <div className="subtitle">사용 농약</div>
          <InputBox_Pest_apply
            placeholder="농약은 미리 준비해주세요."
            value={pesticidesUsed}
            onChange={setting_pesticides}
          />

          <Btn_Pest_apply onClick={apply}>신청하기</Btn_Pest_apply>
        </InsertBox_Pest_apply>
      </Component_mapList>

      <PestControl_applyModal ref={applyRef} />
    </Common_Layout>
  );
};

export default PestControl_apply;

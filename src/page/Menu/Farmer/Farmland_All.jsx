import { useEffect, useState } from "react";
import Common_Layout from "../../../Component/common_Layout";
import {
  Icon,
} from "../../../Component/common_style";
import Component_mapList from "./Component_mapList";
import { InsertBox, DataBox, TitleBox } from "./css/FarmerCss";
import { getLandInfo } from "../../../Api/Farmer";


// 해당 화면은 농민의 농지를 전부 보여주는 화면입니다.
// 농민분들이 본인의 땅을 지도로 색칠해서 보여주면 서비스 만족도가 올라갈 것으로 예측됩니다.
// 지도에 특정 구역이 색칠되는 기능 구현 필요
const Farmland_All = () => {
  const [totalArea, setTotalArea] = useState(0); // 총 면적
  const [landCount, setLandCount] = useState(0); // 필지 개수
  const [plantRate, setPlantRate] = useState("현재 서비스 준비중입니다.");
  const [searchAddr, setSearchAddrr] = useState("");


  const calculate_farm = async () => {
    const data = await getLandInfo();
    const totalArea = data.reduce((sum, item) => sum + parseFloat(item.lndpclAr), 0);
    setTotalArea(totalArea);
    setLandCount(data.length);
  }

  useEffect(() => {
    calculate_farm();
  }, [landCount])

  return (
    <Common_Layout>
      <Component_mapList
        mainmenu={"마이페이지"}
        submenu={"농지 전체보기"}
        isShowDltBtn={true}
        setSearchAddr={setSearchAddrr}
      //setTotalArea={setTotalArea} // 총 면적 전달
      //setLandCount={setLandCount} // 필지 개수 전달
      >
        <InsertBox>
          <div className="title">농지 전체보기</div>

          <DataBox>
            <Icon src={require("../../../img/icon_area.png")} />
            <TitleBox>
              <div className="subtitle">총 면적</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{totalArea}㎡</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_plant_rate.png")} />
            <TitleBox>
              <div className="subtitle">작물 비율</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{plantRate}</div>
          </DataBox>
          <DataBox>
            <Icon src={require("../../../img/icon_area_count.png")} />
            <TitleBox>
              <div className="subtitle">농지 개수</div>
              <div className="hightLight" />
            </TitleBox>

            <div>{landCount}필지</div>
          </DataBox>
        </InsertBox>
      </Component_mapList>
    </Common_Layout>
  );
};

export default Farmland_All;

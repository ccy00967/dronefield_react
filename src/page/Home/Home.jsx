import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  Icon,
  RowView,
} from "../../Component/common_style";
import { InsertRefreshAccessToken, refreshAccessToken } from "../../Api/Farmer";
import { Section1, Section2, HomePic, Text, SectionLast, Section3 } from "./HomeCss"
import Login from "./Login";




const Home = () => {
  return (
    <Common_Layout>
      <Section1>
        <HomePic src={require("../../img/home1.png")} />

        <RowView className="content">
          <CenterView className="flex">

            <div>
              
              <div className="large">디지털 농업의 시작</div>
              <div className="xxlarge">드론평야</div>
              <div className="small">
                4차 산업혁명의 시대! 디지털 농업의 시작!
                <br />첫 걸음을 드론평야에서 경험해 보세요.
              </div>
              <RowView>
                <div className="large">
                  농업인<br/>
                  <Icon
                    className="pointer"
                    src={require("../../img/store_google.png")}
                    onClick={() => { window.alert('농업인 app') }}
                  />
                </div>
                <div style={{ margin: 10 ,}} className="large">
                  드론 조종사<br/>
                  <Icon
                    className="pointer"
                    src={require("../../img/store_google.png")}
                    onClick={() => { window.alert('드론 조종사 app') }}
                  />
                </div>
              </RowView>
            </div>
          </CenterView>
          <CenterView className="flex">
            <Login />
          </CenterView>
        </RowView>
      </Section1>

      <Section3>
        <CenterView className="flex">
          <Text>
            <div>
              <div className="green">마이페이지∙맞춤형 솔루션</div>
              <br />
              <div className="xlarge">
                많은 농지
                <br />
                효율적으로
                <br />
                한눈에 조회, 한곳에 관리
              </div>
            </div>
          </Text>
        </CenterView>
        <CenterView className="flex">
          <Icon src={require("../../img/home2.png")} />
        </CenterView>
      </Section3>

      <Section1>
        <HomePic src={require("../../img/home3.png")} />

        <RowView className="content">
          <Text className="flex">
            <div>
              <div className="green">방제 신청∙방제신청 이용목록</div>
              <br />
              <div className="xlarge">
                드론방제,
                <br />
                시작부터 마무리까지
                <br />
                깔끔하게
              </div>
            </div>
          </Text>
          <CenterView className="flex" />
        </RowView>
      </Section1>

      {/* <Section2>
        <CenterView className="flex">
          <Text>
            <div>
              <div className="green">농지분석신청∙농지분석 이용목록</div>
              <br />
              <div className="xlarge">
                자라나는 작물
                <br />
                디지털 분석으로
                <br />
                한층 더 업그레이드
              </div>
            </div>
          </Text>
        </CenterView>
        <CenterView className="flex">
          <Icon src={require("../../img/home4.png")} />
        </CenterView>
      </Section2> */}

      <Section2 style={{ margin: 50 }}>
        <div className="flex">
          <Text>
            <div className="green">준비 중인 제품 및 서비스ㅤ </div>
          </Text>
        </div>
        <div className="flex" />
      </Section2>

      <SectionLast>
        <RowView className="top">
          <CenterView>
            <Icon src={require("../../img/icon_AI.png")} />
            <div className="title">AI</div>
            <div>∙PIX4D 프로그램</div>
            <div>∙농지분석데이터</div>
            <div>∙지표화 인공지능</div>
          </CenterView>
          <CenterView>
            <Icon src={require("../../img/icon_drone1.png")} />
            <div className="title">드론(비행체)</div>
            <div>∙무인스테이션</div>
          </CenterView>
          <CenterView>
            <Icon src={require("../../img/icon_drone2.png")} />
            <div className="title">드론(지상체)</div>
            <div>∙레이저잡초제거</div>
          </CenterView>
        </RowView>
      </SectionLast>
    </Common_Layout>
  );
};
export default Home;

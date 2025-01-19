import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./Component/Route/PrivateRoute";
import { useUser } from "./Component/userContext";

import Home from "./page/Home/Home";
import CompanyInfo from "./page/TopMenuPage/CompanyInfo";
import ServiceInfo from "./page/TopMenuPage/ServiceInfo";
import CS from "./page/TopMenuPage/CS";
import CS_insert from "./page/TopMenuPage/CS_insert";
import CS_detail from "./page/TopMenuPage/CS_detail";
// 회원가입
import SignUp_Login from "./page/SignUp/Login";
import Rules from "./page/SignUp/Rules";
import Rule_Modal from "./page/SignUp/Rule_Modal";
import SignUp from "./page/SignUp/SignUp";
import FindID from "./page/SignUp/FindID";
import FindPW from "./page/SignUp/FindPW";
//
import MainMenu from "./page/Menu/Home";
import MyInfo from "./page/Menu/MyInfo";
// 농업인
import Farmland_All from "./page/Menu/Farmer/Farmland_All";
import Farmland_Insert from "./page/Menu/Farmer/Farmland_Insert";
import PestControl_apply from "./page/Menu/Farmer/PestControl_apply";
import PestControl_useList from "./page/Menu/Farmer/PestControl_useList";
import FarmlandAnalyze_apply from "./page/Menu/Farmer/FarmlandAnalyze_apply";
import FarmlandAnalyze_useList from "./page/Menu/Farmer/FarmlandAnalyze_useList";
// 드론조종사
import Matching from "./page/Menu/DronePilot/Matching";
import WorkStatus from "./page/Menu/DronePilot/WorkStatus";
import Adjustment from "./page/Menu/DronePilot/Adjustment";
// 농약상
import Inventory_manage from "./page/Menu/PesticideDealer/Inventory_manage";
import WorkStatus2 from "./page/Menu/PesticideDealer/WorkStatus";
import Adjustment2 from "./page/Menu/PesticideDealer/Adjustment";
import { PaymentSuccessPage } from "./page/tosspayments/PaymentSuccessPage";
import { PaymentFailPage } from "./page/tosspayments/PaymentFailPage";
import NicePassPopUp from "./page/SignUp/NicePassPopUp";
import PaymentPending from "./page/Menu/Farmer/PaymentPending";
import RefundList from "./page/Menu/Farmer/RefundList";


function App() {
  const { isLogin, User_Credential } = useUser();
  const userType = User_Credential.userType;
  const accessType1 = userType === "농업인";
  const accessType2 = userType === "드론조종사";
  const accessType3 = userType === "농약상";

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CompanyInfo" element={<CompanyInfo />} />
      <Route path="/ServiceInfo" element={<ServiceInfo />} />
      <Route path="/Cs">
        <Route index element={<CS />} />
        <Route path="insert" element={<CS_insert />} />
        <Route path="detail/:seq" element={<CS_detail />} />
      </Route>

      <Route path="/SignUp">
        <Route index element={<SignUp />} />
        <Route path="rules" element={<Rules />} />
        <Route path="tos/:type" element={<Rule_Modal />} />
        <Route path="login" element={<SignUp_Login />} />
        <Route path="nicepass" element={<NicePassPopUp />} />
      </Route>
      <Route path="/FindID" element={<FindID />} />
      <Route path="/FindPW" element={<FindPW />} />

      <Route
        path="/menu"
        element={<PrivateRoute isLogin={isLogin} component={MainMenu} />}
      />
      <Route
        path="/myInfo"
        element={<PrivateRoute isLogin={isLogin} component={MyInfo} />}
      />

      {/* 농업인 메뉴 - 마이페이지 */}
      <Route path="/mypage">
        <Route
          path="insert"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={Farmland_Insert}
            />
          }
        />
        <Route
          path="all"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={Farmland_All}
            />
          }
        />
      </Route>

      {/* 방제 */}
      <Route path="/pestcontrol">
        <Route
          path="apply"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={PestControl_apply}
            />
          }
        />
        <Route
          path="uselist"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={PestControl_useList}
            />
          }
        />
        {/* 결제대기 */}
        <Route
          path="payment-pending"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={PaymentPending}
            />
          }
        />
        {/* 환불목록 */}
        <Route
          path="refund-list"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={RefundList}
            />
          }
        />
      </Route>

      {/* 농지분석 */}
      <Route path="/analysis">
        <Route
          path="apply"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={FarmlandAnalyze_apply}
            />
          }
        />
        <Route
          path="uselist"
          element={
            <PrivateRoute
              isLogin={isLogin}
              isAccess={accessType1}
              component={FarmlandAnalyze_useList}
            />
          }
        />
      </Route>

      {/* 드론조종사 메뉴 */}
      <Route
        path="/matching"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType2}
            component={Matching}
          />
        }
      />
      <Route
        path="/workstatus"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType2}
            component={WorkStatus}
          />
        }
      />
      <Route
        path="/adjustment"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType2}
            component={Adjustment}
          />
        }
      />

      {/* 농약상 메뉴 */}
      <Route
        path="/inventory"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType3}
            component={Inventory_manage}
          />
        }
      />
      <Route
        path="/workstatus2"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType3}
            component={WorkStatus2}
          />
        }
      />
      <Route
        path="/adjustment2"
        element={
          <PrivateRoute
            isLogin={isLogin}
            isAccess={accessType3}
            component={Adjustment2}
          />
        }
      />

      {/* 토스 리다이렉트 페이지 */}
      <Route
        path="/success"
        element={<PrivateRoute isLogin={isLogin} component={PaymentSuccessPage} />}
      />
      <Route
        path="/fail"
        element={<PrivateRoute isLogin={isLogin} component={PaymentFailPage} />}
      />
    </Routes>
  );
}

export default App;

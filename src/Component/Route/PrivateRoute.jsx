import React from "react";
import { Navigate } from "react-router-dom";

// 로그인/비로그인 판별 후 페이지 이동 로직
const PrivateRoute = ({ isLogin, isAccess = true, component: Component }) => {
  // isLogin - true: 로그인 / false: 비로그인
  // isAccess - true: 접근허용 / false: 접근 비허용
  const accessible = isAccess;

  // isLogin 혹은 isAccess 기 false면 홈으로
  return isLogin && accessible ? <Component /> : <Navigate to="/" replace />;
};

export default PrivateRoute;

import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

// 전역변수 설정
export function UserProvider({ children }) {
  // 로그인 성공 후 유저정보를 로컬스토리지에 'User_Credential'라는 key로 저장 및 전역변수에 저장
  // page > Home > Login.jsx - Login() 참고
  const local_saved_info = localStorage.getItem("User_Credential");
  const [User_Credential, setUser_info] = useState(
    local_saved_info
      ? JSON.parse(local_saved_info)
      : {
        access_token: "",
        refresh_token: "",
        userType: "",
        uuid: "",
      }
  );
  // 임시 로그인 판별 : userType이 빈값이 아닐 시 로그인 중
  const isLogin = User_Credential.userType !== "";

  return (
    <UserContext.Provider
      value={{
        User_Credential,
        setUser_info,
        isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

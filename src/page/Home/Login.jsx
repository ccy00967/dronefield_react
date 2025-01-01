import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
//import axios from "axios";
import {
  GreenColor,
  hoverGreen,
  RowView,
  RowView2,
} from "../../Component/common_style";
import { LoginBox,TypeBox,InputBox,Btn,TextBtn,TextLogin } from "./HomeCss";
import { useUser } from "../../Component/userContext";
import { server } from "../url";



const UserInfoData = {
  "name": "비정상 로그인",
  "birth": "2000-11-11",
  "gender": "1",
  "nationalinfo": "0",
  "mobileco": null,
  "phone_number": "10100010001",
  "email": "ccy09671324@gmail.com",
  "role": 3,
  "address": {
    "id": 1,
    "roadaddress": "도로명 주소 넣기",
    "jibunAddress": "지번 주소 넣기",
    "englishAddress": "영어 주소 넣기",
    "navermapsx": "1234",
    "navermapsy": "1234",
    "detailAddress": ""
  }
}

const Login = (props) => {
  const Navigate = useNavigate();
  const { isLogin, User_Credential, setUser_info } = useUser();
  // 회원가입 버튼 보여줄지 말지
  const signUpNone = props.signUpNone;

  const [userType, setUserType] = useState("농업인");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  // 유저 정보
  const [userInfo, setUserInfo] = useState(UserInfoData)

  const setting_type1 = () => setUserType("농업인");
  const setting_type2 = () => setUserType("드론조종사");
  const setting_type3 = () => setUserType("농약상");
  const setting_email = (e) => setEmail(e.target.value);
  const setting_password = (e) => setPassword(e.target.value);

  const typeCss = (type) => {
    if (userType === type) return "this";
    return "";
  };

  const fetchUserInfo = async (uuid, accessToken) => {
    const res = await fetch(server + `/user/userinfo/${uuid}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      },
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  };

  const Login_API = async () => {
    if (email == "" || password == "") alert("이메일 또는 비밀번호를 입력해주세요")
    else {
      const res = await fetch(server + '/user/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const userCredential = {
          userType: userType,
          access_token: data.access,
          refresh_token: data.refresh,
          uuid: data.uuid,
        };

        const userInfoData = await fetchUserInfo(userCredential.uuid, userCredential.access_token);

        if (userInfoData.role == 3) {
          if (userType !== "드론조종사") {
            alert("방제사로 로그인 해주세요")
            return
          }
        }
        if (userInfoData.role == 4) {
          if (userType !== "농업인") {
            alert("농업인으로 로그인 해주세요")
            return
          }
        }
        setUser_info(userCredential);
        localStorage.setItem("User_Credential", JSON.stringify(userCredential));
        setUserInfo(userInfoData);
      }
      else {
        if (res.status === 400) {
          const data = await res.json();
          alert(data.non_field_errors)
        }
        if (res.status === 500) {
          alert("아이디와 비밀번호를 다시 확인해주세요!")
        }
      }
    }
  };

  const Set_User_info = async () => {
    if (User_Credential && User_Credential.uuid) {
      const userInfoData = await fetchUserInfo(User_Credential.uuid, User_Credential.access_token);
      setUserInfo(userInfoData);
    }
  };

  const enterPress = (e) => {
    if (e.key === "Enter") {
      Login_API();
    }
  };

  useEffect(() => {
    const storedCredentials = JSON.parse(localStorage.getItem("User_Credential"));
    if (storedCredentials) {
      setUser_info(storedCredentials);
      Set_User_info();
    }
  }, [setUser_info]);

  const goFindEmail = () => Navigate("/findID");
  const goFindPassword = () => Navigate("/findPW");
  const goSignUp = () => Navigate("/signUp");
  const goSeriveStart = () => Navigate("/menu");

  return (
    <LoginBox>
      {isLogin ? (
        <>
          <TextLogin>
            <span> {userInfo.name} </span>
            {User_Credential.userType}님,
            <br />
            안녕하세요!
          </TextLogin>
          <Btn className="green" onClick={goSeriveStart}>
            서비스 시작하기
          </Btn>
        </>
      ) : (
        <>
          <RowView>
            <TypeBox
              className={`left ${typeCss("농업인")}`}
              onClick={setting_type1}
            >
              농업인
            </TypeBox>
            <TypeBox
              className={`right ${typeCss("드론조종사")}`}
              onClick={setting_type2}
            >
              드론조종사
            </TypeBox>
            {/* <TypeBox
              className={`right ${typeCss("농약상")}`}
              onClick={setting_type3}
            >
              농약상
            </TypeBox> */}
          </RowView>

          <div className="label">아이디</div>
          <InputBox
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={setting_email}
            onKeyPress={(e) => enterPress(e)}
          />

          <div className="label">비밀번호</div>
          <InputBox
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            maxLength={16}
            onChange={setting_password}
            onKeyPress={(e) => enterPress(e)}
          />

          <TextBtn className="end">
            <span onClick={goFindEmail}>아이디 찾기 </span>
            <div className="bar" />
            <span onClick={goFindPassword}> 비밀번호 찾기</span>
          </TextBtn>

          <Btn className="green" onClick={Login_API}>
            로그인
          </Btn>
          {!signUpNone && (
            <Btn className="gray" onClick={goSignUp}>
              회원가입
            </Btn>
          )}
        </>
      )}
    </LoginBox>
  );
};
export default Login;

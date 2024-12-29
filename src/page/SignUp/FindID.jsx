import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  lightGreenColor,
} from "../../Component/common_style";

const FindBox = styled(CenterView)`
  box-sizing: border-box;
  padding: 20rem 1rem;
  div.title {
    font-family: var(--font-Pretendard-Medium);
    width: 100%;
    max-width: 35rem;
    font-size: 28px;
    margin-bottom: 2rem;
  }
  div.text {
    width: 100%;
    max-width: 35rem;
  }
`;
const Btn = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 35rem;
  padding: 1rem 0rem;
  margin-top: 0.5rem;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  &.light {
    color: ${GreenColor};
    background-color: ${lightGreenColor};
    &:hover {
      background-color: #c4e6d2;
    }
  }
  &.green {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;
const IDBOX = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 20rem;
  padding: 1rem;
  margin: 2rem 0rem;
  font-size: 22px;
  text-align: center;
  word-break: break-all;
  background-color: #f8f8f8;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;

const FindID = () => {
  const Navigate = useNavigate();
  const [name, setName] = useState("홍길동");
  const [email, setEmail] = useState("testsdfsdfsdf@naver.com");
  const [findOk, setFindOk] = useState(false);

  const go_home = () => Navigate("/");
  const PASS_API = () => {
    setFindOk(true);
  };

  return (
    <Common_Layout minWidth={1}>
      <FindBox className="col">
        <div className="title">아이디 찾기</div>

        {findOk ? (
          <>
            <div className="text">{name}님의 정보와 일치하는 아이디입니다.</div>
            <IDBOX>{email}</IDBOX>
            <Btn className="green" onClick={go_home}>
              로그인하러 가기
            </Btn>
          </>
        ) : (
          <>
            <div className="text">아이디 찾기</div>
            <Btn className="light" onClick={PASS_API}>
              본인인증하기
            </Btn>
          </>
        )}
      </FindBox>
    </Common_Layout>
  );
};

export default FindID;

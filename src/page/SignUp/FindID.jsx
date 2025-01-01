import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Common_Layout from "../../Component/common_Layout";
import { FindBox, IDBOX, Btn } from "./css/FindIDCss";


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

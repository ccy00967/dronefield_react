import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Common_Layout from "../../Component/common_Layout";
import {
  CenterView,
  Icon,
  lightRedColor,
  redColor,
  RowView,
  RowView2,
} from "../../Component/common_style";

const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  margin: 0rem auto;
`;
const Page = styled.div`
  margin-bottom: 2rem;
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
`;
const Headers = styled(RowView2)`
  border-top: 1px solid #f0f0f0;
  &.last {
    border-bottom: 1px solid #f0f0f0;
  }
  div.title {
    width: 5rem;
    text-align: center;
    padding: 1rem 0rem;
    background-color: #f8f8f8;
  }
  div.content {
    flex: 1;
    margin-left: 1.5rem;
  }
`;
const Content = styled.div`
  padding: 2rem 0rem;
  white-space: pre-line;
`;
const ImgBox = styled.img`
  max-width: 100%;
  margin: 1rem 0rem;
`;
const Btn = styled.div`
  padding: 0.8rem 2.4rem;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${redColor};
  background-color: ${lightRedColor};
  border-radius: 8px;
  cursor: pointer;
`;
const ReplyHeader = styled(RowView2)`
  margin-top: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  font-family: var(--font-Pretendard-Medium);
  img {
    margin-right: 5px;
  }
`;
const ReplyName = styled(RowView2)`
  margin-bottom: 1rem;
  div {
    margin-right: 5px;
    font-family: var(--font-Pretendard-Medium);
  }
  span {
    font-size: 14px;
    color: gray;
  }
`;
const Reply = styled.div`
  padding: 1rem 0 0 1rem;
  border-bottom: 1px solid #f0f0f0;
  div.content {
    white-space: pre-line;
  }
  div.end {
    margin: 1rem;
  }
  span {
    color: gray;
    cursor: pointer;
  }
`;
const ReReply = styled(RowView2)`
  div.rereply {
    flex: 1;
    padding: 1rem 1rem 0rem 1rem;
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
  }
  div.insert {
    padding: 1rem;
    width: 100%;
    height: 5rem;
    border-top: 1px solid #f0f0f0;
    background-color: #f8f8f8;
  }
  div.insertBtn {
    width: 5rem;
    height: 100%;
    height: 5rem;
    margin-left: 0.5rem;
    background-color: white;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const InsertBox = styled(RowView)`
  height: 6rem;
  padding: 1rem;
  margin-top: 2rem;
  background-color: #f8f8f8;
  div {
    width: 5rem;
    height: 100%;
    margin-left: 0.5rem;
    background-color: white;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    cursor: pointer;
  }
`;
const TextareaBox = styled.textarea`
  flex: 1;
  box-sizing: border-box;
  padding: 1rem;
  height: 100%;
  resize: none;
  font-family: var(--font-Pretendard-Regular);
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  outline: 0;
  &:focus {
    border: 1px solid #454545;
  }
`;

const CS_detail = () => {
  const { seq } = useParams();
  const [title, setTitle] = useState("비밀번호 변경은 어떻게 하나요?");
  const [writer, setWriter] = useState("홍길동");
  const [date, setDate] = useState("2020.02.02");
  const [content, setContent] = useState(
    "안녕하세요 문의드립니다.\n반갑습니다. "
  );
  const [imgList, setImgList] = useState(
    new Array(5).fill(
      "https://pimg3.daara.co.kr/kidd/photo/2024/01/03/thumbs/thumb_520390_1704270934_63.jpg"
    )
  );
  const [replyList, setReplyList] = useState(new Array(2).fill(""));

  // 답글 달 댓글
  const [selectReply, setSelectReply] = useState("");

  const delete_API = () => {
    alert("삭제");
  };
  const reply_insert_API = () => {
    alert("댓글등록");
  };
  const rereply_insert_API = () => {
    alert("답글");
  };

  return (
    <Common_Layout minWidth={1} topMenu={"고객센터"}>
      <ContentArea>
        <Page>고객문의게시판</Page>

        <Headers>
          <div className="title">제목</div>
          <div className="content">{title}</div>
        </Headers>
        <Headers>
          <div className="title">작성자</div>
          <div className="content">{writer}</div>
        </Headers>
        <Headers className="last">
          <div className="title">작성일</div>
          <div className="content">{date}</div>
        </Headers>

        <Content>
          {content}
          해당 게시글은 {seq}번 글입니다.
          {imgList.map((pic, idx) => {
            return <ImgBox key={idx} src={pic} />;
          })}
        </Content>

        <RowView2 className="end">
          <Btn onClick={delete_API}>삭제하기</Btn>
        </RowView2>

        <ReplyHeader>
          <Icon src={require("../../img/icon_reply.png")} />
          <div>댓글 (3) </div>
        </ReplyHeader>

        {replyList.map((data, idx) => {
          return (
            <Reply key={idx}>
              <ReplyName>
                <div>홍드론</div>
                <span>(2020.02.02. 24:02:00)</span>
              </ReplyName>

              <div className="content">
                안녕하세요. 혿으론 관리자 입니다. 비밀번호 찾기는
                재설정가능합니다.
              </div>

              <RowView2 className="end">
                <span className="btn" onClick={() => setSelectReply(idx)}>
                  답글
                </span>
              </RowView2>

              {idx === 0 && (
                <ReReply className="top">
                  <Icon src={require("../../img/icon_rereply.png")} />
                  <div className="rereply">
                    <ReplyName>
                      <div>홍드론</div>
                      <span>(2020.02.02. 24:02:00)</span>
                    </ReplyName>

                    <div>감사합니다!</div>

                    <RowView2 className="end">
                      <span className="btn" onClick={() => setSelectReply(idx)}>
                        답글
                      </span>
                    </RowView2>
                  </div>
                </ReReply>
              )}

              {selectReply === idx && (
                <ReReply className="top">
                  <Icon src={require("../../img/icon_rereply.png")} />
                  <RowView className="insert">
                    <TextareaBox placeholder="댓글 내용을 입력해주세요." />
                    <CenterView
                      className="insertBtn"
                      onClick={rereply_insert_API}
                    >
                      등록
                    </CenterView>
                  </RowView>
                </ReReply>
              )}
            </Reply>
          );
        })}

        <InsertBox>
          <TextareaBox placeholder="댓글 내용을 입력해주세요." />
          <CenterView onClick={reply_insert_API}>등록</CenterView>
        </InsertBox>
      </ContentArea>
    </Common_Layout>
  );
};

export default CS_detail;

import { useState } from "react";
import { useParams } from "react-router-dom";
import Common_Layout from "../../../Component/common_Layout";
import {
    CenterView,
    Icon,
    RowView,
    RowView2,
} from "../../../Component/common_style";
import {
    ContentArea,
    Page,
    Headers,
    Content,
    ImgBox,
    Btn,
    ReplyHeader,
    ReplyName,
    Reply,
    ReReply,
    InsertBox,
    TextareaBox,
} from "../css/CS_detailCss";

const Notice_detail = () => {
    const { seq } = useParams();
    const [title, setTitle] = useState("[공지사항] 서비스 점검 안내");
    const [writer, setWriter] = useState("관리자");
    const [date, setDate] = useState("2025년 1월 28일");
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
                <Page>공지사항</Page>

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
                    <h1 class="notice-title">[공지사항] 서비스 점검 안내</h1>
                    <div class="notice-content">
                        <p>안녕하세요, 고객님.</p>
                        <p>
                            더 나은 서비스 제공을 위해 아래 일정으로 시스템 점검이 진행될 예정입니다.
                        </p>
                        <ul>
                            <li><span class="notice-highlight">점검 일시:</span> 2025년 1월 28일(월) 00:00 ~ 05:00</li>
                            <li><span class="notice-highlight">영향 범위:</span> 점검 시간 동안 일부 서비스 이용이 제한될 수 있습니다.</li>
                        </ul>
                        <p>
                            고객 여러분께 불편을 드려 죄송하며, 더 나은 서비스를 제공하기 위해
                            노력하겠습니다.
                        </p>
                        <p>감사합니다.</p>
                    </div>
                    <div class="footer">
                        © 2025 Your Company Name. All rights reserved.
                    </div>
                    {/* {imgList.map((pic, idx) => {
            return <ImgBox key={idx} src={pic} />;
          })} */}
                </Content>

                {/* <RowView2 className="end">
          <Btn onClick={delete_API}>삭제하기</Btn>
        </RowView2> */}

                {/* <ReplyHeader>
          <Icon src={require("../../../img/icon_reply.png")} />
          <div>댓글 (3) </div>
        </ReplyHeader> */}

                {/* {replyList.map((data, idx) => {
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
                  <Icon src={require("../../../img/icon_rereply.png")} />
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
                  <Icon src={require("../../../img/icon_rereply.png")} />
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
        })} */}

                {/* <InsertBox>
          <TextareaBox placeholder="댓글 내용을 입력해주세요." />
          <CenterView onClick={reply_insert_API}>등록</CenterView>
        </InsertBox> */}
            </ContentArea>
        </Common_Layout>
    );
};

export default Notice_detail;

import styled from "styled-components";
import {
    lightRedColor,
    redColor,
    RowView, RowView2
} from "../../../Component/common_style";

export const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  margin: 0rem auto;
`;
export const Page = styled.div`
  margin-bottom: 2rem;
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
`;
export const Headers = styled(RowView2)`
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
export const Content = styled.div`
  padding: 2rem 0rem;
  white-space: pre-line;
`;
export const ImgBox = styled.img`
  max-width: 100%;
  margin: 1rem 0rem;
`;
export const Btn = styled.div`
  padding: 0.8rem 2.4rem;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${redColor};
  background-color: ${lightRedColor};
  border-radius: 8px;
  cursor: pointer;
`;
export const ReplyHeader = styled(RowView2)`
  margin-top: 3rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
  font-family: var(--font-Pretendard-Medium);
  img {
    margin-right: 5px;
  }
`;
export const ReplyName = styled(RowView2)`
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
export const Reply = styled.div`
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
export const ReReply = styled(RowView2)`
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
export const InsertBox = styled(RowView)`
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
export const TextareaBox = styled.textarea`
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

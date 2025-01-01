import styled from "styled-components";
import {
    CenterView,
    GreenColor,
    hoverGreen,
    Icon,
    RowView2
} from "../../../Component/common_style";

export const ContentArea = styled.div`k
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  margin: 0rem auto;
  div.title {
    margin-bottom: 2rem;
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subTitle {
    margin: 1rem 0 0.5rem 0;
    font-family: var(--font-Pretendard-Medium);
  }
  input,
  textarea {
    font-size: 16px;
    font-family: var(--font-Pretendard-Regular);
  }
`;
export const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
`;
export const TextAreaBox = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  height: 20rem;
  padding: 1rem;
  resize: none;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid #454545;
  }
`;
export const Btn = styled.div`
  padding: 1rem 3rem;
  margin-top: 1rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;
export const PicArea = styled(RowView2)`
  flex-wrap: wrap;
  width: 100%;
`;
export const PicBox = styled(CenterView)`
  position: relative;
  width: 7rem;
  min-width: 7rem;
  height: 7rem;
  margin-right: 0.7rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  object-fit: cover;
  overflow: hidden;
  &.btn {
    background-color: #f2f2f2;
    border: 1px solid #e7e7e7;
    cursor: pointer;
  }
  &.none {
    display: none;
  }
`;
export const Pic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const DeletBtn = styled(Icon)`
  position: absolute;
  top: 0%;
  right: 0%;
  margin: 0.5rem;
  cursor: pointer;
`;

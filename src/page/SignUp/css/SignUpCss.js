import styled from "styled-components";
import {
  blueColor,
  CenterView,
  GreenColor,
  hoverGreen,
  lightGreenColor,
  redColor,
} from "../../../Component/common_style";


export const LoginBox = styled(CenterView)`
  width: 100%;
  max-width: 40rem;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin: 2rem auto 8rem auto;
  div {
    width: 100%;
  }
  div.pageName {
    font-family: var(--font-Pretendard-Medium);
    font-size: 28px;
    margin-bottom: 1rem;
  }
  div.title {
    font-family: var(--font-Pretendard-Medium);
    margin: 1.5rem 0rem 0.5rem 0rem;
  }
`;
export const AlertText = styled.div`
  font-size: 14px;
  margin-top: 0.5rem;
  margin-left: 2rem;
  color: gray;
  &.no {
    color: ${redColor};
  }
  &.ok {
    color: ${blueColor};
  }
`;
export const TypeBox = styled(CenterView)`
  width: 30%;
  padding: 1rem 0rem;
  color: gray;
  text-align: center;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  &.center {
    margin: 0rem 0.5rem;
  }
  &.this {
    color: ${GreenColor};
    font-family: var(--font-Pretendard-SemiBold);
    border: 1px solid ${lightGreenColor};
    background-color: ${lightGreenColor};
  }
  img {
    margin-left: 3px;
  }
`;
export const InputBox = styled.input`
  flex: 1;
  padding: 1rem;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
  }
  &.no {
    border: 1px solid ${redColor};
  }
`;
export const TmpPASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c4e6d2;
  }
`;
export const Btn = styled.span`
  width: 9rem;
  padding: 1rem 0rem;
  margin-left: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${hoverGreen};
  }
  &.signUp {
    width: 100%;
    max-width: 40rem;
    margin: 3rem 0rem;
  }
`;


import styled from "styled-components";
import {
  CenterView,
  GreenColor,
  hoverGreen,
} from "../../../Component/common_style";

export const FindBox = styled(CenterView)`
  box-sizing: border-box;
  padding: 15rem 1rem;
  div.title {
    font-family: var(--font-Pretendard-Medium);
    width: 100%;
    max-width: 35rem;
    font-size: 28px;
    margin-bottom: 2rem;
  }
  div.text {
    font-family: var(--font-Pretendard-Medium);
    width: 100%;
    max-width: 35rem;
    margin-bottom: 0.5rem;
  }
  span {
    color: #858585;
    font-size: 14px;
    width: 100%;
    max-width: 35rem;
    padding-left: 2rem;
    margin-bottom: 1.5rem;
  }
`;
export const InputBox = styled.input`
  box-sizing: border-box;
  flex: 1;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 16px;
  border: 1px solid #f0f0f0;
  outline: 0;
  border-radius: 8px;
  &.none {
    margin: 0;
  }
`;
export const MiniBtn = styled.div`
  box-sizing: border-box;
  width: 8rem;
  padding: 1rem 0rem;
  margin-bottom: 1rem;
  margin-left: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  border-radius: 8px;
  background-color: ${GreenColor};
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;
export const Btn = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 35rem;
  padding: 1rem 0rem;
  margin-top: 2em;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  border-radius: 8px;
  color: gray;
  background-color: #f8f8f8;
  &.ok {
    color: white;
    background-color: ${GreenColor};
    cursor: pointer;
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;


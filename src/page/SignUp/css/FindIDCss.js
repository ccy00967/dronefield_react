import styled from "styled-components";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  lightGreenColor,
} from "../../../Component/common_style";


export const FindBox = styled(CenterView)`
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
export const Btn = styled.div`
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
export const IDBOX = styled.div`
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

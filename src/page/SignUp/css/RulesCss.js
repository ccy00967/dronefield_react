import styled from "styled-components";
import {
  CenterView,
  GreenColor,
  hoverGreen,
  RowView,
  RowView2
} from "../../../Component/common_style";

export const LoginBox = styled(CenterView)`
  width: 100%;
  max-width: 30rem;
  box-sizing: border-box;
  padding: 0rem 1rem;
  margin: 10rem auto;
  div.pageName {
    flex-wrap: wrap;
    margin-bottom: 1rem;
    font-family: var(--font-Pretendard-Medium);
    font-size: 28px;
  }
  span.point {
    margin-left: 5px;
    color: ${GreenColor};
  }
`;
export const AllCheck = styled(RowView2)`
  box-sizing: border-box;
  width: 100%;
  padding: 0.7rem 1rem;
  margin: 1rem 0rem;
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  background-color: #f8f8f8;
  border-radius: 8px;
  cursor: pointer;
`;
export const CheckArea = styled(RowView)`
  width: 100%;
  box-sizing: border-box;
  width: 100%;
  padding: 0.3rem 1rem;
  div {
    cursor: pointer;
  }
  span {
    margin-left: 5px;
    font-size: 14px;
    color: #8e8e8e;
  }
`;
export const BtnArea = styled(RowView2)`
  width: 100%;
  font-family: var(--font-Pretendard-SemiBold);
  div {
    flex: 1;
    padding: 1rem 0rem;
    margin-top: 2rem;
    text-align: center;
    border-radius: 8px;
    cursor: pointer;
  }
  div.gray {
    margin-right: 1rem;
    color: gray;
    background-color: white;
    border: 1px solid #f0f0f0;
    transition: background-color 0.3s;
    &:hover {
      background-color: #f0f0f0;
    }
  }
  div.green {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
`;


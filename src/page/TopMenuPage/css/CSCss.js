import styled from "styled-components";

import { GreenColor, hoverGreen, lightGreenColor, RowView, RowView2 } from "../../../Component/common_style";

export const ContentArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 70rem;
  padding: 5rem 1rem;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.title > img {
    margin-left: 5px;
    cursor: pointer;
  }
`;
export const CSInfo = styled(RowView2)`
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  color: gray;
  span {
    margin-left: 0.5rem;
    font-family: var(--font-Pretendard-Medium);
    color: #1d1d1d;
  }
`;
export const SearchBar = styled(RowView2)`
  padding: 0rem 1rem;
  border: 1px solid
    ${(props) => (props.$isfocused === "on" ? "#454545" : "#eeeeee")};
  border-radius: 8px;
  transition: all 0.4s ease;
  img {
    padding: 0.5rem 0rem;
    cursor: pointer;
  }
`;
export const SearchSelect = styled.select`
  width: 3rem;
  padding: 0.5rem 0rem;
  font-size: 16px;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
`;
export const SearchInput = styled.input`
  box-sizing: border-box;
  width: 20rem;
  height: 2.5rem;
  padding-left: 1rem;
  font-size: 15px;
  border: 0px;
  outline: 0px;
  &::placeholder {
    font-size: 14px;
    color: darkgray;
  }
`;
export const TableHeader = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  text-align: center;
  span {
    width: 5rem;
    margin-right: 1rem;
  }
  div {
    flex: 1;
  }
  div.long {
    flex: 2;
  }
`;
export const TableList = styled(RowView)`
  height: 4rem;
  text-align: center;
  cursor: pointer;
  &.x2 {
    background-color: #f8f8f8;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  span {
    width: 5rem;
    margin-right: 1rem;
  }
  div {
    flex: 1;
  }
  div.long {
    flex: 2;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export const Btn = styled.div`
  padding: 1rem 3rem;
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
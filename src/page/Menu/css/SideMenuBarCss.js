import styled from "styled-components";
import {
  blueColor,
  GreenColor,
  lightBlueColor,
  lightGreenColor,
  lightRedColor,
  redColor,
  RowView2,
} from "../../../Component/common_style";


export const SideMenu = styled.div`
  padding-top: 1.5rem;
  width: 15.5rem;
  height: 100%;
  img {
    margin: 0 8px;
  }
  div.isMain {
    color: ${(props) =>
    props.$userType === "농업인"
      ? GreenColor
      : props.$userType === "드론조종사"
        ? blueColor
        : redColor};
    background-color: ${(props) =>
    props.$userType === "농업인"
      ? lightGreenColor
      : props.$userType === "드론조종사"
        ? lightBlueColor
        : lightRedColor};
  }
  div.isSub {
    color: ${(props) =>
    props.$userType === "농업인"
      ? GreenColor
      : props.$userType === "드론조종사"
        ? blueColor
        : redColor};
    font-family: var(--font-Pretendard-Medium);
  }
`;
export const MainMenuBox = styled(RowView2)`
  box-sizing: border-box;
  padding: 0.8rem 1rem;
  margin: 0.5rem 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  font-size: 18px;
  color: #8e8e8e;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
export const SubMenuBox = styled.div`
  height: 0;
  padding-left: 3.5rem;
  color: #8e8e8e;
  overflow: hidden;
  transition: height 0.4s;
  &.isOpen {
    margin-bottom: 2rem;
    height: ${(props) => `${props.$height}rem`};
  }
`;
export const Menu = styled.div`
  box-sizing: border-box;
  margin: 0.5rem 0rem;
  cursor: pointer;
`;


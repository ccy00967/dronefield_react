import styled from "styled-components";
import {
  blueColor,
  CenterView,
  GreenColor,
  hoverGreen,
  hoverRed,
  lightBlueColor,
  lightGreenColor,
  lightRedColor,
  redColor,
  RowView,
} from "../../../Component/common_style";


export const Container = styled(RowView)`
  align-items: flex-start;
`;
export const Container2 = styled.div`
display: flex;
flex-direction: column; /* 세로 배치 */
gap: 20px;
align-items: center;
width: 100%;
`;
export const Content = styled.div`
  flex: 1;
  padding: 2rem;
  padding-bottom: 10rem;
  min-height: 100%;
  border-left: 1px solid #f0f0f0;
  color: #1d1d1d;
  div.top {
    @media screen and (max-width: 1100px) {
      flex-direction: column;
    }
  }
`;
export const Title = styled.div`
  margin-bottom: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  font-size: ${(props) => `${props.$fontsize || 16}px`};
`;
export const InfoBox = styled.div`
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  padding: 1.5rem;
  margin-top: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  div.label {
    font-family: var(--font-Pretendard-Medium);
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
`;
export const InputBox = styled.input`
  box-sizing: border-box;
  flex: 1;
  width: 100%;
  padding: 1rem;
  margin-right: 1rem;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
`;
export const Btn = styled(CenterView)`
  width: ${(props) => (props.$width ? `${props.$width}rem` : "auto")};
  height: 3rem;
  margin-top: ${(props) => (props.$width ? 0 : "2rem")};
  border-radius: 8px;
  cursor: pointer;
  &.green {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
  &.blue {
    color: white;
    background-color: ${blueColor};
  }
  &.red {
    color: white;
    background-color: ${redColor};
  }
  &.greenlight {
    color: ${GreenColor};
    background-color: ${lightGreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
  &.bluelight {
    color: ${blueColor};
    background-color: ${lightBlueColor};
  }
  &.redlight {
    color: ${redColor};
    background-color: ${lightRedColor};
    &:hover {
      background-color: ${hoverRed};
    }
  }
`;


export const Btn2 = styled(CenterView)`
  width: ${(props) => (props.$width ? `${props.$width}rem` : "auto")};
  height: 3rem;
  margin-top: ${(props) => (props.$width ? 0 : "0.5rem")};
  border-radius: 8px;
  cursor: pointer;
  &.green {
    color: white;
    background-color: ${GreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
  &.blue {
    color: white;
    background-color: ${blueColor};
  }
  &.red {
    color: white;
    background-color: ${redColor};
  }
  &.greenlight {
    color: ${GreenColor};
    background-color: ${lightGreenColor};
    &:hover {
      background-color: ${hoverGreen};
    }
  }
  &.bluelight {
    color: ${blueColor};
    background-color: ${lightBlueColor};
  }
  &.redlight {
    color: ${redColor};
    background-color: ${lightRedColor};
    &:hover {
      background-color: ${hoverRed};
    }
  }
`;

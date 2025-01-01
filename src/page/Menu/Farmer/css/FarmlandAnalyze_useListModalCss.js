import styled from "styled-components";
import {redColor,RowView2,} from "../../../../Component/common_style";

export const ModalBox = styled.div`
box-sizing: border-box;
width: 100%;
max-width: 28rem;
padding: 1rem 1.5rem 2rem 1.5rem;
margin: auto 0rem;
background-color: white;
border-radius: 8px;
overflow: hidden;
`;

export const Hr = styled.div`
width: 100%;
height: 1px;
margin: 1.2rem 0rem;
background-color: #f0f0f0;
&.black {
  background-color: #1d1d1d;
}
`;

export const DataRow = styled(RowView2)`
align-items: flex-start;
margin-top: 0.7rem;
div {
  width: 4rem;
}
div.letter {
  letter-spacing: 7px;
}
div.gray {
  flex: 1;
  margin-left: 1rem;
  color: #555555;
}
div.bold {
  width: auto;
  margin-left: 1rem;
  color: #555555;
  font-family: var(--font-Pretendard-Bold);
}
`;

export const TextSemiBold = styled.div`
&.title {
  margin-bottom: 2rem;
}
font-size: ${(props) => `${props.$fontsize || 16}px`};
font-family: var(--font-Pretendard-SemiBold);
`;

export const TextMedium = styled.div`
  color: ${(props) => (props.$color ? redColor : "#1d1d1d")};
  font-size: ${(props) => `${props.$fontsize || 16}px`};
  font-family: var(--font-Pretendard-Medium);
  width: 4rem;
  &.auto {
    width: auto;
  }
`;
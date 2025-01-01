import styled from "styled-components";
import { CenterView, GreenColor, hoverGreen, hoverRed, lightGreenColor, lightRedColor, redColor, RowView } from "../../../../Component/common_style";

export const ContentArea = styled.div`
flex: 1;
padding: 2rem;
border-left: 1px solid #f0f0f0;
`;

export const MapArea = styled(CenterView)`
flex: 1.5;
height: 550px;
margin-top: 3rem;
background-color: #f0f0f0;
border-radius: 8px;
z-index: 1;
`;

export const TableHeader = styled(RowView)`
height: 4rem;
margin-top: 0.5rem;
background-color: ${lightGreenColor};
font-size: 18px;
font-family: var(--font-Pretendard-Medium);
div {
  text-align: center;
  flex: 1;
}
div.addr {
  flex: 2;
}
span {
  opacity: 0;
  cursor: default;
}
`;

export const TableList = styled(RowView)`
height: 4rem;
&.x2 {
  background-color: #f8f8f8;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
div {
  text-align: center;
  flex: 1;
}
div.addr {
  flex: 2;
}
`;

export const MiniBtn = styled.span`
margin: 0rem 1rem;
padding: 0.4rem 1rem;
font-family: var(--font-Pretendard-Medium);
border-radius: 4px;
cursor: pointer;
&.delete {
  color: ${redColor};
  background-color: ${lightRedColor};
  &:hover {
    background-color: ${hoverRed};
  }
}
&.select {
  color: white;
  background-color: ${GreenColor};
  &:hover {
    background-color: ${hoverGreen};
  }
}
`;

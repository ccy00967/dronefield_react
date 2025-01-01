import styled from "styled-components";
import { blueColor,CenterView,CheckBox,lightBlueColor,redColor,RowView,RowView2 } from "../../../../Component/common_style";


export const TextSemiBold = styled.div`
font-size: ${(props) => `${props.$size || 16}px`};
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
div.gray_w {
  width: auto;
  margin-left: 1rem;
  color: #555555;
}
`;

export const ContentArea = styled.div`
flex: 1;
padding: 2rem;
border-left: 1px solid #f0f0f0;
div.title > img {
  margin-left: 5px;
  cursor: pointer;
}
`;


export const FilterBox = styled(RowView2)`
margin-top: 2rem;
padding-bottom: 2rem;
border-bottom: 1px solid #f0f0f0;
select {
  width: 15rem;
  padding: 1rem 0rem;
  margin-right: 1rem;
  text-align: center;
  font-size: 20px;
  color: #8e8e8e;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
}
`;


export const SearchBox = styled.input`
box-sizing: border-box;
padding: 0.8rem 1rem;
margin-top: 2rem;
margin-bottom: 1rem;
width: 25rem;
font-size: 16px;
outline: 0;
border: 1px solid #f0f0f0;
border-radius: 8px;
&:focus {
  border: 1px solid #454545;
}
&::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
&::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
`;


export const Content = styled(RowView)`
div.table {
  flex: 1;
}
`;

export const TableHeader = styled(RowView)`
height: 3.8rem;
background-color: ${lightBlueColor};
font-size: 18px;
font-family: var(--font-Pretendard-Medium);
div {
  text-align: center;
  flex: 1;
}
div.long {
  flex: 2;
}
select {
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  background-color: ${lightBlueColor};
  border: 0;
  outline: 0;
  cursor: pointer;
}
input {
  margin-left: 2rem;
}
`;

export const TableList = styled(RowView)`
height: 3.8rem;
&.x2 {
  background-color: #f8f8f8;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
div {
  text-align: center;
  flex: 1;
}
div.long {
  flex: 2;
}
input {
  margin-left: 2rem;
}
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

export const Bill = styled(RowView)`
box-sizing: border-box;
width: 26rem;
height: 42.5rem;
padding: 1rem;
margin-left: 1rem;
border: 1px solid #f0f0f0;
border-radius: 8px;
div.btn {
  font-size: 14px;
  color: #555555;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0px 0px 4px #c6c6c6;
  cursor: pointer;
}
div.content {
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
}
`;

export const Btn = styled.div`
margin-top: 2rem;
padding: 0.8rem 0rem;
font-family: var(--font-Pretendard-SemiBold);
text-align: center;
color: white;
background-color: ${blueColor};
border-radius: 8px;
cursor: pointer;
`;


export const SearchBtn = styled.div`
  width: 8rem;
  padding: 1rem 0rem;
  margin-left: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${blueColor};
  border-radius: 8px;
  cursor: pointer;
`;

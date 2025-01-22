import styled from "styled-components";
import {
  GreenColor, hoverGreen, lightRedColor, redColor,
  lightGreenColor, hoverRed, RowView, CenterView, RowView2,
  blueColor, grayColor, yellowColor
} from "../../../../Component/common_style";



/** Menu/Farmer/Component_mapList */
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



/** Menu/Farmer/Farmland_All */

export const InsertBox = styled.div`
flex: 1;
margin-right: 2rem;
div.title {
  margin-bottom: 2rem;
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
`;

export const DataBox = styled(CenterView)`
flex-direction: column;
padding: 2rem 1rem;
margin-top: 1rem;
font-size: 20px;
border: 1px solid #f0f0f0;
border-radius: 8px;
`;

export const TitleBox = styled.div`
position: relative;
margin-bottom: 1rem;
div.subtitle {
  position: relative;
  z-index: 2;
  font-size: 22px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.hightLight {
  position: absolute;
  bottom: -25%;
  width: 100%;
  height: 1rem;
  background-color: ${lightGreenColor};
}
`;





/**Farmer/Farmland_Insert */

export const InsertBoxFarm = styled.div`
flex: 1;
margin-right: 2rem;

div.title {
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.subtitle {
  margin-top: 1rem;
  font-family: var(--font-Pretendard-Medium);
}
span {
  font-size: 14px;
  color: gray;
}
`;

export const InputBoxFarm = styled.input`
box-sizing: border-box;
width: 100%;
padding: 0.8rem 1rem;
margin: 0.5rem 0;
font-size: 16px;
outline: 0;
border: 1px solid #f0f0f0;
border-radius: 8px;
&:focus {
  border: 1px solid ${GreenColor};
}
`;

export const InputDiv = styled(RowView2)`
flex: 1;
box-sizing: border-box;
padding: 0.8rem 1rem;
margin-top: 0.5rem;
border: 1px solid;
border-color: ${(props) =>
    props.$isfocused === "on" ? GreenColor : "#f0f0f0"};
border-radius: 8px;
input {
  font-size: 16px;
  width: 75%;
  margin-right: 0.5rem;
  outline: 0;
  border: 0;
}
&.smallText {
  font-size: 14px;
  color: gray;
  border: 0;
  margin: 0;
  padding: 0.5rem 1rem;
}
`;

export const BtnFarm = styled.div`
padding: 1rem;
margin-top: 1rem;
font-family: var(--font-Pretendard-SemiBold);
text-align: center;
color: white;
background-color: ${GreenColor};
border-radius: 8px;
cursor: pointer;
&.small {
  margin: 0 0 0 1rem;
  padding: 0.8rem 1rem;
  width: 10rem;
}
&:hover {
  background-color: ${hoverGreen};
}
`;




/**Farmer/FarmlandAnalyze_apply */


export const InsertBox_apply = styled.div`
  flex: 1;
  margin-right: 2rem;
  div.title {
    font-size: 28px;
    font-family: var(--font-Pretendard-SemiBold);
  }
  div.subtitle {
    margin-top: 1rem;
    font-family: var(--font-Pretendard-Medium);
  }
  span {
    padding-left: 1rem;
    font-size: 14px;
    color: gray;
  }
`;



export const InputBox = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1rem;
  margin: 0.5rem 0;
  font-size: 16px;
  outline: 0;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  &:focus {
    border: 1px solid ${GreenColor};
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

export const DateBox = styled.div`
  flex: 1;
  padding: 1rem;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
`;

// const LightBtn = styled(CenterView)`
//   box-sizing: border-box;
//   width: 100%;
//   max-width: 10rem;
//   padding: 1rem;
//   margin-top: 0.5rem;
//   margin-right: 0.5rem;
//   text-align: center;
//   color: #8e8e8e;
//   border: 1px solid #f0f0f0;
//   border-radius: 8px;
//   cursor: pointer;
//   &.this {
//     font-family: var(--font-Pretendard-SemiBold);
//     color: ${GreenColor};
//     background-color: ${lightGreenColor};
//     border: 1px solid ${lightGreenColor};
//   }
// `;


export const Btn = styled.div`
  padding: 1rem 0.5rem; /* 위아래는 1rem, 좌우는 0.5rem */
  margin-top: 1rem;
  margin-left: auto; /* 왼쪽 여백을 자동으로 설정하여 오른쪽으로 밀기 */
  margin-right: 0; /* 오른쪽 여백 제거 */
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;

  /* 버튼 hover 효과 */
  &:hover {
    background-color: ${hoverGreen};
  }

  /* 버튼 너비를 작게 조정 */
  width: auto; /* 기본 크기 */
  max-width: 170px; /* 최대 너비 제한 */
`;





/**Farmer/PestControl_apply */

export const InsertBox_Farmland_Insert = styled.div`
flex: 1;
margin-right: 2rem;

div.title {
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.subtitle {
  margin-top: 1rem;
  font-family: var(--font-Pretendard-Medium);
}
span {
  font-size: 14px;
  color: gray;
}
`;

export const InputBox_Farmland_Insert = styled.input`
box-sizing: border-box;
width: 100%;
padding: 0.8rem 1rem;
margin: 0.5rem 0;
font-size: 16px;
outline: 0;
border: 1px solid #f0f0f0;
border-radius: 8px;
&:focus {
  border: 1px solid ${GreenColor};
}
`;

export const InputBox_Farmland_InsertModal = styled.input`
  box-sizing: border-box;
  width: 60%; /* 너비를 부모의 60%로 설정 */
  padding: 0.5rem 0.8rem; /* 내부 여백 */
  font-size: 14px; /* 텍스트 크기 */
  height: 36px; /* 입력 박스 높이 */
  border: 1px solid #dcdcdc; /* 테두리 색상 */
  border-radius: 6px; /* 모서리 둥글게 */
  margin-left: auto; /* Flexbox로 오른쪽 배치 */
  outline: 0;
  &::placeholder {
    color: #aaaaaa; /* Placeholder 색상 */
    font-size: 13px;
  }
  &:focus {
    border: 1px solid ${GreenColor}; /* 포커스 시 테두리 색상 */
    background-color: #f9fdf9; /* 포커스 시 배경색 */
  }
`;



export const InputDiv_Farmland_Insert = styled(RowView2)`
flex: 1;
box-sizing: border-box;
padding: 0.8rem 1rem;
margin-top: 0.5rem;
border: 1px solid;
border-color: ${(props) =>
    props.$isfocused === "on" ? GreenColor : "#f0f0f0"};
border-radius: 8px;
input {
  font-size: 16px;
  width: 75%;
  margin-right: 0.5rem;
  outline: 0;
  border: 0;
}
&.smallText {
  font-size: 14px;
  color: gray;
  border: 0;
  margin: 0;
  padding: 0.5rem 1rem;
}
`;

export const Btn_Farmland_Insert = styled.div`
padding: 1rem;
margin-top: 1rem;
font-family: var(--font-Pretendard-SemiBold);
text-align: center;
color: white;
background-color: ${GreenColor};
border-radius: 8px;
cursor: pointer;
&.small {
  margin: 0 0 0 1rem;
  padding: 0.8rem 1rem;
  width: 10rem;
}
&:hover {
  background-color: ${hoverGreen};
}
`;

export const ContentArea_Farm_useList = styled.div`
flex: 1;
padding: 2rem;
border-left: 1px solid #f0f0f0;
div.title {
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.title > img {
  margin-left: 5px;
  cursor: pointer;
}
`;


export const FilterBox = styled(RowView)`
margin: 2rem 0rem;
div {
  flex: 1;
  padding: 1rem 0rem;
  text-align: center;
  font-size: 20px;
  color: #8e8e8e;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
}
span {
  color: #d8d8d8;
  margin: 0rem 1rem;
}
div.this {
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
}
`;

export const TableHeader_Farm_useList = styled(RowView)`
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
  width: 6rem;
}
`;

export const TableList_Farm_useList = styled(RowView)`
height: 4rem;
cursor: pointer;
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

export const BtnArea = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1rem;
    border-radius: 4px;
  }
  span.gray {
    background-color: #8e8e8e;
    cursor: pointer;
  }
  span.blue {
    background-color: ${blueColor};
    cursor: pointer;
  }
`;


export const InsertBox_Pest_apply = styled.div`
flex: 1;
margin-right: 2rem;
div.title {
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.subtitle {
  margin-top: 1rem;
  font-family: var(--font-Pretendard-Medium);
}
span {
  padding-left: 1rem;
  font-size: 14px;
  color: gray;
}
`;

export const InputBox_Pest_apply = styled.input`
box-sizing: border-box;
width: 100%;
padding: 0.8rem 1rem;
margin: 0.5rem 0;
font-size: 16px;
outline: 0;
border: 1px solid #f0f0f0;
border-radius: 8px;
&:focus {
  border: 1px solid ${GreenColor};
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


export const DateBox_Pest_apply = styled.div`
flex: 1;
padding: 1rem;
margin: 0.5rem 0.5rem 0.5rem 0;
font-family: var(--font-Pretendard-SemiBold);
text-align: center;
color: ${GreenColor};
background-color: ${lightGreenColor};
border-radius: 8px;
  cursor: pointer;
&:hover {
  background-color: ${hoverGreen};
`;

export const LightBtn_Pest_apply = styled(CenterView)`
box-sizing: border-box;
width: 100%;
max-width: 10rem;
padding: 1rem;
margin-top: 0.5rem;
margin-right: 0.5rem;
text-align: center;
color: #8e8e8e;
border: 1px solid #f0f0f0;
border-radius: 8px;
cursor: pointer;
&:hover {
  background-color: #f0f0f0;
}
&.this {
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border: 1px solid ${lightGreenColor};
}
`;

export const Btn_Pest_apply = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  font-family: var(--font-Pretendard-SemiBold);
  text-align: center;
  color: white;
  background-color: ${GreenColor};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${hoverGreen};
  }
`;

export const ContentArea_Pest_useList = styled.div`
flex: 1;
padding: 2rem;
border-left: 1px solid #f0f0f0;
div.title {
  font-size: 28px;
  font-family: var(--font-Pretendard-SemiBold);
}
div.title > img {
  margin-left: 5px;
  cursor: pointer;
}
`;


export const FilterBox_Pest_useList = styled(RowView)`
margin: 2rem 0rem;
div {
  flex: 1;
  padding: 1rem 0rem;
  text-align: center;
  font-size: 20px;
  color: #8e8e8e;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover{
    background-color: #f0f0f0;
    
  }
 
}
span {
  color: #d8d8d8;
  margin: 0rem 1rem;
}
div.this {
  font-family: var(--font-Pretendard-SemiBold);
  color: white;
  background-color: ${GreenColor};
}
`;

export const TableHeader_Pest_useList = styled(RowView)`
  height: 4rem;
  margin-top: 0.5rem;
  background-color: ${lightGreenColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);

  div {
    display: flex;
    align-items: center; /* 세로 중앙 정렬 */
    justify-content: center; /* 가로 중앙 정렬 */
    text-align: center; /* 텍스트 중앙 정렬 */
    flex: 0.8; /* 모든 열 동일 비율 */
  }

  div.addr {
    flex: 1.5; /* 농지주소 열은 더 넓게 */
  }

  
  /* 특정 div 크기 조정 */
  .custom-div {
    flex: 0.1; /* 해당 div의 비율 설정 */
    
  }

  select {
    font-size: 18px;
    font-family: var(--font-Pretendard-Medium);
    background-color: ${lightGreenColor};
    border: 0;
    outline: 0;
    cursor: pointer;
  }
`;


export const TableList_Pest_useList = styled(RowView)`
height: 4rem;
cursor: pointer;
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


export const BtnArea_Pest_useList = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1rem;
    border-radius: 4px;
  }
   span.green {
    background-color: ${GreenColor};
    cursor: pointer;
  }
  span.blue {
    background-color: ${blueColor};
    cursor: pointer;
  }
  span.gray {
    background-color: ${grayColor};
    cursor: pointer;
  }
  span.yellow {
  background-color: ${yellowColor};
  cursor: pointer;}
  }
`;


export const StyledDatePicker = styled.input`
  width: 100%; /* 가로 길이 채우기 */
  max-width: 300px; /* 적당한 크기로 제한 */
  padding: 12px 16px; /* 내부 여백 */
  font-size: 16px; /* 기본 텍스트 크기 */
  font-family: var(--font-Pretendard-Medium); /* Pretendard Medium 폰트 */
  color: #333; /* 텍스트 색상 */
  border: 1px solid #f0f0f0; /* 기본 테두리 */
  border-radius: 8px; /* 테두리 둥글게 */
  background-color: #fff; /* 배경 흰색 */
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05); /* 부드러운 그림자 */
  transition: border-color 0.3s, box-shadow 0.3s;

  &:hover {
    border-color: ${GreenColor}; /* 강조 초록색 */
  }

  &:focus {
    border-color: ${GreenColor}; /* 포커스 시 초록색 */
    outline: none; /* 기본 포커스 제거 */
    box-shadow: 0 0 6px rgba(76, 175, 80, 0.4); /* 초록색 포커스 효과 */
  }

  &::placeholder {
    color: #aaa; /* 플레이스홀더 텍스트 색상 */
    font-size: 14px; /* 플레이스홀더 텍스트 크기 */
  }
`;


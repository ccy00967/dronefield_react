import styled from "styled-components";
import {
    blueColor,
    grayColor,
    GreenColor,
    greyColor,
    Icon,
    lightBlueColor,
    RowView,
    RowView2,
    yellowColor,
} from "../../../../Component/common_style";


export const ContentArea = styled.div`
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
  background-color: ${blueColor};
}
`;

export const TableHeader = styled(RowView)`
height: 4rem;
margin-top: 0.5rem;
background-color: ${lightBlueColor};
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
select {
  background-color: ${lightBlueColor};
  font-size: 18px;
  font-family: var(--font-Pretendard-Medium);
  outline: 0;
  border: 0;
  cursor: pointer;
}
`;

export const TableList = styled(RowView)`
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
  width: 10rem;
  margin-right: 0px;
  margin-left: 0px;
  font-family: var(--font-Pretendard-Medium);
  color: white;
  span {
    padding: 0.4rem 1.2rem;
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
            `;




import styled from "styled-components";
import { GreenColor,hoverGreen,RowView,RowView2,Icon,CenterView } from "../../Component/common_style";


/** Home/Home */
export const Section1 = styled.div`
  position: relative;
  width: 100%;
  height: 50rem;
  background-color: #eeeeee;
  overflow: hidden;
  div.content {
    box-sizing: border-box;
    padding: 0rem 2rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: white;
  }
  div.flex {
    flex: 1;
  }
  div.large {
    font-size: 35px;
    font-family: var(--font-Pretendard-Medium);
  }
  div.xxlarge {
    font-size: 100px;
    font-family: var(--font-Pretendard-Bold);
    margin-bottom: 0.5rem;
  }
  div.small {
    font-size: 24px;
    margin-bottom: 2rem;
  }
`;

export const Section2 = styled(RowView)`
box-sizing: border-box;
padding: 0rem 2rem;
margin: 20rem 0rem;
div.flex {
  flex: 1;
}
`;

export const Section3 = styled(RowView)`
box-sizing: border-box;
padding: 0rem 2rem;
margin: 5em 0rem;
div.flex {
  flex: 1;
}
`;

export const HomePic = styled(Icon)`
width: 100%;
height: 100%;
object-fit: cover;
`;

export const Text = styled(CenterView)`
font-family: var(--font-Pretendard-SemiBold);
div.green {
  color: ${GreenColor};
  font-size: 28px;
}
div.xlarge {
  font-size: 50px;
}
`;

export const SectionLast = styled(CenterView)`
margin: 5rem 0rem 20rem 0rem;
font-size: 24px;
div.top {
  box-sizing: border-box;
  padding: 0rem 2rem;
  width: 100%;
  max-width: 65rem;
}
.top > div {
  flex: 1;
  flex-direction: column;
}
img {
  width: 100%;
  max-width: 180px;
}
div.title {
  margin: 2rem 0rem 1rem 0rem;
  font-size: 30px;
  font-family: var(--font-Pretendard-SemiBold);
}
`;


/** Home/Login */
export const LoginBox = styled.div`
box-sizing: border-box;
width: 24rem;
padding: 2rem;
background-color: white;
border-radius: 12px;
div.label {
  color: #1d1d1d;
  margin: 1rem 0rem 0.5rem 0rem;
  font-family: var(--font-Pretendard-Medium);
}
`;

export const TypeBox = styled.div`
flex: 1;
padding: 1rem 0rem;
text-align: center;
color: gray;
cursor: pointer;
border: 1px solid #eeeeee;
&.left {
  border-radius: 8px 0px 0px 8px;
}
&.center {
  border-right: 0;
  border-left: 0;
}
&.right {
  border-radius: 0px 8px 8px 0px;
}
&.this {
  color: ${GreenColor};
  border: 1px solid ${GreenColor};
  font-family: var(--font-Pretendard-Medium);
}
`;

export const InputBox = styled.input`
box-sizing: border-box;
width: 100%;
padding: 0.8rem 1rem;
font-size: 16px;
font-family: var(--font-Pretendard-Regular);
border: 1px solid #f0f0f0;
border-radius: 8px;
outline: 0;
::placeholder {
  color: gray;
}
`;

export const Btn = styled.div`
padding: 0.8rem 0rem;
margin-top: 0.5rem;
text-align: center;
font-family: var(--font-Pretendard-SemiBold);
border-radius: 8px;
cursor: pointer;
transition: background-Color 0.3s;
&.green {
  margin-top: 1.5rem;
  color: white;
  background-color: ${GreenColor};
  &:hover {
    background-color: ${hoverGreen};
  }
}
&.gray {
  color: gray;
  background-color: #e4e4e4;
  &:hover {
    background-color: #c6c6c6;
  }
}
`;

export const TextBtn = styled(RowView2)`
margin-top: 0.5rem;
color: #8e8e8e;
font-size: 14px;
span {
  cursor: pointer;
}
div.bar {
  width: 1px;
  height: 10px;
  margin: 0rem 0.5rem;
  background-color: #8e8e8e;
}
`;
//Text에서 TextLogin으로 바꿈 Home/Home의 Text와 변수명 동일일
export const TextLogin = styled.div`   //
color: #1d1d1d;
font-size: 24px;
font-family: var(--font-Pretendard-SemiBold);
span {
  color: ${GreenColor};
}
`;
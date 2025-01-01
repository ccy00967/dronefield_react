import styled from "styled-components";
import {
  Icon,
} from "../../../Component/common_style";


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
  div.text {
    font-size: 80px;
    font-family: var(--font-Pretendard-SemiBold);
  }
`;
export const HomePic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;


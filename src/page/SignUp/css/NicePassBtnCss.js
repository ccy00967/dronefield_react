import styled from "styled-components";
import {
    GreenColor,
    lightGreenColor,
} from "../../../Component/common_style";



export const PASSBtn = styled.div`
  padding: 1rem 0rem;
  text-align: center;
  font-family: var(--font-Pretendard-SemiBold);
  color: ${GreenColor};
  background-color: ${lightGreenColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #c4e6d2;
  }
`;

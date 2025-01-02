import styled from "styled-components";
import { CenterView } from "../../../Component/common_style";

// ServiceInfo.jsx 와 공동사용
export const YouTubeBox = styled(CenterView)`
  margin-bottom: 10rem;
  div {
    width: 100%;
    max-width: 70rem;
    aspect-ratio: 2/1;
    background-color: #f0f0f0;
  }
  div.title {
    margin-top: 5rem;
    height: 3rem;
    font-size: 28px;
    font-family: var(--font-Pretendard-Medium);
    background-color: white;
  }
`;

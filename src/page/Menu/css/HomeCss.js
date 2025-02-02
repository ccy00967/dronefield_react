import styled from "styled-components";
import { CenterView, Icon, RowView } from "../../../Component/common_style";


export const Container = styled(RowView)`
  align-items: flex-start;
  height: ${(props) => `${props.$height}rem`};
`;
export const PicArea = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  div.content {
    box-sizing: border-box;
    position: absolute;
    top: 0%;
    left: 0%;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`;
export const BackgroundPic = styled(Icon)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const TitleText = styled.div`
  box-sizing: border-box;
  padding: 5% 0 0 5%;
  font-size: 70px;
  font-family: var(--font-Pretendard-Bold);
  color: white;
`;
export const MenuIconArea = styled(CenterView)`
  flex: 1;
  padding-top: 3rem;
  align-items: flex-start;
  div.center {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export const IconBox = styled(CenterView)`
  display: flex;
  flex-direction: column; /* 아이콘과 텍스트를 세로 정렬 */
  justify-content: center; /* 아이콘과 텍스트 수직 정렬 */
  align-items: center; /* 아이콘과 텍스트 수평 정렬 */
  margin: 1rem 2rem; /* 각 아이콘 박스의 간격 */
  width: 120px; /* 고정된 너비 */
  height: 120px; /* 고정된 높이 */
  font-family: var(--font-Pretendard-Medium);
  font-size: 16px; /* 텍스트 크기 조정 */
  color: white;
  background-color: #00000060;
  border: 1px solid #ffffff79;
  border-radius: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;

  /* 아이콘과 텍스트 간 간격 */
  img {
    margin-bottom: 10px; /* 아이콘 아래에 여백 추가 */
    width: 70px; /* 아이콘 크기 조정 */
    height: 70px; /* 고정된 아이콘 크기 */
  }

  &.oneRow {
    padding: 2rem;
  }
`;



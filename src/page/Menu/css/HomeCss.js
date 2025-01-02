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
  flex-direction: column;
  margin: 1rem 2rem;
  aspect-ratio: 1/1;
  font-family: var(--font-Pretendard-Medium);
  font-size: 24px;
  color: white;
  background-color: #00000060;
  border: 1px solid #ffffff79;
  border-radius: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  &.oneRow {
    padding: 2rem;
  }
`;

import styled from "styled-components";
import { CenterView } from "../../../Component/common_style";



// 버튼과 내용 스타일 정의
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e0e0e0;
  width: 100%;
  justify-content: space-around;
`;

export const TabButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.active ? "#00c853" : "#333")};
  border-bottom: ${(props) => (props.active ? "2px solid #00c853" : "none")};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  font-family: var(--font-Pretendard-Medium);

  &:hover {
    color: #00c853;
  }
`;

export const ContentArea = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: 700px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
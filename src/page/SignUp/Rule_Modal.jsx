import { useParams } from "react-router-dom";
import styled from "styled-components";

const TOSbox = styled.div`
  padding: 1rem;
`;
const TermsBox = styled.textarea`
  width: 100%;
  height: 25rem;
  box-sizing: border-box;
  resize: none;
  padding: 1rem;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  outline: none;
`;

const Rule_Modal = () => {
  const { type } = useParams();

  // 해당되는 약관 여기에 연결하세요.
  const content = type;

  return (
    <TOSbox>
      <TermsBox value={content} readOnly={true} />
    </TOSbox>
  );
};

export default Rule_Modal;

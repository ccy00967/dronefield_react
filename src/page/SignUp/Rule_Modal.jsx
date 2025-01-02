import { useParams } from "react-router-dom";
import { TermsBox, TOSbox } from "./css/Rule_ModalCss";


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

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CenterView, RowView2 } from "../common_style";

const FooterArea = styled(CenterView)`
  background-color: #EDEDED;
`;
const TextArea = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  padding: 2rem 1rem;
  div.Bold {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #d3d3d3;
  }
  div.info {
    color: #555555;
  }
  div.copyright {
    margin-top: 1rem;
    color: #555555;
  }
  .Bold > div {
    margin-right: 1rem;
    font-family: var(--font-Pretendard-SemiBold);
    cursor: pointer;
  }
  .info > div {
    margin-bottom: 0.3rem;
  }
`;

const Footer = () => {
  const Navigate = useNavigate();

  return (
    <FooterArea>
      <TextArea>
        <RowView2 className="Bold">
          <div>이용약관</div>
          <div>개인정보처리방침</div>
          <div>언론보도</div>
        </RowView2>

        <div className="info">
          <div>상호: 드론평야 대표자: 강규관</div>
          <div>
            사업자 등록번호: 567-15-02183 사업장 주소: 광주광역시 동구 조선대
            1길 3201호
          </div>
          <div>연락처: 010-7735-3953</div>
        </div>

        <div className="copyright">
          Copyright @ by Dron Field Designed by Freepik
        </div>
      </TextArea>
    </FooterArea>
  );
};
export default Footer;

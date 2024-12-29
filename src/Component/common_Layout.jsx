import styled from "styled-components";
import Footer from "./UI/Footer";
import TopBar from "./UI/TopBar";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: var(--font-Pretendard-Regular);
  min-width: ${(props) => `${props.$minWidth}px`};
`;
const Page = styled.div`
  width: 100%;
  padding-top: 5rem;
  overflow: hidden;
`;

const Common_Layout = (props, ref) => {
  const { children } = props;
  const topMenu = props.topMenu || "";
  const minWidth = props.minWidth || 1200; // 원하는 사이즈로 커스텀 하시면 됩니다.

  return (
    <Container $minWidth={minWidth}>
      <TopBar topMenu={topMenu} />

      <Page>
        {children}
        <Footer />
      </Page>
    </Container>
  );
};
export default Common_Layout;

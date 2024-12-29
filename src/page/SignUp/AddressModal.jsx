import styled from "styled-components";
import {
  BackgroundArea,
  CenterView,
  Icon,
  RowView2,
} from "../../Component/common_style";
import noScroll from "../../Component/function/noScroll";
import DaumPostcodeEmbed from "react-daum-postcode";


const ModalBox = styled.div`
  box-sizing: border-box;
  max-width: 28rem;
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  margin: auto 0rem;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
`;

const AddressModal = ({ isOpen, closeAddrModal, setAddrRoad, setAddrJibun }) => {

  const complete = (daumAddress) => {
    setAddrRoad(daumAddress.roadAddress)
    setAddrJibun(daumAddress.jibunAddress)

    closeAddrModal()
  }

  noScroll(isOpen);

  return (
    <BackgroundArea style={isOpen ? {} : { display: "none" }}>
      <ModalBox>
        <RowView2 className="end">
          <Icon
            className="pointer"
            onClick={closeAddrModal}
            src={require("../../img/icon_close.png")}
          />
        </RowView2>

        <CenterView>
          <DaumPostcodeEmbed
            onComplete={complete}
            style={{
              width: "500px",
              height: "600px"
            }}
          />
        </CenterView>
      </ModalBox>
    </BackgroundArea>
  );
};

export default AddressModal
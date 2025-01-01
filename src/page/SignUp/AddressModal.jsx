import {
  BackgroundArea,
  CenterView,
  Icon,
  RowView2,
} from "../../Component/common_style";
import noScroll from "../../Component/function/noScroll";
import DaumPostcodeEmbed from "react-daum-postcode";
import { ModalBox } from "./css/AddressModalCss";


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
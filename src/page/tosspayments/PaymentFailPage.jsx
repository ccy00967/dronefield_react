import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BackgroundArea, Icon, RowView2 } from "../../Component/common_style";
import { useState } from "react";
import { ModalBox } from "./css/tossCss";


export function PaymentFailPage() {
    const [modalOpen, setModalOpen] = useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const closeModal = () => {
        setModalOpen(false);
        //navigate("/pestcontrol/apply")
        navigate(-1)
    };

    return (
        <BackgroundArea style={modalOpen ? {} : { display: "none" }}>
            <ModalBox>
                <RowView2 className="end">
                    <Icon
                        className="pointer"
                        onClick={closeModal}
                        src={require("../../img/icon_close.png")}
                    />
                </RowView2>
                <div id="info" className="box_section" style={{ width: "600px" }}>
                    <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" />
                    <h2>결제를 실패했어요</h2>

                    <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
                        <div className="p-grid-col text--left">
                            <b>에러메시지</b>
                        </div>
                        <div className="p-grid-col text--right" id="message">{`${searchParams.get("message")}`}</div>
                    </div>
                    <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
                        <div className="p-grid-col text--left">
                            <b>에러코드</b>
                        </div>
                        <div className="p-grid-col text--right" id="code">{`${searchParams.get("code")}`}</div>
                    </div>
                </div>
            </ModalBox>
        </BackgroundArea>
    );
}
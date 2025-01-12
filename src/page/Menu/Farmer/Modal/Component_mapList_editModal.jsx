import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styled from "styled-components";
import {
    BackgroundArea,
    CenterView,
    Icon,
    RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";
import { ModalBox, Hr, DataRow, TextSemiBold, TextMedium } from "../css/PestControl_useListModalCss";
import { Btn, InputBox } from "../css/FarmerCss";
import { InputBox_Farmland_InsertModal } from "../css/FarmerCss";
import { editLandInfo } from "../../../../Api/Farmer";

const Component_mapList_editModal = forwardRef((props, ref) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState({});

    useImperativeHandle(ref, () => ({
        visible: (data) => {
            setData(data || {});
            setModalOpen(true);
        },
    }));

    // 모달 open시 스크롤 방지
    noScroll(modalOpen);

    // 상태 관리
    const [additionalPhoneNum, setAdditionalPhoneNum] = useState("");
    const [cropsInfo, setCropsInfo] = useState("");
    const [detail, setDetail] = useState("");
    const [landNickName, setLandNickName] = useState("");

    // 데이터 변경 시 상태 초기화
    useEffect(() => {
        setAdditionalPhoneNum(data.additionalPhoneNum || "값이 없음");
        setCropsInfo(data.cropsInfo || "값이 없음");
        setDetail(data.detail || "입력하십시오");
        setLandNickName(data.landNickName || "값이 없음");
    }, [data]);

    const closeModal = () => {
        setModalOpen(false);
    };
    useEscapeKey(closeModal);

    const uuid = data.uuid;
    const updatedLandInfo = {
        pnu: data.pnu || "",
        lndpclAr: data.lndpclAr || "",
        cd: data.cd || "",
        landNickName: landNickName || "값이 없음",
        cropsInfo: cropsInfo || "값이 없음",
        additionalPhoneNum: additionalPhoneNum || "값이 없음",
        road: data.road || "값이 없음",
        jibun: data.jibun || "값이 없음",
        detail: detail || "값이 없음",
    };




    // 농지 전체보기 > 농지 수정 함수
    const edit_func = async (uuid, handleUpdate) => {

        const is_edited = await editLandInfo(uuid, handleUpdate);
        console.log("is_edited:", is_edited);
        if (is_edited) {
            alert("수정이 완료 되었습니다.");
            window.location.reload(); // 페이지 새로 고침
        } else if (!is_edited) {
            alert("수정 에러!");
        }
    };


    return (
        <BackgroundArea style={modalOpen ? {} : { display: "none" }}>
            <ModalBox>
                <RowView2 className="end">
                    <Icon
                        className="pointer"
                        onClick={closeModal}
                        src={require("../../../../img/icon_close.png")}
                    />
                </RowView2>

                <CenterView>
                    <TextSemiBold className="title" $fontsize={22}>
                        수정정보
                    </TextSemiBold>
                </CenterView>

                <DataRow>
                    <TextMedium $fontsize={18}>토지이름</TextMedium>
                    <InputBox_Farmland_InsertModal
                        type="text"
                        value={landNickName}
                        onChange={(e) => setLandNickName(e.target.value)}
                        placeholder="토지 이름을 입력하세요"
                    />
                </DataRow>
                <Hr />

                <DataRow>
                    <TextMedium $fontsize={16}>지번주소</TextMedium>
                    <div className="gray">{data.jibun}</div>
                </DataRow>

                <DataRow>
                    <TextMedium $fontsize={16}>도로명 주소</TextMedium>
                    <div className="gray">{data.road}</div>
                </DataRow>
                <DataRow>
                    <TextMedium $fontsize={16}>추가 주소 정보</TextMedium>
                    <InputBox_Farmland_InsertModal
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        placeholder="추가 주소 정보를 입력하세요"
                    />
                </DataRow>
                <Hr />
                <DataRow>
                    <TextMedium $fontsize={18}>추가 전화번호</TextMedium>
                    <InputBox_Farmland_InsertModal

                        type="text"
                        value={additionalPhoneNum}
                        onChange={(e) => setAdditionalPhoneNum(e.target.value)}
                        placeholder="추가 전화번호를 입력하세요"
                    />
                </DataRow>

                <DataRow>
                    <TextMedium $fontsize={18}>작물</TextMedium>
                    <InputBox_Farmland_InsertModal
                        type="text"
                        value={cropsInfo}
                        onChange={(e) => setCropsInfo(e.target.value)}
                        placeholder="작물을 입력하세요"
                    />
                </DataRow>



                <Hr className="black" />

                <Btn onClick={() => { edit_func(uuid, updatedLandInfo) }}>수정하기</Btn>
            </ModalBox>
        </BackgroundArea>
    );
});

export default Component_mapList_editModal;

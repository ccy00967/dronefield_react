import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import {
  BackgroundArea,
  CenterView,
  Icon,
  RowView2,
} from "../../../../Component/common_style";
import noScroll from "../../../../Component/function/noScroll";
import useEscapeKey from "../../../../Component/function/useEscapeKey";
import { ModalBox, Hr, DataRow, TextSemiBold, TextMedium } from "../css/PestControl_useListModalCss";
import { Btn, InputBox_Farmland_InsertModal } from "../css/FarmerCss";
import { editLandInfo, getLandInfo } from "../../../../Api/Farmer";

const Component_mapList_editModal = forwardRef((props, ref) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});

  // 상태 관리
  const [additionalPhoneNum, setAdditionalPhoneNum] = useState("");
  const [cropsInfo, setCropsInfo] = useState("");
  const [detail, setDetail] = useState("");
  const [landNickName, setLandNickName] = useState("");

  // 모달 제어 및 초기값 설정
  useImperativeHandle(ref, () => ({
    visible: (fetchedData) => {
      const initialData = fetchedData || {};
      setData(initialData);
      setOriginalData(initialData); // 초기값 저장
      setAdditionalPhoneNum(initialData.additionalPhoneNum || "");
      setCropsInfo(initialData.cropsInfo || "");
      setDetail(initialData.detail || "");
      setLandNickName(initialData.landNickName || "");
      setModalOpen(true);
    },
  }));

  // 모달 open 시 스크롤 방지
  noScroll(modalOpen);

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);

    // 상태 초기화
    setData({});
    setOriginalData({});
    setAdditionalPhoneNum("");
    setCropsInfo("");
    setDetail("");
    setLandNickName("");
  };
  useEscapeKey(closeModal);

  // 수정 정보 생성
  const uuid = data.uuid;
  const updatedLandInfo = {
    landNickName: landNickName.trim() || "값이 없음",
    cropsInfo: cropsInfo.trim() || "값이 없음",
    additionalPhoneNum: additionalPhoneNum.trim() || "값이 없음",
    detail: detail.trim() || "값이 없음",
  };

  // "수정하기" 버튼 활성화 조건
  const isChanged =
    landNickName !== originalData.landNickName ||
    cropsInfo !== originalData.cropsInfo ||
    additionalPhoneNum !== originalData.additionalPhoneNum ||
    detail !== originalData.detail;

  // 농지 수정 함수
  const edit_func = async (uuid, handleUpdate) => {
    try {
      const is_edited = await editLandInfo(uuid, handleUpdate);
      if (is_edited) {
        alert("수정이 완료되었습니다.");
        closeModal(); // 모달 닫기
        if (props.onUpdate) {
          props.onUpdate(); // 상위 컴포넌트에서 데이터 갱신
        } else {
          window.location.reload(); // 데이터 갱신 로직이 없으면 페이지 리프레시
        }
      } else {
        alert("수정 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error in editLandInfo:", error);
      alert("수정 작업 중 문제가 발생했습니다. 다시 시도해주세요.");
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
          <TextMedium $fontsize={18}>토지 이름</TextMedium>
          <InputBox_Farmland_InsertModal
            type="text"
            value={landNickName}
            onChange={(e) => setLandNickName(e.target.value)}
            placeholder="토지 이름을 입력하세요"
          />
        </DataRow>
        <Hr />

        <DataRow>
          <TextMedium $fontsize={16}>지번 주소</TextMedium>
          <div className="gray">{data.jibun || "지번 주소 없음"}</div>
        </DataRow>

        <DataRow>
          <TextMedium $fontsize={16}>도로명 주소</TextMedium>
          <div className="gray">{data.road || "도로명 주소 없음"}</div>
        </DataRow>

        <DataRow>
          <TextMedium $fontsize={16}>상세 주소 정보</TextMedium>
          <InputBox_Farmland_InsertModal
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="상세 주소 정보를 입력하세요"
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

        <Btn
          onClick={() => edit_func(uuid, updatedLandInfo)}
          disabled={!isChanged} // 변경되지 않은 경우 버튼 비활성화
        >
          수정하기
        </Btn>
      </ModalBox>
    </BackgroundArea>
  );
});

export default Component_mapList_editModal;

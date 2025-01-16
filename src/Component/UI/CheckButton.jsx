import React, { useState, useEffect } from "react";
import { updateCheckState } from "../../Api/Farmer";

const CheckButton = ({ orderId, checkState: initialCheckState, onButtonClick }) => {
  // 초기 상태를 props로 전달된 checkState로 설정
  const [checkState, setCheckState] = useState(initialCheckState);
  const [buttonLabel, setButtonLabel] = useState("");

  // 초기 렌더링 시 버튼 라벨 설정
  useEffect(() => {
    setButtonLabel(initialCheckState === 1 ? "확인 취소" : "확인 완료");
  }, [initialCheckState]);

  const handleButtonClick = async (e) => {
    e.stopPropagation(); // Row 클릭 이벤트 차단
    if (onButtonClick) {
      onButtonClick(e); // 부모 컴포넌트에서 추가 동작을 실행할 수 있도록 전달
    }

    // 새 상태 계산 (1 → 0, 0 → 1)
    const newCheckState = checkState === 1 ? 0 : 1;

    // 확인 메시지
    const confirmMessage = checkState === 1 
      ? "확인을 취소하시겠습니까?" 
      : "확인하시겠습니까?";
    
    // 사용자 확인
    if (!window.confirm(confirmMessage)) {
      return; // 사용자가 취소를 누르면 아무 작업도 하지 않음
    }

    // 서버로 요청 전송
    const response = await updateCheckState(orderId, newCheckState);

    if (response) {
      // 상태 업데이트 성공 시
      setCheckState(newCheckState);
      setButtonLabel(newCheckState === 1 ? "확인 취소" : "확인 완료");
    }
  };

  return (
    <button
      className={`check-button ${checkState === 1 ? "pending" : "completed"}`}
      onClick={handleButtonClick}
    >
      {buttonLabel}
    </button>
  );
};

export default CheckButton;

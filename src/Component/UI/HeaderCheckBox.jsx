import React from "react";
import { CheckBox } from "../common_style";

const HeaderCheckBox = ({ filterData, checkedOrderIds, setCheckedOrderIds }) => {
  // 필터된 데이터에서 `requestDepositState === 0`인 항목의 orderId를 추출
  const filteredOrderIds = filterData()
    .filter((data) => data.requestDepositState === 0)
    .map((data) => data.orderId);

  // 전체 선택 상태 확인
  const isAllChecked =
    filteredOrderIds.length > 0 &&
    filteredOrderIds.every((id) => checkedOrderIds.includes(id));

  // 전체 선택/해제 핸들러
  const handleHeaderCheckboxChange = (isChecked) => {
    if (isChecked) {
      // 조건에 맞는 데이터의 orderId 추가
      setCheckedOrderIds((prev) => [...new Set([...prev, ...filteredOrderIds])]);
    } else {
      // 조건에 맞는 데이터의 orderId 제거
      setCheckedOrderIds((prev) => prev.filter((id) => !filteredOrderIds.includes(id)));
    }
  };

  return (
    <CheckBox
      type="checkbox"
      $color="#555555"
      checked={isAllChecked} // 전체 선택 상태
      onChange={(e) => handleHeaderCheckboxChange(e.target.checked)} // 선택/해제 이벤트
    />
  );
};

export default HeaderCheckBox;

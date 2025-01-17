import React from "react";
import { CheckBox } from "../common_style";
const HeaderCheckBox = ({ filterData, checkedOrderIds, setCheckedOrderIds }) => {
  // 필터 조건에 맞는 orderId 처리 로직
  const handleHeaderCheckboxChange = (isChecked) => {
    const filteredOrderIds = filterData()
      .filter((data) => data.requestDepositState === 0)
      .map((data) => data.orderId);

    if (isChecked) {
      // 조건에 맞는 데이터의 orderId 추가
      setCheckedOrderIds((prev) => [...new Set([...prev, ...filteredOrderIds])]);
    } else {
      // 조건에 맞는 데이터의 orderId 제거
      setCheckedOrderIds((prev) =>
        prev.filter((id) => !filteredOrderIds.includes(id))
      );
    }
  };

  // 체크 상태 계산
  const isAllChecked =
    filterData().filter((data) => data.requestDepositState === 0).length > 0 &&
    filterData()
      .filter((data) => data.requestDepositState === 0)
      .every((data) => checkedOrderIds.includes(data.orderId));

  return (
    <CheckBox
      type="checkbox"
      $color="#555555"
      checked={isAllChecked} // 전체 선택 상태
      onChange={(e) => handleHeaderCheckboxChange(e.target.checked)} // 체크 상태 변경
    />
  );
};

export default HeaderCheckBox;

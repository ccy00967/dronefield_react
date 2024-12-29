import { useEffect } from "react";
import styled from "styled-components";
import { RowView2 } from "../common_style";

const PerPageDiv = styled(RowView2)`
  margin-top: 1rem;
  select {
    padding: 3px 5px;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    outline: 0;
    cursor: pointer;
    &:hover {
      border-color: #454545;
    }
  }
`;

const PerPageControl = (props) => {
  const perPage = props.perPage;
  const setPerPage = props.setPerPage;
  const setCurrentPage = props.setCurrentPage;

  const setting_perPage = (e) => setPerPage(e.target.value);

  // perPage가 새로 할당될 때 마다 1페이지로 이동
  useEffect(() => {
    if (setCurrentPage) {
      setCurrentPage(1);
    }
  }, [perPage]);

  return (
    <PerPageDiv className="end">
      <select value={perPage} onChange={setting_perPage}>
        <option value={20}>20개</option>
        <option value={50}>50개</option>
        <option value={100}>100개</option>
      </select>
    </PerPageDiv>
  );
};

export default PerPageControl;

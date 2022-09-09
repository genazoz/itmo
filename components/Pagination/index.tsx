import React from "react";
import styled from "styled-components";

import theme from "../../styles/theme";
import ReactPaginate from "react-paginate";

const PaginationWrapper = styled.div`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    
    font-family: ${theme.fonts.openSans};
    font-weight: 700;
  }
  li {
    width: 25px;
    height: 25px;

    cursor: pointer;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;

      font-size: 13px;
      color: #000000;
    }

    &.selected a {
      color: #FFFFFF;
    }
  }
  .selected {
    width: 35px;
    height: 35px;

    border-radius: 50%;
    background: #000000;

    &.disabled {
      pointer-events: none;
      opacity: .3;
    }
  }
  .next, .previous {
    width: 35px;
    height: 35px;
    
    background: #EEEEEE;
    border-radius: 50%;

    &.disabled {
      display: none;
    }
    
    @media (max-width: ${theme.media.xs}) {
      display: none;
    }
  }
`;

interface PaginationProps {
  currentPage: number,
  newsPerPage: number,
  countOfPages: number,
  onPageChange: (num: number) => void
}

const Pagination: React.FC<PaginationProps> = ({currentPage, countOfPages, onPageChange}) => {
  return (
    <PaginationWrapper>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onPageChange(e.selected + 1)}
        pageCount={countOfPages}
        marginPagesDisplayed={1}
        previousLabel="<"
        forcePage={currentPage - 1}
      />
    </PaginationWrapper>
  );
}

export default Pagination;
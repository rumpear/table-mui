import { useState } from 'react';

export const usePagination = ({ contentPerPage, totalCount }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / contentPerPage);
  const lastIdx = page * contentPerPage;
  const firstIdx = lastIdx - contentPerPage;

  const nextPage = () => {
    setPage(prevPage => {
      if (prevPage === totalPages) return prevPage;
      return prevPage + 1;
    });
  };

  const prevPage = () => {
    setPage(prevPage => {
      if (prevPage === 1) return prevPage;
      return prevPage - 1;
    });
  };

  return {
    page,
    totalPages,
    lastIdx,
    firstIdx,
    nextPage,
    prevPage,
    goToPage: setPage,
  };
};

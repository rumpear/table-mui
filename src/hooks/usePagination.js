import { useState } from 'react';

export const usePagination = ({ contentPerPage, totalCount }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / contentPerPage);
  const lastIdx = page * contentPerPage;
  const firstIdx = lastIdx - contentPerPage;

  const nextPage = () => {
    setPage(s => {
      if (s === totalPages) return s;
      return s + 1;
    });
  };

  const prevPage = () => {
    setPage(s => {
      if (s === 1) return s;
      return s - 1;
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

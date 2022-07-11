import { useState } from 'react';

export const usePaginationMui = ({ contentPerPage, totalCount }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalCount / contentPerPage);
  const lastIdx = page * contentPerPage;
  const firstIdx = lastIdx - contentPerPage;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  return {
    page,
    totalPages,
    lastIdx,
    firstIdx,
    setPage,
    handleChangePage,
  };
};

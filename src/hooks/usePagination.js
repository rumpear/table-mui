import { useState } from "react";

const usePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(count / contentPerPage);
  const lastIdx = page * contentPerPage;
  const firstIdx = lastIdx - contentPerPage;

  const nextPage = () => {
    setPage((s) => {
      if (s === totalPages) return s;
      return s + 1;
    });
  };

  const prevPage = () => {
    setPage((s) => {
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

export default usePagination;

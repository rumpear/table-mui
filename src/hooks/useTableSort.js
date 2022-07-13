import { useState } from 'react';

const SORT_TYPES = {
  ascending: 'asc',
  descending: 'desc',
};

export const useTableSort = () => {
  const [order, setOrder] = useState(SORT_TYPES.ascending);
  const [orderBy, setOrderBy] = useState('');

  const handleRequestSort = (_, property) => {
    if (property === 'actions' || property === 'phone') {
      return;
    }

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSortReset = () => {
    setOrder('asc');
    setOrderBy('');
  };

  return { order, orderBy, handleRequestSort, handleSortReset };
};

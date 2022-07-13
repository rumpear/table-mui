export const descendingComparator = (a, b, orderBy, revert = false) => {
  if (b[orderBy] < a[orderBy]) {
    return revert ? 1 : -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return revert ? -1 : 1;
  }
};

export const compareHandler = (order, orderBy) => {
  const isDescending = order === 'desc';
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => descendingComparator(a, b, orderBy, !isDescending);
};

import PropTypes from 'prop-types';
import Pagination from '@mui/material/Pagination';

const BasicPagination = ({ count, page, onPageChange, size }) => {
  return (
    <Pagination
      count={count}
      page={page}
      onChange={onPageChange}
      size={size}
    />
  );
};

export default BasicPagination;

BasicPagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  size: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
};

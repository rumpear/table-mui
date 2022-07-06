import PropTypes from 'prop-types';

import './styles.scss';

const TableHead = ({ title, sort, onSort, isSorted }) => {
  return (
    <th className="TableHead">
      {title}
      {sort && (
        <button
          type="button"
          className="TableHead-button"
          onClick={onSort}
        >
          {isSorted ? '↑' : '↓'}
        </button>
      )}
    </th>
  );
};

export default TableHead;

TableHead.propTypes = {
  title: PropTypes.string.isRequired,
  sort: PropTypes.bool.isRequired,
  onSort: PropTypes.func.isRequired,
  isSorted: PropTypes.bool.isRequired,
};

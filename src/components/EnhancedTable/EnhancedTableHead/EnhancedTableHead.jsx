import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { headCells } from '../../../data';

const TYPES = ['asc', 'desc'];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (event, property) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label }) => {
          return (
            <TableCell
              key={id}
              sortDirection={orderBy === id ? order : false}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={e => createSortHandler(e, id)}
                hideSortIcon={id === 'actions' || id === 'phone'}
              >
                {label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(TYPES).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

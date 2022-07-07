import PropTypes from 'prop-types';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const headCells = [
  {
    id: 'name',
    label: 'Name',
  },
  {
    id: 'username',
    label: 'Username',
  },
  {
    id: 'email',
    label: 'Email',
  },
  {
    id: 'city',
    label: 'City',
  },
  {
    id: 'phone',
    label: 'Phone',
  },
  {
    id: 'actions',
    label: 'Actions',
  },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    // <TableHead sx={{ '& .MuiSvgIcon-root': { display: 'none' } }}>
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label }) => (
          <TableCell
            key={id}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

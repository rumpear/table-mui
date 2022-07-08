import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { useCallback, useState } from 'react';
import { getComparator } from '../../utils/';
import { deleteData, editData, postData } from '../../services/tableApi';
import { EnhancedTableHead, EnhancedTableItem } from './';
import { TableForm, BasicModal, Search } from '../';
import { BasicButton } from '../ui/';
import { useStyles } from './styles';

const EnhancedTable = ({ rows }) => {
  const styles = useStyles();

  const [usersData, setUsersData] = useState(rows);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (_, property) => {
    if (property === 'actions') {
      return;
    }

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    const { value } = e.target;
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const handleToggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleAddEditUser = user => {
    handleToggleModal();

    if (user?.type === 'click') {
      setEditingUser(null);
      return;
    }

    setEditingUser(user);
  };

  const addNewUser = useCallback(
    async user => {
      setLoading(true);
      try {
        const res = await postData(user);
        setUsersData([res, ...usersData]);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    },
    [usersData]
  );

  const editUser = useCallback(
    async user => {
      setLoading(true);
      try {
        setUsersData(
          usersData.map(item => {
            if (item.id === user.id) {
              item = user;
            }
            return item;
          })
        );
        await editData(user.id, user);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    },
    [usersData]
  );

  const deleteUser = useCallback(
    async id => {
      setLoading(true);
      try {
        await deleteData(id);
        setUsersData(
          usersData.filter(item => {
            return item.id !== id;
          })
        );
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    },
    [usersData]
  );

  const getSearchResults = ({
    input: filterValue,
    select: searchType,
  }) => {
    const filteredData = rows.filter(item => {
      const normalizeFilterValue = filterValue.toLowerCase();
      const normalizeSearchValue = item[searchType].toLowerCase();

      return normalizeSearchValue.includes(normalizeFilterValue);
    });

    setUsersData(filteredData);
  };

  const resetTable = () => {
    setUsersData(rows);
  };

  return (
    <Box className={styles.wrapper}>
      <Search
        onSearch={getSearchResults}
        onResetTable={resetTable}
        onResetSort={() => setOrderBy('')}
        onResetPage={() => setPage(0)}
      />
      {Boolean(usersData.length) ? (
        <>
          <Paper className={styles.paper}>
            <TableContainer>
              <Table
                className={styles.table}
                aria-labelledby="Users table"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={usersData.length}
                />
                <TableBody>
                  {usersData
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .sort(getComparator(order, orderBy))
                    .map(user => {
                      return (
                        <EnhancedTableItem
                          key={user.id}
                          user={user}
                          onDeleteUser={() => deleteUser(user.id)}
                          onOpenModal={() => handleAddEditUser(user)}
                          loading={loading}
                        />
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={usersData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          <Box className={styles.btnWrapper}>
            <BasicButton
              variant="contained"
              label="Add user"
              size="large"
              onClick={handleAddEditUser}
            />
          </Box>
        </>
      ) : (
        <Box component="p" className={styles.notification}>
          Nothing found. Refine your search result
        </Box>
      )}

      <BasicModal
        isOpen={showModal}
        onClose={handleToggleModal}
        title={editingUser ? 'Edit user data' : 'Add new user'}
      >
        <TableForm
          onSendForm={editingUser ? editUser : addNewUser}
          onCloseModal={handleToggleModal}
          currentUser={editingUser}
          loading={loading}
        />
      </BasicModal>
    </Box>
  );
};

export default EnhancedTable;

EnhancedTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }).isRequired
  ),
};

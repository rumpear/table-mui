import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { useCallback, useEffect, useState } from 'react';
import { getComparator } from '../../utils/';
import {
  deleteData,
  editData,
  getData,
  postData,
} from '../../services/tableApi';
import { usePaginationMui } from '../../hooks/usePaginationMui';
import { EnhancedTableHead, EnhancedTableItem } from './';
import { TableForm, BasicModal, BasicPagination, Search } from '../';
import { BasicButton } from '../ui/';

import { useStyles } from './styles';

const EnhancedTable = () => {
  const styles = useStyles();

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');

  const {
    page,
    totalPages,
    lastIdx,
    firstIdx,
    setPage,
    handleChangePage,
  } = usePaginationMui({
    contentPerPage: 5,
    totalCount: usersData.length,
  });

  const fetchData = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await getData();
      setUsersData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSort = (_, property) => {
    if (property === 'actions' || property === 'phone') {
      return;
    }

    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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
        await editData(user.id, user);
        setUsersData(
          usersData.map(item => {
            if (item.id === user.id) {
              item = user;
            }
            return item;
          })
        );
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
        // fetchData();
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    },
    [usersData]
    // fetchData
  );

  const getSearchResults = ({
    input: filterValue,
    select: searchType,
  }) => {
    const filteredData = usersData.filter(item => {
      const normalizeFilterValue = filterValue.toLowerCase();
      const normalizeSearchValue = item[searchType].toLowerCase();

      return normalizeSearchValue.includes(normalizeFilterValue);
    });

    setUsersData(filteredData);
  };

  const resetTable = () => {
    setUsersData(usersData);
  };

  const pageItemsCount = usersData.slice(firstIdx, lastIdx).length;

  useEffect(() => {
    if (usersData.length && !pageItemsCount) {
      setPage(prev => prev - 1);
    }
  }, [pageItemsCount, setPage, usersData.length]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <Box className={styles.wrapper}>
      <Search
        onSearch={getSearchResults}
        onResetTable={resetTable}
        onResetSort={() => setOrderBy('')}
        onResetPage={() => setPage(1)}
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
                    .sort(getComparator(order, orderBy))
                    .slice(firstIdx, lastIdx)
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
          </Paper>

          <BasicPagination
            count={totalPages}
            page={page}
            onPageChange={handleChangePage}
          />

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

// EnhancedTable.propTypes = {
//   rows: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       username: PropTypes.string.isRequired,
//       email: PropTypes.string.isRequired,
//       city: PropTypes.string.isRequired,
//       phone: PropTypes.string.isRequired,
//     }).isRequired
//   ),
// };

import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { compareHandler } from '../../utils/';
import { deleteData, editData, postData } from '../../services/tableApi';
import { usePaginationMui } from '../../hooks/usePaginationMui';
import { EnhancedTableHead, EnhancedTableItem } from './';
import { TableForm, Modal, BasicPagination, Search } from '../';
import { BasicButton } from '../ui/';
import { useFetch, useTableSort } from '../../hooks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useStyles } from './styles';

const DEFAULT_CONTENT_PER_PAGE = 25;

const EnhancedTable = () => {
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const styles = useStyles();

  const {
    initialData,
    usersData,
    isFetching,
    error,
    setUsersData,
    setInitialData,
  } = useFetch();

  const {
    page,
    totalPages,
    lastIdx,
    firstIdx,
    setPage,
    resetPage,
    handleChangePage,
  } = usePaginationMui({
    contentPerPage: DEFAULT_CONTENT_PER_PAGE,
    totalCount: usersData.length,
  });

  const { order, orderBy, handleRequestSort, handleSortReset } =
    useTableSort();

  const pageItemsCount = usersData.slice(firstIdx, lastIdx).length;

  useEffect(() => {
    if (usersData.length && !pageItemsCount) {
      setPage(prev => prev - 1);
    }
  }, [pageItemsCount, usersData]);

  const handleToggleModal = () => {
    setShowModal(prev => !prev);
  };

  const handleAddEditUser = user => {
    handleToggleModal();

    const isAddUserClick = user?.type === 'click';

    if (isAddUserClick) {
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

        const addedUserData = [res, ...usersData];
        setUsersData(addedUserData);
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
        const editedUserData = usersData.map(item => {
          if (item.id === user.id) {
            return {
              ...item,
              ...user,
            };
          }
          return item;
        });

        setUsersData(editedUserData);
        setInitialData(editedUserData);
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
        const deletedUserData = usersData.filter(item => {
          return item.id !== id;
        });

        setUsersData(deletedUserData);
        setInitialData(deletedUserData);
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
    const filteredData = usersData.filter(item => {
      const normalizeFilterValue = filterValue.toLowerCase();
      const normalizeSearchValue = item[searchType].toLowerCase();

      return normalizeSearchValue.includes(normalizeFilterValue);
    });

    setUsersData(filteredData);
  };

  const resetTable = () => {
    setUsersData(initialData);
  };

  const onDragEnd = result => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }
    const startIndex = source.index;
    const endIndex = destination.index;
    const isntLocationChanged = startIndex === endIndex;

    if (isntLocationChanged) {
      return;
    }

    const newData = [...usersData];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);
    setUsersData(newData);
  };

  if (error) {
    return (
      <Box component="p" className={styles.error}>
        {error.message}
      </Box>
    );
  }

  if (isFetching) {
    return (
      <Box component="p" className={styles.fetching}>
        Loading...
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <Search
        onSearch={getSearchResults}
        onResetTable={resetTable}
        onResetSort={handleSortReset}
        onResetPage={resetPage}
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
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tableBody">
                    {provided => (
                      <TableBody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {usersData
                          .slice(firstIdx, lastIdx)
                          .sort(compareHandler(order, orderBy))
                          .map((user, index) => {
                            return (
                              <EnhancedTableItem
                                key={user.id}
                                index={index}
                                user={user}
                                onDeleteUser={() => deleteUser(user.id)}
                                onOpenModal={() => handleAddEditUser(user)}
                                loading={loading}
                                ref={provided.innerRef}
                              />
                            );
                          })}
                        {provided.placeholder}
                      </TableBody>
                    )}
                  </Droppable>
                </DragDropContext>
              </Table>
            </TableContainer>
          </Paper>
          <Box className={styles.paginationWrapper}>
            <BasicPagination
              count={totalPages}
              page={page}
              onPageChange={handleChangePage}
            />
          </Box>

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

      <Modal
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
      </Modal>
    </Box>
  );
};

export default EnhancedTable;

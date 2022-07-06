import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { deleteData, editData, postData } from '../../services/tableApi';
import { usePagination } from '../../hooks';
import { Button } from '../ui/';
import { Modal, UserForm, Pagination, Filter } from '../';
import { TableHead, TableItem } from './';

import './styles.scss';

export const tableHeadData = [
  { id: 1, title: 'Name', type: 'name', sort: true },
  { id: 2, title: 'Username', type: 'username', sort: true },
  { id: 3, title: 'Email', type: 'email', sort: true },
  { id: 4, title: 'City', type: 'city', sort: true },
  { id: 5, title: 'Phone', type: 'phone', sort: false },
  { id: 6, title: 'Actions', type: 'actions', sort: false },
];

const Table = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [sortedTypes, setSortedTypes] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {
    firstIdx,
    lastIdx,
    page,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination({
    contentPerPage: 5,
    count: tableData.length,
  });

  const onSort = useCallback(
    type => {
      setSortedTypes(prev => {
        const isShouldAddType = prev.includes(type);

        const sortedData = [...tableData].sort((a, b) => {
          const firstKey = isShouldAddType ? b : a;
          const secondKey = isShouldAddType ? a : b;
          return firstKey[type].localeCompare(secondKey[type]);
        });
        setTableData(sortedData);

        if (isShouldAddType) {
          return prev.filter(innerType => type !== innerType);
        }

        return [...prev, type];
      });
    },
    [tableData]
  );

  const handleToggleModal = user => {
    setShowModal(prev => !prev);

    if (user?.type === 'click') {
      return;
    }

    if (editingUser) {
      setEditingUser(null);
    }

    setEditingUser(user);
  };

  const addNewUser = useCallback(
    async userData => {
      try {
        const res = await postData(userData);
        setTableData([res, ...tableData]);
      } catch (error) {
        console.log(error.message);
      }
    },
    [tableData]
  );

  const editUser = useCallback(
    async user => {
      try {
        setTableData(
          tableData.map(item => {
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
    },
    [tableData]
  );

  const deleteUser = useCallback(
    async id => {
      try {
        await deleteData(id);
        setTableData(
          tableData.filter(item => {
            return item.id !== id;
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    },
    [tableData]
  );

  const getSearchResults = ({ searchType, filterValue }) => {
    const filteredData = data.filter(item => {
      const normalizeFilterValue = filterValue.toLowerCase();
      const normalizeSearchValue = item[searchType].toLowerCase();

      return normalizeSearchValue.includes(normalizeFilterValue);
    });

    setTableData(filteredData);
  };

  const resetTable = () => {
    setTableData(data);
  };

  return (
    <>
      <Filter
        onSearch={getSearchResults}
        onResetPage={() => goToPage(1)}
        onResetTable={resetTable}
        onResetBtn={() => setSortedTypes([])}
      />

      {Boolean(tableData.length) ? (
        <>
          <table className="Table">
            <caption className="Table-caption">Users</caption>
            <thead id="table-head">
              <tr className="Table-row">
                {tableHeadData.map(({ id, title, type, sort }) => (
                  <TableHead
                    key={id}
                    title={title}
                    sort={sort}
                    onSort={() => onSort(type)}
                    isSorted={sortedTypes.includes(type)}
                  />
                ))}
              </tr>
            </thead>

            <tbody id="table-body">
              {tableData.slice(firstIdx, lastIdx).map(user => (
                <TableItem
                  key={user.id}
                  user={user}
                  onDeleteUser={() => deleteUser(user.id)}
                  onOpenModal={() => handleToggleModal(user)}
                />
              ))}
            </tbody>
          </table>

          <div className="Table-btn-wrapper">
            <Button onClick={handleToggleModal} title={'Add new user'} />
          </div>

          {Boolean(showModal) && (
            <Modal
              onCloseModal={handleToggleModal}
              className={'Table-modal'}
              title={editingUser ? 'Edit user data' : 'Add new user'}
            >
              <UserForm
                onSendForm={editingUser ? editUser : addNewUser}
                onCloseModal={handleToggleModal}
                currentUser={editingUser}
                successMessage={
                  editingUser
                    ? 'User data changed successfully'
                    : 'User successfully added'
                }
              />
            </Modal>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
            goToPage={goToPage}
          />
        </>
      ) : (
        <p className="Table-notification">
          Nothing found. Refine your search result
        </p>
      )}
    </>
  );
};

export default Table;

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    })
  ),
};

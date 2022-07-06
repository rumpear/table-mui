import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@mui/material';
import { useState } from 'react';
import { Modal } from '../../';
import { Button } from '../../ui';

const EnhancedTableItem = ({
  user,
  onDeleteUser,
  onOpenModal,
  loading,
}) => {
  const { name, username, email, city, phone } = user;

  const [showModal, setShowModal] = useState(false);

  const handleDeleteUserModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <TableRow hover>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="left">{username}</TableCell>
        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{city}</TableCell>
        <TableCell align="left">{phone}</TableCell>
        <TableCell align="left">
          <button>Edit</button>
          <button onClick={handleDeleteUserModal}>Delete</button>
        </TableCell>
      </TableRow>

      {Boolean(showModal) && (
        <Modal
          onCloseModal={handleDeleteUserModal}
          title={'Delete the user?'}
          className={'TableItem-modal'}
        >
          <div className="TableItem-btn-wrapper">
            <Button
              onClick={onDeleteUser}
              title="Yes"
              variant="primary"
              disabled={loading}
            />
            <Button
              onClick={handleDeleteUserModal}
              title="No"
              variant="primary"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default EnhancedTableItem;

EnhancedTableItem.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  //   onOpenModal: PropTypes.func.isRequired,
};

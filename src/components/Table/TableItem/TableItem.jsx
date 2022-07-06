import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '../../ui/';
import { Modal } from '../../';

import './styles.scss';

const TableItem = ({ user, onDeleteUser, onOpenModal }) => {
  const { name, username, email, city, phone } = user;
  const [showModal, setShowModal] = useState(false);

  const handleDeleteUserModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <tr className="TableItem-row">
        <td title={name} className="TableItem-data">
          {name}
        </td>
        <td title={username} className="TableItem-data">
          {username}
        </td>
        <td title={email} className="TableItem-data">
          {email}
        </td>
        <td title={city} className="TableItem-data">
          {city}
        </td>
        <td title={phone} className="TableItem-data">
          {phone}
        </td>
        <td className="TableItem-data">
          <div className="TableItem-btn-wrapper">
            <Button onClick={onOpenModal} title="Edit" variant="primary" />
            <Button
              onClick={handleDeleteUserModal}
              title="Delete"
              variant="primary"
            />
          </div>
        </td>
      </tr>

      {Boolean(showModal) && (
        <Modal
          onCloseModal={handleDeleteUserModal}
          title={'Delete the user?'}
          className={'TableItem-modal'}
        >
          <div className="TableItem-btn-wrapper">
            <Button onClick={onDeleteUser} title="Yes" variant="primary" />
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

export default TableItem;

TableItem.propTypes = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Modal } from '../../';
import {
  BasicButton,
  BasicIconButton,
  BasicLoadingButton,
} from '../../ui';
import {
  DragDropContext,
  Draggable,
  Droppable,
} from 'react-beautiful-dnd';

import { useStyles } from './styles';

const EnhancedTableItem = ({
  user,
  onDeleteUser,
  onOpenModal,
  loading,
}) => {
  const styles = useStyles();

  const { name, username, email, city, phone } = user;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <>
      <Droppable droppableId={user.id}>
        {provided => (
          <TableRow
            hover
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{username}</TableCell>
            <TableCell align="left">{email}</TableCell>
            <TableCell align="left">{city}</TableCell>
            <TableCell align="left">{phone}</TableCell>
            <TableCell align="left">
              <Stack direction="row" spacing={1}>
                <BasicIconButton ariaLabel="edit" onClick={onOpenModal}>
                  <EditIcon />
                </BasicIconButton>
                <BasicIconButton
                  ariaLabel="delete"
                  onClick={handleToggleModal}
                >
                  <DeleteIcon />
                </BasicIconButton>
              </Stack>
            </TableCell>
            {provided.placeholder}
          </TableRow>
        )}
      </Droppable>
      <Modal
        isOpen={showModal}
        onClose={handleToggleModal}
        title="Are you sure you want to delete the user?"
      >
        <Box className={styles.btnWrapper}>
          <BasicLoadingButton
            onClick={onDeleteUser}
            loading={loading}
            variant="contained"
            label="Yes"
          />
          <BasicButton
            onClick={handleToggleModal}
            variant="contained"
            label="No"
          />
        </Box>
      </Modal>
    </>
  );
};

export default EnhancedTableItem;

EnhancedTableItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteUser: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

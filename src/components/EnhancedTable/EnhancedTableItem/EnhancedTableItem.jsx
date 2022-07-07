import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { BasicModal } from '../../';

const EnhancedTableItem = ({
  user,
  onDeleteUser,
  onOpenModal,
  loading,
}) => {
  const { name, username, email, city, phone } = user;
  const [showModal, setShowModal] = useState(false);

  const handleToggleModal = () => {
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
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="edit" onClick={onOpenModal}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={handleToggleModal}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <BasicModal
        isOpen={showModal}
        onClose={handleToggleModal}
        title="Are you sure you want to delete the user?"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '& > button': { m: 1 },
          }}
        >
          <LoadingButton
            onClick={onDeleteUser}
            loading={loading}
            variant="contained"
          >
            Yes
          </LoadingButton>
          <Button onClick={handleToggleModal} variant="contained">
            No
          </Button>
        </Box>
      </BasicModal>
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

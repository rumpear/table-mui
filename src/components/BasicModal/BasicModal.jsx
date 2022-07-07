import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  // textAlign: 'center',
};

const BasicModal = ({ children, isOpen, onClose, title }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography
          sx={{ textAlign: 'center', marginBottom: '10px' }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default BasicModal;

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ModalMui from '@mui/material/Modal';

import { useStyles } from './styles';

const Modal = ({ children, isOpen, onClose, title }) => {
  const styles = useStyles();

  return (
    <ModalMui
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <Box className={styles.modal}>
        <Typography
          className={styles.title}
          id="modal-title"
          variant="h6"
          component="h2"
        >
          {title}
        </Typography>
        {children}
      </Box>
    </ModalMui>
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

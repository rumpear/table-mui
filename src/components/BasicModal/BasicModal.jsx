import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useStyles } from './styles';

const BasicModal = ({ children, isOpen, onClose, title }) => {
  const styles = useStyles();

  return (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title">
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
    </Modal>
  );
};

export default BasicModal;

BasicModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

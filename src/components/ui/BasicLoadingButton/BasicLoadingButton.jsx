import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';

import { useStyles } from './styles';

const BasicLoadingButton = ({
  variant,
  type,
  onClick,
  label,
  disabled,
  size,
  loading,
}) => {
  const styles = useStyles();

  return (
    <LoadingButton
      variant={variant}
      className={styles.button}
      onClick={onClick}
      loading={loading}
      type={type}
      disabled={disabled}
      size={size}
    >
      {label}
    </LoadingButton>
  );
};

export default BasicLoadingButton;

BasicLoadingButton.defaultProps = {
  onClick: () => {},
  label: '',
  disabled: false,
};

BasicLoadingButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  loading: PropTypes.bool,
};

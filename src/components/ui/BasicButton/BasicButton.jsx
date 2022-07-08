import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

const BasicButton = ({
  variant,
  type,
  onClick,
  label,
  disabled,
  size,
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      size={size}
    >
      {label}
    </Button>
  );
};

export default BasicButton;

BasicButton.defaultProps = {
  onClick: () => {},
  label: '',
  disabled: false,
};

BasicButton.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

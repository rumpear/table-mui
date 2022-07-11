import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';

const BasicIconButton = ({
  children,
  ariaLabel,
  type,
  onClick,
  disabled,
  size,
}) => {
  return (
    <IconButton
      aria-label={ariaLabel}
      onClick={onClick}
      type={type}
      disabled={disabled}
      size={size}
    >
      {children}
    </IconButton>
  );
};

export default BasicIconButton;

BasicIconButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

BasicIconButton.propTypes = {
  children: PropTypes.node,
  ariaLabel: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.string,
};

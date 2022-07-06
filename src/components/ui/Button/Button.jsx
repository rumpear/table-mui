import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const BTN_TYPES = ['default', 'primary'];

const Button = ({ type, variant, onClick, title, disabled }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={classNames([
        'Button',
        { 'Button-default': variant === 'default' },
        { 'Button-primary': variant === 'primary' },
      ])}
    >
      {title}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  type: 'button',
  variant: 'default',
  onClick: () => {},
  title: '',
  disabled: false,
};

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(BTN_TYPES),
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useRef } from 'react';
import './styles.scss';

const Input = ({
  label,
  name,
  placeholder,
  value,
  variant,
  onChange,
  disabled,
  autoComplete,
  error,
  onBlur,
}) => {
  const ref = useRef(null);
  const handleLabel = () => {
    ref.current.focus();
  };

  return (
    <>
      {Boolean(label) && (
        <span className="Input-label" onClick={handleLabel}>
          {label}
        </span>
      )}
      <input
        ref={ref}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        onBlur={onBlur}
        className={classNames([
          'Input',
          { 'Input-default': variant === 'default' },
          { 'Input-error': Boolean(error) },
        ])}
      />
      <span className="Input-message-error">{error}</span>
    </>
  );
};

export default Input;

Input.defaultProps = {
  variant: 'default',
  disabled: false,
  autoComplete: 'off',
};

Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  error: PropTypes.string,
  onBlur: PropTypes.func,
};

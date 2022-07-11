import PropTypes from 'prop-types';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useStyles } from './styles';

const BasicInput = ({
  id,
  name,
  label,
  value,
  error,
  helperText,
  placeholder,
  onChange,
}) => {
  const styles = useStyles();

  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <FormControl error={error} className={styles.formControl}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        id={id}
        name={name}
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      <FormHelperText id={id} className={styles.helperText}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default BasicInput;

BasicInput.defaultProps = {
  name: '',
  label: 'input',
  error: false,
};

BasicInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

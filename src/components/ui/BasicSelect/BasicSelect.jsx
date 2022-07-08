import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useStyles } from './style';

const BasicSelect = ({
  label = 'Select option',
  options = [],
  onChange,
  value,
  name = '',
  disabled = false,
}) => {
  const styles = useStyles();

  const handleChange = e => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Box className={styles.wrapper}>
      <FormControl fullWidth>
        <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
        <Select
          name={name}
          disabled={disabled}
          labelId={`select-label-${label}`}
          id={`select-${label}`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map(item => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;

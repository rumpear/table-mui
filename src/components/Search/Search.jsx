import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { BasicSelect, BasicInput, BasicButton } from '../ui';
import { sortTableCategory } from '../../data';

import { useStyles } from './styles';

const Search = ({ onSearch, onResetPage, onResetTable, onResetSort }) => {
  const styles = useStyles();

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      input: '',
      select: 'name',
    },
  });

  const onSubmit = data => {
    if (!data.input) {
      alert('Please enter a search request');
      return;
    }
    onSearch(data);
    onResetPage();
  };

  const handleBtnReset = () => {
    reset();
    onResetPage();
    onResetTable();
    onResetSort();
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Controller
        name="select"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicSelect
            options={sortTableCategory}
            label="Select type"
            onChange={onChange}
            value={value}
          />
        )}
      />
      <Box className={styles.inputWrapper}>
        <Controller
          name="input"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <BasicInput
              id="input"
              name={name}
              label="Find your data"
              onChange={onChange}
              value={value}
              placeholder={`Please enter your request`}
            />
          )}
        />
      </Box>
      <BasicButton
        type="submit"
        label="Search"
        variant="contained"
        size="large"
      />
      <BasicButton
        label="Reset"
        variant="contained"
        size="large"
        onClick={handleBtnReset}
      />
    </Box>
  );
};

export default Search;

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onResetPage: PropTypes.func.isRequired,
  onResetTable: PropTypes.func.isRequired,
  onResetSort: PropTypes.func.isRequired,
};

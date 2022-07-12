import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { useRef } from 'react';
import { sortTableCategory } from '../../data';
import { BasicInput, BasicLoadingButton } from '../ui';
import { userFormSchema } from '../../utils';

import { useStyles } from './styles';

const TableForm = ({ onSendForm, onCloseModal, currentUser, loading }) => {
  const styles = useStyles();

  const isFirstRender = useRef(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      city: '',
      phone: '',
    },
  });

  const onSubmit = async data => {
    await onSendForm(data);

    if (!loading) {
      onCloseModal();
    }
  };

  if (isFirstRender.current && currentUser) {
    isFirstRender.current = false;

    const data = Object.entries(currentUser);
    data.forEach(([key, value]) => {
      setValue(key, value);
    });
  }

  return (
    <Box component="form" className={styles.form} autoComplete="off">
      {sortTableCategory.map(item => {
        return (
          <Controller
            name={item.id}
            key={item.id}
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Box className={styles.inputWrapper}>
                <BasicInput
                  id={item.id}
                  name={name}
                  label={item.label}
                  onChange={onChange}
                  value={value}
                  error={Boolean(errors[item.id])}
                  placeholder={`Please enter your ${item.id}`}
                  helperText={errors[item.id]?.message}
                />
              </Box>
            )}
          />
        );
      })}

      <Box className={styles.buttonWrapper}>
        <BasicLoadingButton
          label="Submit"
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          loading={loading}
          type="submit"
          size="large"
        />
      </Box>
    </Box>
  );
};

export default TableForm;

TableForm.propTypes = {
  onSendForm: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  currentUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};

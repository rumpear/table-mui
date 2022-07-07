import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRef } from 'react';
import { headCells } from '../EnhancedTable/EnhancedTableHead/EnhancedTableHead';

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'The name must not be less than two characters')
    .max(32, 'The name must not be greater than 32 characters')
    .required('Please enter your name'),
  username: yup
    .string()
    .min(2, 'The username must not be less than two characters')
    .max(32, 'The username must not be greater than 32 characters')
    .required('Please enter your username'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .max(32, 'The email must not be greater than 32 characters')
    .required('Please enter your email'),
  city: yup
    .string()
    .min(2, 'The city must not be less than two characters')
    .max(32, 'The city must not be greater than 32 characters')
    .required('Please enter your city'),
  phone: yup
    .string()
    .min(6, 'The phone must not be less than 6 characters')
    .max(20, 'The phone must not be greater than 20 characters')
    .required('Please enter your phone'),
});

const TableForm = ({ onSendForm, onCloseModal, currentUser, loading }) => {
  const isFirstRender = useRef(true);

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    onSendForm(data);
    onCloseModal();
    // reset();
  };

  if (isFirstRender.current && currentUser) {
    isFirstRender.current = false;

    const data = Object.entries(currentUser);
    data.forEach(([key, value]) => {
      setValue(key, value);
    });
  }

  // return (
  //   <>
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       {headCells.map(item => {
  //         if (item.id === 'actions') {
  //           return null;
  //         }

  //         return (
  //           <div key={item.id}>
  //             <label>{item.label}</label>
  //             <input {...register(item.id)} />
  //             <p>{errors[item.id]?.message}</p>
  //           </div>
  //         );
  //       })}

  //       <button type="submit" disabled={loading}>
  //         Submit
  //       </button>
  //     </form>
  //   </>
  // );

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiFormControl-root': { m: 1, width: '100%' },
      }}
      autoComplete="off"
    >
      {headCells.map(item => {
        if (item.id === 'actions') {
          return null;
        }

        return (
          <Controller
            name={item.id}
            key={item.id}
            control={control}
            render={({ field }) => (
              <TextField
                label={item.label}
                error={Boolean(errors[item.id])}
                helperText={errors[item.id]?.message}
                placeholder={`Enter the ${item.id} of your contact`}
                {...field}
              />
            )}
          />
        );
      })}

      {/* {headCells.map(item => {
        if (item.id === 'actions') {
          return null;
        }

        return (
          <TextField
            key={item.id}
            label={item.label}
            error={Boolean(errors[item.id])}
            helperText={errors[item.id]?.message}
            placeholder={`Enter the ${item.id} of your contact`}
            {...register(item.id)}
          />
        );
      })} */}

      <LoadingButton
        variant="contained"
        onClick={handleSubmit(onSubmit)}
        loading={loading}
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default TableForm;

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    width: '100%',
  },
  input: {
    width: '100%',
    margin: 10,
  },
  inputWrapper: { marginBottom: 15, width: '100%' },
  buttonWrapper: { marginTop: 5 },
});

import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles({
  wrapper: {
    width: '100%',
  },

  paper: { width: '100%', marginBottom: '15px' },

  table: { minWidth: '700px' },

  btnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notification: {
    fontSize: '25px',
    textAlign: 'center',
  },
});

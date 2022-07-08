import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => {
  return {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '400px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[24],
      padding: '20px 32px',
    },

    title: { textAlign: 'center', marginBottom: '10px' },
  };
});

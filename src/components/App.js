import {
  createGenerateClassName,
  jssPreset,
  StylesProvider,
  ThemeProvider,
} from '@mui/styles';
import { Route, Routes } from 'react-router-dom';
import { MainPage, TablePage } from '../pages/';
import jssIncreaseSpecificity from 'jss-increase-specificity';
import { create } from 'jss';
import { Layout } from './';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const jss = create({
  plugins: [...jssPreset().plugins, jssIncreaseSpecificity()],
});

const theme = createTheme({
  // palette: {
  //   background: { paper: 'red' },
  // },
});

const generateClassName = createGenerateClassName({
  productionPrefix: 'romanGrusha-',
  disableGlobal: false,
  seed: 'rg',
});

const App = () => {
  return (
    <StylesProvider jss={jss} generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/table" element={<TablePage />} />
          </Route>
        </Routes>
        <CssBaseline />
      </ThemeProvider>
    </StylesProvider>
  );
};

export default App;

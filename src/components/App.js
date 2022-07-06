import { Route, Routes } from 'react-router-dom';
import { MainPage, TablePage } from '../pages/';
import { Layout } from './';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/table" element={<TablePage />} />
      </Route>
    </Routes>
  );
};

export default App;

import { useCallback, useEffect, useState } from 'react';
import { getData } from '../services/tableApi';

const ERROR_MESSAGE = 'You have an error, please reload page';

export const useFetch = () => {
  const [initialData, setInitialData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');

  const fetch = useCallback(async () => {
    setIsFetching(true);
    try {
      const data = await getData();
      setInitialData(data);
      setUsersData(data);
    } catch (error) {
      setError(error?.message || ERROR_MESSAGE);
    }
    setIsFetching(false);
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  return {
    initialData,
    usersData,
    isFetching,
    error,
    setUsersData,
    setInitialData,
  };
};

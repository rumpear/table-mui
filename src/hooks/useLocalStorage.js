import { useState, useEffect } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const getData = () => {
    return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
  };
  const setData = () => {
    return localStorage.setItem(key, JSON.stringify(state));
  };

  const [state, setState] = useState(getData);
  useEffect(setData, [key, state]);

  return [state, setState];
};

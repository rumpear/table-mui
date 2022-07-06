import axios from 'axios';

axios.defaults.baseURL =
  'https://627cce7be5ac2c452af7102a.mockapi.io/materials';

export const getData = async () => {
  const { data } = await axios.get('/users');
  return data;
};

export const getCurrentData = async id => {
  const { data } = await axios.get(`/users/${id}`);
  return data;
};

export const postData = async value => {
  const { data } = await axios.post('/users', value);
  return data;
};

export const deleteData = async id => {
  const { data } = await axios.delete(`/users/${id}`);
  return data;
};

export const editData = async (id, value) => {
  const { data } = await axios.put(`/users/${id}`, value);
  return data;
};

import { headCells } from './headCells';

export const sortTableCategory = headCells.filter(item => {
  return item.id !== 'actions';
});

import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { tableHeadData } from '../Table/';
import { Button, Input } from '../ui/';

import './styles.scss';

const Filter = ({ onSearch, onResetPage, onResetTable, onResetBtn }) => {
  const [filterValue, setFilterValue] = useState('');
  const [searchType, setSearchType] = useState('name');

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!filterValue) {
      alert('Please enter a search request');
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    onSearch(data);
    onResetPage();
    onResetBtn();
  };

  const resetForm = () => {
    setFilterValue('');
    setSearchType('name');
  };

  const handleBtnReset = () => {
    resetForm();
    onResetPage();
    onResetTable();
    onResetBtn();
  };

  const handleInputChange = useCallback(e => {
    const { value } = e.target;
    setFilterValue(value);
  }, []);

  const handleSelectChange = useCallback(
    e => setSearchType(e.target.value),
    []
  );

  return (
    <>
      <p className="Filter-title">Search</p>
      <form className="Filter-wrapper" onSubmit={handleFormSubmit}>
        <select
          className="Filter-select"
          name="searchType"
          value={searchType}
          onChange={handleSelectChange}
        >
          {tableHeadData.map(({ id, type, title }) => (
            <option key={id} value={type}>
              {title}
            </option>
          ))}
        </select>

        <Input
          name="filterValue"
          placeholder={`Search by ${searchType}`}
          value={filterValue}
          onChange={handleInputChange}
        />
        <div className="Filter-btn-wrapper">
          <Button type="submit" title="Find" variant="primary" />
          <Button
            onClick={handleBtnReset}
            title="Reset"
            variant="primary"
          />
        </div>
      </form>
    </>
  );
};

export default Filter;

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onResetPage: PropTypes.func.isRequired,
  onResetTable: PropTypes.func.isRequired,
};

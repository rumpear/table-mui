import { useCallback, useEffect, useState } from 'react';
import { getData } from '../../services/tableApi';
import { Table } from '../../components/';
import { EnhancedTable } from '../../components/EnhancedTable';

import './styles.scss';

const TablePage = () => {
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getData();
      setTableData(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <h1 className="TablePage-title">Table page</h1>
      {Boolean(error) && <p className="TablePage-error">{error}</p>}

      {isLoading ? (
        <p className="TablePage-loading">Loading...</p>
      ) : (
        Boolean(tableData.length) && <EnhancedTable rows={tableData} />
      )}

      {/* {isLoading ? (
        <p className="TablePage-loading">Loading...</p>
      ) : (
        Boolean(tableData.length) && <Table data={tableData} />
      )} */}
    </>
  );
};

export default TablePage;

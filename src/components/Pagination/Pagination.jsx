import PropTypes from 'prop-types';
import './styles.scss';

const Pagination = ({
  page,
  totalPages,
  prevPage,
  nextPage,
  goToPage,
}) => {
  const totalPagesNum = [...Array(totalPages).keys()];
  const firstPage = totalPagesNum[1];
  const lastPage = totalPagesNum[totalPagesNum.length - 1] + 1;

  return (
    <div className="Pagination">
      <p className="Pagination-text">
        {page}/{totalPages}
      </p>
      <button
        onClick={prevPage}
        disabled={page === firstPage}
        className={`Pagination-button ${
          page === firstPage ? 'disabled' : ''
        }`}
      >
        ←
      </button>
      {totalPagesNum.map(num => (
        <button
          onClick={() => goToPage(num + 1)}
          key={num + 1}
          className={`Pagination-button ${
            page === num + 1 ? 'active' : ''
          }`}
        >
          {num + 1}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={page === lastPage}
        className={`Pagination-button ${
          page === lastPage ? 'disabled' : ''
        }`}
      >
        →
      </button>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  prevPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;

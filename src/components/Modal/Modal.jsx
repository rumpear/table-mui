import { VscClose } from 'react-icons/vsc';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import './styles.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onCloseModal, title, className = '' }) => {
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleEscKeydown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);

    return () => {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className="Modal-overlay" onClick={handleOverlayClick}>
      <div className={`Modal-window ${className}`}>
        <p className="Modal-title">{title}</p>
        <button
          className="Modal-closeButton"
          type="button"
          onClick={onCloseModal}
        >
          <VscClose size={20} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

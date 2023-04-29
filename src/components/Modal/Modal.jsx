import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  const handleEscKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, []);

  return createPortal(
    <div className={css.ModalBackdrop} onClick={handleBackdropClick}>
      <div className={css.ModalContent}>{children}</div>
    </div>,
    modalRoot
  );
};

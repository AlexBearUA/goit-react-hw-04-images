import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.scss';

export const ImageGalleryItem = ({ id, webFormatUrl, largeImageUrl, tags }) => {
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        onClick={toggleModal}
        className={css.ImageGalleryPicture}
        src={webFormatUrl}
        alt={tags}
      />

      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <img
            className={css.ImageGalleryBigPicture}
            src={largeImageUrl}
            alt={tags}
          />
        </Modal>
      )}
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webFormatUrl: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

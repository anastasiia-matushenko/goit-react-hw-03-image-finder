import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ url, largeImageURL, onModalOpen }) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={url}
        alt=""
        onClick={() => onModalOpen(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onModalOpen: PropTypes.func.isRequired,
};

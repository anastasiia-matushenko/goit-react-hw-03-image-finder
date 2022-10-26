import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onOpen }) => {
  return (
    <Gallery>
      {images.length > 0 &&
        images.map(({ id, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            largeImageURL={largeImageURL}
            onModalOpen={onOpen}
          />
        ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onOpen: PropTypes.func.isRequired,
};

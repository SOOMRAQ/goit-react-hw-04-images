import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Loader from '../Loader';
import Modal from '../Modal';
import { fetchImages } from '../../services/images-api';
import { StyledGallery } from './ImageGallery.styled';
import { useState } from 'react';
import { useEffect } from 'react';

const ImageGallery = ({ queryImage, page, setPage }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [btnLoadMore, setBtnLoadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  useEffect(() => {
    if (queryImage.length === 0 && page === 1) return;

    const setGallery = () => {
      fetchImages(queryImage, page)
        .then(imagesData => {
          setImages(prevImages =>
            page === 1 ? imagesData : [...prevImages, ...imagesData]
          );
          if (imagesData.length > 0) setBtnLoadMore(true);
        })
        .catch(error => {
          setError(error);
        })
        .finally(() => {
          setPending(false);
        });
    };
    setGallery();
  }, [queryImage, page]);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getLargeImage = (largeImageURL, imageAlt) => {
    toggleModal();
    largeImageURL ? setLargeImageURL(largeImageURL) : setLargeImageURL('');
    imageAlt ? setImageAlt(imageAlt) : setImageAlt('');
  };

  return (
    <>
      {error ? (
        <h1>{error.message}</h1>
      ) : (
        <StyledGallery>
          {images.map(image => {
            const { webformatURL, tags, largeImageURL } = image;
            const itemId = nanoid();
            return (
              <ImageGalleryItem
                key={itemId}
                src={webformatURL}
                alt={tags}
                largeImageURL={largeImageURL}
                getLargeImageURL={getLargeImage}
              />
            );
          })}
        </StyledGallery>
      )}
      {pending && <Loader />}
      {btnLoadMore && <Button onClick={loadNextPage} />}
      {isModalOpen && (
        <Modal onClose={toggleModal}>
          <>
            <img src={largeImageURL} alt={imageAlt} />
          </>
        </Modal>
      )}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  queryImage: PropTypes.string,
  page: PropTypes.number,
  setPage: PropTypes.func,
};

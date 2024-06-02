import { useState, useEffect } from 'react';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { fetchImages } from '../../images-api';
import SeachBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';

interface Image {
  id: string;
  title: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [modalState, setModalState] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<Image | undefined>();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const handleModalOpen = (imageId: string) => {
    setModalImage(() => {
      return images.find(image => image.id === imageId);
    });
    setModalState(true);
  };

  const handleModalClose = (): void => {
    setModalState(false);
  };

  useEffect((): void => {
    if (query === '') {
      return;
    }

    async function getImages(): Promise<void> {
      try {
        setError(false);
        setIsLoading(true);
        const data: Image[] = await fetchImages(query, page);
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [page, query]);

  return (
    <>
      <SeachBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onModal={handleModalOpen} />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {modalImage && (
        <ImageModal
          modalState={modalState}
          modalImage={modalImage}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import imagesAPI from '../services/images-api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Loader } from './Loader/Loader';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { scrollOnLoading } from '../services/scroll';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [endOfCollection, setEndOfCollection] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    setIsLoading(true);
    setShowLoadMore(false);

    imagesAPI
      .fetchImages(searchQuery, page)
      .then(({ data: { totalHits, hits: fetchedImages } }) => {
        if (totalHits === 0) {
          return toast.error('There are no images on your searchquery');
        }

        setImages(prevImages => [
          ...prevImages,
          ...normalaziedImages(fetchedImages),
        ]);

        images.length + 12 < totalHits
          ? setShowLoadMore(true)
          : setEndOfCollection(true);
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
    page > 1 && scrollOnLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  const handleSearchSubmit = newSearchQuery => {
    if (newSearchQuery === searchQuery) {
      return toast.success('Images on your serchquery are already loaded');
    }
    setSearchQuery(newSearchQuery);
    setPage(1);
    setImages([]);
    setEndOfCollection(false);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const normalaziedImages = images => {
    return images.map(({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    }));
  };

  return (
    <>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery>
        {images.length > 0 &&
          images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webFormatUrl={webformatURL}
              largeImageUrl={largeImageURL}
              tags={tags}
            />
          ))}
      </ImageGallery>
      {showLoadMore && <LoadMoreBtn onClick={loadMore} />}
      {isloading && <Loader />}
      {endOfCollection && (
        <p className="TheEnd">You've reached the end of collection.</p>
      )}
      <ToastContainer autoClose={1500} />
    </>
  );
};

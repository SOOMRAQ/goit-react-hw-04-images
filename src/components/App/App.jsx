import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from 'components/ImageGallery';
import Searchbar from 'components/Searchbar';
import { useEffect } from 'react';

const App = () => {
  const [imageName, setImageName] = useState('');
  const [page, setPage] = useState(1);
  const formSubmitHandler = imageName => {
    setImageName(imageName);
    setPage(1);
  };

  useEffect(() => {
    console.log('App imag:', imageName);
  }, [imageName]);
  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery queryImage={imageName} page={page} setPage={setPage} />
      <ToastContainer />
    </>
  );
};

export default App;

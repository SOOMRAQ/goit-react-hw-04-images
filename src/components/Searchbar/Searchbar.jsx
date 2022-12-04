import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from 'components/IconButton';
import { StyledForm, StyledInput } from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleNameChange = event => {
    const { value } = event.currentTarget;
    setImageName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageName.trim() === '') {
      return toast.error('Image not found ;(', {
        theme: 'dark',
      });
    }
    onSubmit(imageName);
    setImageName('');
  };
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        value={imageName}
        onChange={handleNameChange}
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
      <IconButton type="submit" aria-label="Search">
        <SearchIcon width="20" height="20" fill="#fff" />
      </IconButton>
    </StyledForm>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

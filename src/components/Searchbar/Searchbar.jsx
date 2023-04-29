import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import css from './Searchbar.module.scss';

export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQueryChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery === '') {
      return toast.error('Fill in the search field');
    }

    onSubmit(searchQuery.trim());
    setSearchQuery('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <ImSearch className={css.SearchFormButtonIcon} />
        </button>

        <input
          className={css.SearchFormIinput}
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

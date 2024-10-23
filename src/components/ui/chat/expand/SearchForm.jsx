import { useState } from "react";
import PropTypes from "prop-types";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // called in 2 place
  };

  return (
    <form
      className="rounded-full border overflow-hidden w-full flex-grow max-w-md flex items-center bg-white"
      onSubmit={handleSubmit}
    >
      <input
        type="search"
        className="px-3 lg:px-4 py-2 w-full focus:outline-none bg-transparent"
        value={query}
        onChange={(e) => {
          const value = e.target.value
          setQuery(value)
          onSearch(value); // called in 2 place
        }}
        placeholder="Dokument durchsuchen..."
      />
      <button type="submit" className="py-2 px-3">🔍</button>
    </form>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;

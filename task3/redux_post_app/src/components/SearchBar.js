const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts by title..."
        aria-label="Search posts by title"
      />
    </div>
  );
};

export default SearchBar;
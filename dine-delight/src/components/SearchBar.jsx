import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';






const SearchBar = ({ onSearch, placeholder = 'Search restaurants, cuisines...' }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => onSearch(query), 300);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="input-premium pl-12 pr-4"
        maxLength={100} />
      
    </div>);

};

export default SearchBar;
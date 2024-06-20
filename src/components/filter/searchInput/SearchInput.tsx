import React, { useState, useEffect } from 'react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  debounceDelay?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder, debounceDelay = 300 }) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(inputValue);
    }, debounceDelay);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, onChange, debounceDelay]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return <input type="text" value={inputValue} onChange={handleChange} placeholder={placeholder} />;
};

export default SearchInput;

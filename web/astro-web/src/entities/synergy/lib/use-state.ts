import { useState } from 'react';

export const useSynergyStates = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState<any[]>([]);

  const setter = {
    setSearchText,
    setSearchResult,
  };
  const getter = {
    searchText,
    searchResult,
  };

  return {
    ...setter,
    ...getter,
  };
};

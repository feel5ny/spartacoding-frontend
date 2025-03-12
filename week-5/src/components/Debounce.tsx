import { useState, useEffect, ChangeEvent } from 'react';
import debounce from 'lodash/debounce';

export const DebouncedInputComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  /**
   * 일반적으로 호출하는 형태
   */
  const onSearch = async (searchQuery: string) => {
    if (searchQuery.length === 0) {
      setResults([]);
      return;
    }
    console.log('Fetching results for:', searchQuery);

    setResults([`Result for "${searchQuery}"`]); // 예시 응답
  };

  /**
   * debounce처리된 형태
   */
  const fetchResults = debounce(async (searchQuery) => {
    if (searchQuery.length === 0) {
      setResults([]);
      return;
    }
    console.log('Fetching results for:', searchQuery);

    // 여기서 실제 API 호출이 들어갑니다.
    setResults([`Result for "${searchQuery}"`]); // 예시 응답
  }, 500); // 500ms 후에 실행

  useEffect(() => {
    fetchResults(query);
    // onSearch(query);
  }, [query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
};

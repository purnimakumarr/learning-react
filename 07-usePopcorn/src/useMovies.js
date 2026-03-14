import { useState, useEffect } from "react";

const KEY = '90bb2934';

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const controller = new AbortController();
        async function fetchMovies() {
          setError('');
          setIsLoading(true);
          try {
            const res = await fetch(
              `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
              { signal: controller.signal }
            );
    
            if (!res.ok) throw new Error('Something went wrong fetching movies');
    
            const data = await res.json();
    
            if (data.Response === 'False') {
              throw new Error(data.Error);
            }
            setMovies(data.Search);
            setError('');
          } catch (err) {
            if (err.name === 'AbortError') return;
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        }
        if (query.length < 3) {
          setMovies([]);
          setError('');
          return;
        }
    
        fetchMovies();
    
        return function () {
          controller.abort();
        };
      }, [query]);

    return {movies, isLoading, error};
}
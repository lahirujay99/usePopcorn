import { useState, useEffect } from "react";

const KEY = "5b1acce8";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } // fetch request yanawa search karana akura gane eka hinda controller ekak danne .request ekak giyapu gaman thawa mokak hari type karoth araka abort wela aluth ekak yanwa
          );
          // if there network error or somekind failure
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies..");
          // if movie not found
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
        } catch (err) {
          console.log(err.message);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleClosedMovie();
      fetchMovies(); // function should call, if not it won't working

      return function () {
        // mathak karala clean up karanna one effect ekak use karanawanan
        controller.abort();
      };
    },
    [query] //use query in dependancy array to synchronize with movie data
  );

  return { movies, isLoading, error };
}

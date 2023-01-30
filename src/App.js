import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Making the fetch inside of App.js as doing it inside MoviesList would make that component non-reusable, it's good practice to have states in the parent component rather than child components
  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null); //clear prev errors

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json(); //translate json response body to js object
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.releaseDate,
        };
      });

      setMovies(transformedMovies);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false); //if successful or err, no longer loading
  }

  let content = <p>Found no movies.</p>;
  // must have states in the if statements to ensure that the statement would re-run
  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>Loading...</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
        {/* every request will have these states "loading", "erros", "recieved data", "empty data" */}
        {/* {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>} */}
      </section>
    </React.Fragment>
  );
}

export default App;

/*
    //CODE IN fetchMovieHandler() USING THEN, INSTEAD OF ASYNC AWAIT
    fetch('https://swapi.dev/api/films')
      .then((response) => {
        return response.json(); //translate json response body to js object
      })
      .then((data) => {
        // transformedMovies will be an array of objects
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.releaseDate,
          };
        });

        setMovies(transformedMovies);
      });
      */

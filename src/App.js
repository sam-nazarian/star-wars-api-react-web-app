import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Making the fetch inside of App.js as doing it inside MoviesList would make that component non-reusable, it's good practice to have states in the parent component rather than child components
  async function fetchMovieHandler() {
    // setIsLoading(true);

    const response = await fetch('https://swapi.dev/api/films');
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
    // setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
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

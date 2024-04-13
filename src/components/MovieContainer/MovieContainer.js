import { useEffect, useState, forwardRef } from "react";
import MovieCard from "../MovieCard/MovieCard";
import styles from "./MovieContainer.module.css";
import Shimmer from "../Shimmer/Shimmer";
import { MOVIE_LIST_API } from "../../utils/constants";
const MovieContainer = forwardRef(({ year, genre }, containerRef) => {
  const [allMovies, setAllMovies] = useState(
    Array(20).fill(<Shimmer></Shimmer>)
  );
  useEffect(() => {
    const getMovies = async () => {
      let URI = `${MOVIE_LIST_API}&primary_release_year=${year}&api_key=${process.env.REACT_APP_API_KEY}`;
      if (!genre.includes(-1)) {
        URI += `&with_genres=${genre.join(",")}`;
      }
      const response = await fetch(URI);
      const moviesList = await response.json();
      const movieList = moviesList.results?.map((movie) => {
        return (
          <MovieCard
            background={movie.poster_path}
            name={movie.title}
            rating={movie.vote_average}
            key={movie.id}
            voteCount={movie.vote_count}
          ></MovieCard>
        );
      });
      setAllMovies(movieList);
    };
    getMovies();
  }, [genre]);

  return (
    <div className={styles["movie-container"]} id={year} ref={containerRef}>
      <h1 className={styles["movie-year"]}>{year}</h1>
      <div className={styles["movie-list"]}>
        {allMovies.length > 0 ? allMovies : <div>No Movies Found</div>}
      </div>
    </div>
  );
});

export default MovieContainer;

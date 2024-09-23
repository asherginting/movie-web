"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchMovies,
  addFavorite,
  removeFavorite,
  fetchGenres,
} from "../store/slice";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  posterPath: string;
  rating: number;
}

const ListMovie = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const genres = useSelector((state: RootState) => state.movies.genres);
  const favorites = useSelector((state: RootState) => state.movies.favorites);
  const status = useSelector((state: RootState) => state.movies.status);
  const error = useSelector((state: RootState) => state.movies.error);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleFavorite = (movie: Movie) => {
    if (favorites.find((fav) => fav.id === movie.id)) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
    setCurrentPage(1);
    dispatch(fetchMovies({ page: 1, genreId: event.target.value }));
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    dispatch(fetchMovies({ page: nextPage, genreId: selectedGenre }));
  };

  const filteredMovies =
    selectedGenre === ""
      ? movies
      : movies.filter((movie) =>
          movie.genre_ids.includes(parseInt(selectedGenre))
        );

  return (
    <div className="container mx-auto p-4">
      <div className="pb-4">
        <GenreSelect
          selectedGenre={selectedGenre}
          genres={genres}
          onChange={handleGenreChange}
        />
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>{error}</div>}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="relative">
            <MovieCard
              title={movie.title}
              posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={Math.round(movie.vote_average)}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
              onFavoriteToggle={() =>
                handleFavorite({
                  ...movie,
                  posterPath: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  rating: Math.round(movie.vote_average),
                })
              }
            />
          </div>
        ))}
      </div>
      {status !== "loading" && filteredMovies.length > 0 && (
        <div className="flex justify-center p-4">
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      )}
    </div>
  );
};

interface GenreSelectProps {
  selectedGenre: string;
  genres: { id: number; name: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GenreSelect = ({ selectedGenre, genres, onChange }: GenreSelectProps) => (
  <select
    id="genre"
    name="genre"
    value={selectedGenre}
    onChange={onChange}
    className="mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-black"
  >
    <option value="">All</option>
    {genres &&
      genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
  </select>
);

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => (
  <button
    onClick={onClick}
    className="mt-1 block pl-3 pr-4 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white text-black"
  >
    Load More
  </button>
);

export default ListMovie;

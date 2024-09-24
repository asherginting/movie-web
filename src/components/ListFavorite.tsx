"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { removeFavorite } from "../store/slice";
import MovieCard from "./MovieCard";
import Head from "next/head";

const ListFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  const handleRemoveFavorite = (movieId: number) => {
    const movie = favorites.find((fav) => fav.id === movieId);
    if (movie) {
      dispatch(removeFavorite(movie));
    }
  };

  return (
    <>
      <Head>
        <title>Favorites - My Movie App</title>
        <meta name="description" content="List of your favorite movies." />
      </Head>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center md:text-left">
          Favorites
        </h1>
        {favorites.length === 0 ? (
          <NoFavoritesMessage />
        ) : (
          <MovieGrid
            movies={favorites}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}
      </div>
    </>
  );
};

interface MovieGridProps {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }[];
  onRemoveFavorite: (movieId: number) => void;
}

const MovieGrid = ({ movies, onRemoveFavorite }: MovieGridProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {movies.map((movie) => (
      <div key={movie.id} className="relative">
        <MovieCard
          title={movie.title}
          posterPath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          rating={Math.round(movie.vote_average)}
          isFavorite={true}
          onFavoriteToggle={() => onRemoveFavorite(movie.id)}
        />
      </div>
    ))}
  </div>
);

const NoFavoritesMessage = () => (
  <p className="text-center md:text-left">No favorites yet.</p>
);

export default ListFavorites;

import React from 'react';
import MovieCard from '../../movieCard/MovieCard';

interface Cinema {
  id: string;
  name: string;
  movieIds: string[];
}

interface Movie {
  id: string;
  title: string;
  genre: string;
  posterUrl: string;
}

interface MovieCardListProps {
  movies: Movie[];
  selectedCinema: string;
  selectedGenre: string;
  searchTitle: string;
  cinemas: Cinema[];
  genresMapping: { [key: string]: string };
}


const genresMapping: { [key: string]: string } = {
    action: 'Боевик',
    adventure: 'Приключение',
    comedy: 'Комедия',
    drama: 'Драма',
    fantasy: 'Фэнтези',
    thriller: 'Триллер',
    horror: 'Ужасы',
  };

const MovieCardList: React.FC<MovieCardListProps> = ({
  movies,
  selectedCinema,
  selectedGenre,
  searchTitle,
  cinemas,
  genresMapping,
}) => {
  const filteredMovies = movies.filter((movie) => {
    const cinemaFilter = selectedCinema.trim();
    const genreFilter = selectedGenre.trim().toLowerCase();
    const titleFilter = searchTitle.trim().toLowerCase();

    return (
      (!cinemaFilter || cinemas.find((cinema) => cinema.id === cinemaFilter)?.movieIds.includes(movie.id)) &&
      (!genreFilter || movie.genre.toLowerCase() === genreFilter) &&
      (!titleFilter || movie.title.toLowerCase().startsWith(titleFilter))
    );
  });

  const sortedMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      {sortedMovies.map((movie, index) => (
        <MovieCard
          key={index}
          movie={movie}
          quantity={0}
          genresMapping={genresMapping}
          isFullWidth={false}
          onDelete={() => {}}
          showCloseIcon={false}
          onClose={() => {}}
        />
      ))}
    </div>
  );
};

export default MovieCardList;

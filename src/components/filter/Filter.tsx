'use client'

import React, { useState, useEffect } from 'react';
import Loading from '../loading/Loading';
import { get } from '@/components/api';
import MovieCardList from '@/components/filter/movieCardList/MovieCardList';
import CinemaDropdown from '@/components/filter/cinemaDropdown/CinemaDropdown';
import GenreDropdown from '@/components/filter/genreDropdown/GenreDropdown';
import SearchInput from '@/components/filter/searchInput/SearchInput';
import styles from './Filter.module.css';


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

const genresMapping: { [key: string]: string } = {
  action: 'Боевик',
  adventure: 'Приключение',
  comedy: 'Комедия',
  drama: 'Драма',
  fantasy: 'Фэнтези',
  thriller: 'Триллер',
  horror: 'Ужасы',
};

const Filter: React.FC = () => {
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [isCinemaDropdownOpen, setIsCinemaDropdownOpen] = useState(false);
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const getCinemas = async () => {
    try {
      const response = await get('/cinemas');
      setCinemas(response);
    } catch (error) {
      console.error('Ошибка при получении списка кинотеатров:', error);
    }
  };

  const getAllGenres = (movies: Movie[]): string[] => {
    const genresSet = new Set<string>();
    movies.forEach((movie) => genresSet.add(movie.genre));
    return Array.from(genresSet);
  };

  const getAllMovies = async () => {
    try {
      const response = await get('/movies');
      setMovies(response);
      setGenres(getAllGenres(response));
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при получении списка фильмов:', error);
    }
  };

  useEffect(() => {
    getCinemas();
    getAllMovies();
  }, []);

  const toggleCinemaDropdown = () => {
    setIsCinemaDropdownOpen(!isCinemaDropdownOpen);
    setIsGenreDropdownOpen(false);
  };

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
    setIsCinemaDropdownOpen(false);
  };

  const isAllGenresSelected = selectedGenre === '';
  const isAllCinemasSelected = selectedCinema === '';

  const selectCinema = (cinemaId: string) => {
    setSelectedCinema(cinemaId);
    setIsCinemaDropdownOpen(false);
  };

  const selectGenre = (genre: string) => {
    setSelectedGenre(genre);
    setIsGenreDropdownOpen(false);
  };
  
  return (
    <div className={`${styles.content}`}>
      <div className={`${styles.filterWrapper} whiteBackground`}>
        <div className={styles.contentSelectWrapper}>
          <h3>Фильтр поиска</h3>
          <div className={styles.selectWrapper}>
            <div className={styles.select}>
              <label>Название</label>
              <SearchInput value={searchTitle} onChange={setSearchTitle} placeholder="Введите название" />
            </div>
            <div className={styles.select}>
              <GenreDropdown
                selectedGenre={selectedGenre}
                genres={genres}
                onSelectGenre={selectGenre}
                isGenreDropdownOpen={isGenreDropdownOpen}
                toggleGenreDropdown={toggleGenreDropdown}
              />
            </div>
            <div className={styles.select}>
              <CinemaDropdown
                selectedCinema={selectedCinema}
                cinemas={cinemas}
                onSelectCinema={selectCinema}
                isCinemaDropdownOpen={isCinemaDropdownOpen}
                toggleCinemaDropdown={toggleCinemaDropdown}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.movieCardsWrapper}>
        {isLoading ? (
          <Loading /> 
        ) : (
          <MovieCardList
            movies={movies}
            selectedCinema={selectedCinema}
            selectedGenre={selectedGenre}
            searchTitle={searchTitle}
            cinemas={cinemas}
            genresMapping={genresMapping}
          />
        )}
      </div>
    </div>
  );
};

export default Filter;

'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import Image from 'next/image';

import MovieCard from '@/components/movieCard/MovieCard';
import Loading from '@/components/loading/Loading';

import { StoreProvider } from '@/redux/services/StoreProvider';
import { selectTicketQuantities, setTicketQuantity } from '@/redux/features/cart';
import { get } from '@/components/api';

import styles from './page.module.css';

const genresMapping = {
  action: 'Боевик',
  adventure: 'Приключение',
  comedy: 'Комедия',
  drama: 'Драма',
  fantasy: 'Фэнтези',
  thriller: 'Триллер',
  horror: 'Ужасы',
};

interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

interface Movie {
  id: string;
  title: string;
  genre: string;
  posterUrl: string;
}

interface MovieCardProps {
  movie: Movie;
  genresMapping: { [key: string]: string };
  quantity: number;
  onDelete: () => void;
  showCloseIcon: boolean;
  onClose: (movieId: string) => void;
  isFullWidth: boolean;
}

const Modal: React.FC<ModalProps> = ({ onClose, onConfirm }) => {
  return createPortal(
    <div className={styles.modalWrapper}>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>
            <h4>Удаление билета</h4>
            <div className={styles.closeButton} onClick={onClose}>
              <Image src="/close.svg" alt="Description of the image" width={10} height={10} />
            </div>
          </div>
          <p className={styles.modalText}>Вы уверены, что хотите удалить билет?</p>
          <div className={styles.modalButtons}>
            <div className={styles.modalButtonYes} onClick={onConfirm}>
              Да
            </div>
            <div className={styles.modalButtonNo} onClick={onClose}>
              Нет
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modalBackdrop} onClick={onClose} />
    </div>,
    document.getElementById('modal-root') as HTMLElement
  ) as React.ReactPortal;
};

const CartPage: React.FC = () => {
  const ticketQuantities = useSelector(selectTicketQuantities);
  const totalTicketQuantity = Object.values(ticketQuantities).reduce((acc, cur) => acc + cur, 0);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const handleCloseMovieCard = (movieId: string) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const getAllMovies = async () => {
    try {
      const response = await get('/movies');
      setMovies(response);
      setIsLoading(false);
    } catch (error) {
      console.error('Ошибка при получении списка фильмов:', error);
    }
  };

  const handleDeleteMovie = (movieId: string) => {
    setSelectedMovieId(movieId);
  };

  const handleDeleteMovieConfirmed = () => {
    if (selectedMovieId) {
      dispatch(setTicketQuantity({ movieId: selectedMovieId, quantity: 0 }));
    }
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  const moviesWithTickets = movies.filter((movie) => ticketQuantities[movie.id] > 0);

  return (
    <div className={styles.cartWrapper}>
      {isLoading ? (
        <Loading />
      ) : moviesWithTickets.length === 0 ? (
        <p>Ваша корзина пуста</p>
      ) : (
        <div className={styles.cardsAndTotal}>
          <div className={styles.cartContent}>
            {moviesWithTickets.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                genresMapping={genresMapping}
                quantity={ticketQuantities[movie.id]}
                onDelete={() => handleDeleteMovie(movie.id)}
                showCloseIcon={true}
                onClose={handleCloseMovieCard}
                isFullWidth={true}
              />
            ))}
          </div>
          <div className={styles.totalTicketQuantity}>
            <h2>Итого билетов:</h2>
            <p>{totalTicketQuantity}</p>
          </div>
        </div>
      )}
      {isModalOpen && selectedMovieId && (
        <Modal onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteMovieConfirmed} />
      )}
    </div>
  );
};

const CartPageWrapper: React.FC = () => (
  <StoreProvider>
    <CartPage />
  </StoreProvider>
);

export default CartPageWrapper;
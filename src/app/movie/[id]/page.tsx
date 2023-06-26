'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTicketQuantity, CartState } from '@/redux/features/cart';
import Image from 'next/image';
import { get } from '@/components/api';
import Loading from '@/components/loading/Loading';
import styles from './page.module.css';


const genresMapping: { [key: string]: string } = {
  action: 'Боевик',
  adventure: 'Приключение',
  comedy: 'Комедия',
  drama: 'Драма',
  fantasy: 'Фэнтези',
  thriller: 'Триллер',
  horror: 'Ужасы',
};

interface Movie {
  id: string;
  title: string;
  genre: string;
  posterUrl: string;
  releaseYear: number;
  rating: number;
  director: string;
  description: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  avatarUrl: string;
}

const MoviePage = ({ params }: { params: { id: number } }) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const id = `${params.id}`;
  const ticketQuantity = useSelector((state: { cart: CartState }) => state.cart[id] || 0);
  const dispatch = useDispatch();
  const isMinusDisabled = ticketQuantity === 0;
  const isPlusDisabled = ticketQuantity === 30;

  useEffect(() => {
    if (id) {
      getMovie(id as string);
      getReviews(id as string);
    }
  }, [id]);

  const getMovie = async (movieId: string) => {
    try {
      const response = await get(`movie?movieId=${movieId}`);
      setMovie(response);
    } catch (error) {
      console.error('Ошибка при получении информации о фильме:', error);
    }
  };

  const getReviews = async (movieId: string) => {
    try {
      const response = await get(`/reviews?movieId=${movieId}`);
      setReviews(response);
    } catch (error) {
      console.error('Ошибка при получении отзывов:', error);
    }
  };

  const handleTicketIncrement = () => {
    dispatch(setTicketQuantity({ movieId: id, quantity: ticketQuantity + 1 }));
  };

  const handleTicketDecrement = () => {
    if (ticketQuantity > 0) {
      dispatch(setTicketQuantity({ movieId: id, quantity: ticketQuantity - 1 }));
    }
  };

  if (!movie) {
    return <Loading />;
  }

  return (
    <div className={styles.movieContent}>
      <div className={styles.movieCard}>
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          className={styles.moviePoster}
          width={400}
          height={500}
        />
        <div className={styles.movieDescriptionAll}>
          <div className={styles.movieTitleContent}>
            <h2 className={styles.movieTitle}>{movie.title}</h2>
            <div className={styles.ticketContent}>
              <button
                onClick={handleTicketDecrement}
                disabled={isMinusDisabled}
                className={`${styles.ticketButton} ${isMinusDisabled ? styles.disabled : ''}`}
              >
                -
              </button>
              <p>{ticketQuantity}</p>
              <button
                onClick={handleTicketIncrement}
                disabled={isPlusDisabled}
                className={`${styles.ticketButton} ${isPlusDisabled ? styles.disabled : ''}`}
              >
                +
              </button>
            </div>
          </div>
          <div className={styles.mainDescription}>
            <p className={styles.mainOption}>
              Жанр: <span>{genresMapping[movie.genre]}</span>
            </p>
            <p className={styles.mainOption}>
              Год выпуска: <span>{movie.releaseYear}</span>
            </p>
            <p className={styles.mainOption}>
              Рейтинг: <span>{movie.rating}</span>
            </p>
            <p className={styles.mainOption}>
              Режиссер: <span>{movie.director}</span>
            </p>
          </div>
          <div className={styles.movieDescription}>
            <p>Описание</p>
            <span>{movie.description}</span>
          </div>
        </div>
      </div>
      <div className={styles.reviewCard}>
        {reviews.length > 0 ? (
          <ul className={styles.reviewContent}>
            {reviews.map((review) => (
              <li key={review.id} className={styles.review}>
                <div className={styles.reviewAvatar}>
                  <Image
                    src={review.avatarUrl || '/photo.svg'}
                    width={32}
                    height={32}
                    alt="Picture of the author"
                  />
                </div>
                <div className={styles.reviewText}>
                  <div className={styles.reviewTitle}>
                    <h2>{review.name}</h2>
                    <p>
                      Оценка: <span>{review.rating}</span>
                    </p>
                  </div>
                  <span>{review.text}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Нет отзывов для этого фильма.</p>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
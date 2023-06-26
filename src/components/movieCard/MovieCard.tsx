import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MovieCard.module.css';
import Link from 'next/link';
import { setTicketQuantity } from '@/redux/features/cart';
import Image from 'next/image'
import { RootState } from '@/redux/store';

interface Ticket {
  movieId: string;
  quantity: number;
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



const MovieCard: React.FC<MovieCardProps> = ({ movie, genresMapping, quantity,showCloseIcon, onClose, isFullWidth = false }) => {
  const dispatch = useDispatch();
  const ticketQuantity: number = useSelector((state: RootState) => state.cart[movie.id] || 0);
  const isMinusDisabled = ticketQuantity === 0;
  const isPlusDisabled = ticketQuantity === 30;
  const imageStyle = {
    padding: '3.75px',
  }

  const handleTicketIncrement = () => {
    dispatch(setTicketQuantity({ movieId: movie.id, quantity: ticketQuantity + 1 }));
  };

  const handleTicketDecrement = () => {
    if (ticketQuantity === 1 && showCloseIcon) {
      onClose(movie.id);
      return;
    } else {
      dispatch(setTicketQuantity({ movieId: movie.id, quantity: ticketQuantity - 1 }));
    }
    if (ticketQuantity > 0) {
      dispatch(setTicketQuantity({ movieId: movie.id, quantity: ticketQuantity - 1 }));
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose(movie.id); 
    }
  };
  
  return (
    <div className={`${styles.movieCard} ${isFullWidth ? styles.fullWidth : ''} whiteBackground`}>
      <Link href={`/movie/${movie.id}`}>
        <Image src={movie.posterUrl} 
        alt={movie.title} 
        width={100}
        height={120} />
      </Link>
      <div className={styles.movieCardContent}>
        <Link href={`/movie/${movie.id}`}>
          <div className={styles.movieCardTitleAndGenre}>
            <h4>{movie.title}</h4>
            <p>{genresMapping[movie.genre]}</p>
          </div>
        </Link>
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
          {showCloseIcon && (
        <div className={styles.closeButton} onClick={handleCloseClick}>
          <Image
            src="/close.svg"
            alt="Description of the image"
            width={20}
            height={20}
            style ={imageStyle}
          />
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

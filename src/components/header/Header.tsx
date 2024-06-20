'use client'
import React from 'react'
import styles from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { selectTicketQuantities } from '@/redux/features/cart';


const Header: React.FC = () => {
  const ticketQuantities: { [key: string]: number } = useSelector(selectTicketQuantities);
  const totalTicketQuantity = Object.values(ticketQuantities).reduce((acc: number, cur: number) => acc + cur, 0);
  return (
    <div className={`${styles.header} block`}>
      <Link href="/">
        <h1>Билетопоиск</h1>
      </Link>
      <Link href={{ pathname: '/cart/'}}>
        <div className={styles.headerCart}>
        {totalTicketQuantity > 0 && (
            <div className={styles.counterCart}>{totalTicketQuantity}</div>
          )}
          <Image
          src="/market.svg"
          width={27}
          height={25}
          alt="Picture of the author"
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
          />
        </div>
      </Link>
    </div>
  )
}

export default Header

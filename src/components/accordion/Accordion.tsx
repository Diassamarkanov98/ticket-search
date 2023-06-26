'use client';

import React , {useState} from 'react'
import styles from './Accordion.module.css'
import { AccordionData } from './types'
import AccordionItem from './accordionItem/AccordionItem'

function Accordion({items}: {items: Array<AccordionData>}) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
  };

  return (
    <ul className={styles.accordion}>
      {
        items.map((item, idx) => (
          <AccordionItem 
          key ={idx} 
          data={item} 
          isOpen={idx === currentIdx} 
          btnOnClick={() => btnOnClick(idx)}
          />
      ))}
    </ul>
  );
}

export default Accordion
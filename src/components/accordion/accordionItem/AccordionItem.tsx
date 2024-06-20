'use client';
import React, { useEffect, useRef, useState } from 'react'
import styles from './AccordionItem.module.css'
import { AccordionData } from '../types'

function AccordionItem({ 
    data, 
    isOpen,
    btnOnClick,
  }: {
    data: AccordionData, 
    isOpen: boolean;
    btnOnClick: () => void;
  }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
  
    useEffect(() => {
      if (isOpen && contentRef.current) {
        const contentEl = contentRef.current;
        setHeight(contentEl.scrollHeight);
      } else {
        setHeight(0);
      }
    }, [isOpen]);
  
  
    return (
      <li className={`${styles.accordionItem} whiteBackground ${isOpen ? 'active' : ''}`}>
        <h2 className={styles.accordionItemTitle}>
          <button className={`${styles.accordionItemBtn} whiteBackground`} onClick={btnOnClick}>
            <p>{data.title}</p>
            <img src='/arrow_down.svg' className={` ${
                    isOpen ? `${styles.rotate}` : ''
                  }`}
            ></img>
          </button>
        </h2>
        <div className={styles.accordionItemContainer} style={{ height }}>
          <div ref={contentRef} className={styles.accordionItemContent}>
            {data.content}
          </div>
        </div>
      </li>
    );
  }
  
  export default AccordionItem;
  

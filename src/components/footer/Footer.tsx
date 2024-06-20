import React from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'

const links = [
    {
        id: 1,
        title:"Вопросы-ответы",
        url: "faq"
    },
    {
        id:2,
        title:"О нас",
        url: "about"
    }
]
const Footer = () => {
  return (
    <div className={`${styles.footer} block`}>
        {links.map((link) =>(
            <Link key={link.id} href ={link.url} className={styles.footer_links}>{link.title}</Link>
        ))}  
    </div>
  )
}

export default Footer

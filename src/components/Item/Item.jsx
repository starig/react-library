import React from 'react';
import styles from './Item.module.scss';
import img from '../../assets/book.jpg'

const Item = ({title, authors, category, imgUrl}) => {
    return (
        <div className={styles.item}>
            <img src={imgUrl ? imgUrl : img} alt='book' className={styles.img}/>
            <div className={styles.category}>Категория: {category ? category : 'Без категории'}</div>
            <div className={styles.title}>Название: {title}</div>
            <div className='itemAuthor'>
                Автор: {authors ? authors.map(item => item) : 'Автор не указан'}
            </div>
        </div>
    )
}

export default Item;
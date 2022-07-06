import React, {useEffect, useState} from 'react';
import styles from './Bookpage.module.scss';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchBook} from "../redux/slices/bookSlice";
import loader from './../assets/loader.gif';
import emptyImg from './../assets/book.jpg'

const BookPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.book.isLoading);
    const { title, authors, categories, subtitle} = useSelector(state => state.book.book.volumeInfo);
    const imgUrl = useSelector(state => state.book.book.volumeInfo.imageLinks?.medium);

    const fetchItem = async () => {
        try {
            dispatch(fetchBook(id));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect( () => {
        fetchItem();
    }, []);





    return (
        <div>
            {
                isLoading ? <div className={styles.loader}>
                    <img src={loader} alt={'loading'} />
                </div> : <div className={styles.bookpage}>
                    <div className={styles.imageBlock}>
                        <img className={styles.image} src={imgUrl ? imgUrl : emptyImg} alt={'Book image'}/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.category}>Категории: {categories}</div>
                        <div className={styles.title}>Название: {title}</div>
                        <div className={styles.authors}>Авторы: {authors}</div>
                        <div className={styles.subtitle}>Описание: {subtitle}</div>
                    </div>
                </div>
            }
            <Link to={'/'}>
                <div className={styles.footer}>
                    <button className={styles.backButton}>back</button>
                </div>
            </Link>
        </div>
    )
}

export default BookPage;
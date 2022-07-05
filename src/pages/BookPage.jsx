import React, {useEffect, useState} from 'react';
import styles from './Bookpage.module.scss';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchBook} from "../redux/slices/bookSlice";
import loader from './../assets/loader.gif';
import emptyImg from './../assets/book.jpg'

const BookPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.book.isLoading);
    const { title, authors, categories, subtitle} = useSelector(state => state.book.book.volumeInfo);
    const imgUrl = useSelector(state => state.book.book.volumeInfo.imageLinks.medium);

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
        <div className={styles.bookpage}>
            {
                isLoading && <div>
                    <img src={loader} alt={'loading'} />
                </div>
            }
            <div className={styles.imageBlock}>
                <img className={styles.image} src={imgUrl ? imgUrl : emptyImg} alt={'Book image'}/>
            </div>
            <div className={styles.info}>
                <div className={styles.category}>{categories}</div>
                <div className={styles.title}>{title}</div>
                <div className={styles.authors}>{authors}</div>
                <div className={styles.subtitle}>{subtitle}</div>
            </div>
        </div>
    )
}

export default BookPage;
import React from 'react';
import Item from "./Item";
import styles from './Content.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchBooks, pagePlus} from "../redux/slices/itemsSlice";
import loaderGif from './../assets/loader.gif';

const Content = () => {
    const { totalItems } = useSelector(state => state.items.items);
    const isLoading = useSelector(state => state.items.isLoading);
    const books = useSelector(state => state.items.items.items);
    const page = useSelector(state => state.items.page);
    const q = useSelector((state) => state.search.inputValue);
    const dispatch = useDispatch();

    const onClickLoadMore = async () => {
        dispatch(pagePlus());
        try {
            dispatch(fetchBooks({q, page}));
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Found {totalItems ? totalItems : 0} items</div>
            <div className={styles.content}>
                {books && books.map((item, id) => {
                    return <Item key={id}
                                 title={item.volumeInfo.title}
                                 authors={item.volumeInfo.authors}
                                 category={item.volumeInfo.categories}
                                 imgUrl={item.volumeInfo.imageLinks?.thumbnail}/>
                })}

            </div>
            {
                isLoading && <img className={styles.loaderGif} src={loaderGif} alt={'Loading...'} />
            }
            {
                books && <div className={styles.loadmore}>
                    <button className={styles.loadmoreButton} onClick={onClickLoadMore}>Load more</button>
                </div>
            }
        </div>

    )
}

export default Content;
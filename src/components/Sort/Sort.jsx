import React from 'react';
import styles from './Sort.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSortValue} from "../../redux/slices/searchSlice";
import {fetchBooks} from "../../redux/slices/itemsSlice";
import loader from './../../assets/loader.gif';
import {useLocation, useParams} from "react-router-dom";

const Sort = () => {

    const dispatch = useDispatch();
    const {inputValue, sortValue} = useSelector(state => state.search);
    const { page, items, isLoading } = useSelector(state => state.items);
    const { pathname } = useLocation();
    const params = useParams();

    const setNewest = () => {
        dispatch(setSortValue('newest'));
        dispatch(fetchBooks({inputValue, page, sortValue}));
    }

    const setRelevance = () => {
        dispatch(setSortValue('relevance'));
        dispatch(fetchBooks({inputValue, page, sortValue}));
    }

    return (
        <div className={styles.sort}>
            <button disabled={items.length === 0 || pathname === `/book/${params.id}`} className={`${styles.sortItem} ${sortValue === 'relevance' && styles.active}`} onClick={setRelevance}>
                Relevance
            </button>
            <button disabled={items.length === 0 || pathname === `/book/${params.id}`} className={`${styles.sortItem} ${sortValue === 'newest' && styles.active}`} onClick={setNewest}>
                Newest
            </button>
            {
                isLoading && <img src={loader} alt={'loading'} className={styles.loader}/>
            }
        </div>
    )
}

export default Sort;
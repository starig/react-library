import React, {useEffect} from 'react';
import styles from './Sort.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {setSortValue} from "../../redux/slices/searchSlice";
import {fetchBooks} from "../../redux/slices/itemsSlice";
import {useLocation, useParams} from "react-router-dom";

const Sort = () => {

    const dispatch = useDispatch();
    const {inputValue, sortValue} = useSelector(state => state.search);
    const { page, items } = useSelector(state => state.items);
    const { pathname } = useLocation();
    const params = useParams();

    useEffect(() => {
        console.log('changed: ', sortValue);
        dispatch(fetchBooks({inputValue, page, sortValue}));
    }, [sortValue]);

    const setNewest = () => {
        dispatch(setSortValue('newest'));
        console.log(sortValue);
    }

    const setRelevance = () => {
        dispatch(setSortValue('relevance'));
    }

    return (
        <div className={styles.sort}>
            <button disabled={items.length === 0 || pathname === `/book/${params.id}`}
                    className={`${styles.sortItem} ${sortValue === 'relevance' && styles.active}`} onClick={() => {
                setRelevance()
            }}>
                Relevance
            </button>
            <button disabled={items.length === 0 || pathname === `/book/${params.id}`}
                    className={`${styles.sortItem} ${sortValue === 'newest' && styles.active}`} onClick={() => {
                setNewest()
            }}>
                Newest
            </button>

        </div>
    )
}

export default Sort;
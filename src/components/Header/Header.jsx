import React, {useCallback, useEffect, useRef, useState} from 'react';
import searchImg from "../../assets/search.png";
import styles from './Header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {changeValue} from "../../redux/slices/searchSlice";
import debounce from 'lodash.debounce';
import {fetchBooks, onNewSearchValue, setCategory} from "../../redux/slices/itemsSlice";
import {Link, useLocation, useParams} from "react-router-dom";
import Filter from "../Filter/Filter";
import Sort from "../Sort/Sort";
import loader from "../../assets/loader.gif";

const Header = () => {

    const {inputValue, sortValue} = useSelector((state) => state.search);
    const {page, isLoading} = useSelector(state => state.items);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');
    const { pathname } = useLocation();
    const params = useParams();
    const inputRef = useRef(null);

    const updateSearchValue = useCallback(

        debounce((str) => {
            dispatch(onNewSearchValue());
            dispatch(changeValue(str));
        }, 100), []
    );

    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateSearchValue(e.target.value);
    }

    const onClickCross = () => {
        dispatch(changeValue(''));
        dispatch(onNewSearchValue());
        dispatch(setCategory('All'));
        setValue('');
    }

    const onClickSearch = async () => {
        try {
            dispatch(fetchBooks({inputValue, page, sortValue}));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'Enter' && document.activeElement === inputRef.current) {
                event.preventDefault();
                onClickSearch(inputValue, page)
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [inputValue]);

    return (
        <div className={styles.header}>
            <Link to={'/'}>
                <h3 className={styles.title}>Search your book</h3>
            </Link>
            <div>
                <div className={styles.search}>
                    <input value={value}
                           ref={inputRef}
                           disabled={pathname === `/book/${params.id}`}
                           onChange={onChangeInput}
                           className={styles.input}/>
                    {value && <svg className={styles.closeIcon} onClick={onClickCross}
                                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <title/>
                        <g id="cross">
                            <line className="cls-1" x1="7" x2="25" y1="7" y2="25"/>
                            <line className="cls-1" x1="7" x2="25" y1="25" y2="7"/>
                        </g>
                    </svg>}
                    <img className={styles.searchImg} src={searchImg} alt={'search'}
                         onClick={onClickSearch}
                    />
                </div>
                <div className={styles.sorting}>
                    <Filter />
                    <Sort />
                </div>
                {
                    isLoading && <div className={styles.loaderContainer}>
                        <img src={loader} alt={'loading'} className={styles.loader}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header;
import React, {useCallback, useEffect, useState} from 'react';
import searchImg from "../assets/search.png";
import styles from './Header.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {changeValue} from "../redux/slices/searchSlice";
import debounce from 'lodash.debounce';
import {fetchBooks, onNewSearchValue} from "../redux/slices/itemsSlice";

const Header = () => {

    const inputValue = useSelector((state) => state.search.inputValue);
    const page = useSelector(state => state.items.page);
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

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
        setValue('');
    }

    const onClickSearch = async (q, page) => {
        try {
            dispatch(fetchBooks({q, page}));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        const keyDownHandler = event => {

            if (event.key === 'Enter') {
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
            <h3>Search your book</h3>
            <div>
                <div className={styles.search}>
                    <input value={value}
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
                         onClick={() => onClickSearch(inputValue, page)}
                    />
                </div>
                <div className="categories">
                    categories popup
                </div>
                <div className="sorting">
                    sorting by
                </div>
            </div>
        </div>
    )
}

export default Header;
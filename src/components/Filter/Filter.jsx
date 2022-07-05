import React, {useState} from 'react';
import styles from './Filter.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchBooks, setCategory} from "../../redux/slices/itemsSlice";

const Filter = () => {

    const [popupStatus, setPopupStatus] = useState(false);
    const dispatch = useDispatch();
    const { categories, activeCategory } = useSelector(state => state.items);
    const {inputValue, sortValue} = useSelector((state) => state.search);
    const page = useSelector(state => state.items.page);

    const popupHandler = () => {
        setPopupStatus(!popupStatus);
    }

    return (
        <div className={styles.filter}>
            <div className={styles.activeFilter} onClick={popupHandler}>
                {activeCategory}
            </div>
            {
                popupStatus && <div className={styles.filterPopup}>
                    {
                        categories.map((item, id) => <div key={id}
                            className={`${styles.popupItem} ${activeCategory === item && styles.active}`}
                            onClick={() => {
                                dispatch(setCategory(item));
                                setPopupStatus(false);
                                dispatch(fetchBooks({inputValue, page, sortValue}));
                            }}>{item}</div>)
                    }
                </div>
            }
        </div>
    )
}

export default Filter;
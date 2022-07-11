import styles from './query.module.css';
import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';



export default function Query({ onUpdateFilter, query }) {

    return (
        <div className={styles.query}>
            {(!query) ? <FaSearch className={styles.icon} /> :
                <FaTimes className={styles.cross} onClick={() => onUpdateFilter('')} />}
            <input
                onChange={(e) => onUpdateFilter(e.target.value)}
                className={styles.input}
                placeholder="What are you looking for?..."
                type="text"
            />
        </div>
    )
} 
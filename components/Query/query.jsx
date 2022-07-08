import styles from './query.module.css';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';



export default function Query({ onUpdateFilter }) {

    return (
        <div className={styles.query}>
            <FaSearch className={styles.icon} />
            <input
                onChange={(e) => onUpdateFilter(e.target.value)}
                className={styles.input}
                placeholder="What are you looking for?..."
                type="text"
            />
        </div>
    )
} 
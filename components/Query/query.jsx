import styles from './query.module.css';
import { FaSearch } from 'react-icons/fa';

export default function Query() {

    return (
        <div className={styles.query}>
            <FaSearch className={styles.icon} />
            <input
                className={styles.input}
                placeholder="What are you looking for?..."
                type="text"
            />
        </div>
    )
} 
import styles from './item.module.css';

export default function Item({ item }) {
    return (
        <div className={styles.item}>
            <p>{item.name}</p>
            <p>{item.quantity}</p>
        </div>
    )
}
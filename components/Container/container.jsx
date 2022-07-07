import Item from '../Item/item';
import styles from './container.module.css';

export default function Container({ items }) {
    // console.log(this.props);
    return (
        <div className={styles.container}>
            <p>Container</p>

            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
} 
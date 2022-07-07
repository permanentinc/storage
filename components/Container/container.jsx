import Item from '../Item/item';
import styles from './container.module.css';



const deleteBox = async (id) => {
    console.log(id)
    try {
        const body = { id };
        await fetch('/api/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    } catch (error) {
        console.error(error);
    }
};


export default function Container({ container, items }) {

    return (
        <div className={styles.container}>
            <p>{container.name}</p>
            <p>{container.location}</p>
            <p onClick={(e) => deleteBox(container.id)}>X</p>

            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}
        </div>
    )
} 
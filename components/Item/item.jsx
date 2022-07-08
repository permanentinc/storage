import styles from './item.module.css';
import { mutate } from 'swr';
import { FaTrash } from 'react-icons/fa';
import Highlighter from "react-highlight-words";

const deleteItem = async (id) => {
    try {
        const body = { id };
        await fetch('/api/deleteItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        mutate('/api/read');
    } catch (error) {
        console.error(error);
    }
};

export default function Item({ item, query }) {
    return (
        <div className={styles.item}>
            <p>
                <Highlighter
                    highlightClassName="highlight"
                    searchWords={[query]}
                    autoEscape={true}
                    textToHighlight={item.name}
                />
            </p>
            {/* <p onClick={(e) => deleteItem(item.id)}>
                <FaTrash />
            </p> */}
        </div>
    )
}
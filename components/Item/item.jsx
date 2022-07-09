import styles from './item.module.css';
import { mutate } from 'swr';
import { FaTrash } from 'react-icons/fa';
import Highlighter from "react-highlight-words";
import { useSession } from "next-auth/react"

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

    const { data: session } = useSession();

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
            {(session) ? <p className={styles.icon} onClick={(e) => deleteItem(item.id)}>
                <FaTrash />
            </p> : null}
        </div>
    )
}
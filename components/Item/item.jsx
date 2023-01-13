import styles from './item.module.css';
import { mutate } from 'swr';
import { FaTrash } from 'react-icons/fa';
import Highlighter from "react-highlight-words";
import { useSession } from "next-auth/react"
import React, { useState } from 'react';

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

const updateItem = async (id, name) => {
    try {
        const body = { id, name };
        await fetch('/api/updateItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        mutate('/api/read');
    } catch (error) {
        console.error(error);
    }
};


export default function Item({ item, query, onUpdateName }) {

    const [name, setName] = useState('');
    const { data: session } = useSession();

    return (
        <div className={styles.item}>
            {(session || process.env.NODE_ENV) ? (
                <p>
                    <input
                        className={styles.input}
                        onChange={(e) => setName(e.target.value)}
                        onBlur={(e) => updateItem(item.id, e.target.value)}
                        placeholder={item.name}
                        type="text"
                    />
                </p>
            ) : (
                <p>
                    <Highlighter
                        highlightClassName="highlight"
                        searchWords={[query]}
                        autoEscape={true}
                        textToHighlight={item.name}
                    />
                </p>)}
            {(session || process.env.NODE_ENV) ? <p className={styles.icon} onClick={(e) => deleteItem(item.id)}>
                <FaTrash />
            </p> : null}
        </div>
    )
}
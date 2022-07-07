import { mutate } from 'swr';
import Item from '../Item/item';
import styles from './container.module.css';
import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";



export default function Container({ container, items }) {

    const [name, setName] = useState('');


    const deleteContainer = async (id) => {
        try {
            const body = { id };
            await fetch('/api/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            mutate('/api/read');
        } catch (error) {
            console.error(error);
        }
    };


    const createItem = async (e) => {
        e.preventDefault();
        try {
            const body = { name, quantity: 1, containerId: container.id };
            await fetch('/api/createItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            mutate('/api/read');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={styles.container}>
            <p>{container.name}</p>
            <p>{container.location}</p>
            <p onClick={(e) => deleteContainer(container.id)}>
                <FaTrash />
            </p>

            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}

            <form onSubmit={createItem}>
                <p>Create Item</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    type="text"
                    value={name}
                />
                <button disabled={!name || !location} type="submit" >
                    <FaPlus />
                </button>
            </form>

        </div>
    )
} 
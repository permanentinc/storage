import { mutate } from 'swr';
import Item from '../Item/item';
import styles from './container.module.css';
import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";



export default function Container({ container, items }) {

    const [name, setName] = useState('');
    const [loading, setLoading] = useState('');

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
            setName('');
            setLoading(true);
            await fetch('/api/createItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            setLoading(false);
            mutate('/api/read');
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h6>{container.name}</h6>
                <h6>{container.location}</h6>
                <p onClick={(e) => deleteContainer(container.id)}>
                    <FaTrash className={styles.icon} />
                </p>
            </div>


            {items.map((item) => (
                <Item key={item.id} item={item} />
            ))}

            <div className={styles.footer}>

                <form onSubmit={createItem}>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        placeholder={loading ? 'Adding...' : 'Add an item'}
                        type="text"
                        value={name}
                    />
                    <button disabled={!name || !location} type="submit" >
                        <FaPlus />
                    </button>
                </form>

            </div>
        </div>
    )
} 
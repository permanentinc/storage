import { mutate } from 'swr';
import Item from '../Item/item';
import styles from './container.module.css';
import React, { useState } from 'react';
import { FaPlus, FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react"



export default function Container({ container, items, query, isInURL }) {

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

    const isHighlighted = items => {
        if (query === '') return false;
        return items.some(item => {
            return item.name.includes(query)
        });
    }

    const shouldHide = items => {
        if (query === '') return false;
        return !items.some(item => {
            return item.name.includes(query)
        });
    }

    const filteredItems = items => {
        if (query === '') return items;
        return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
    }

    const { data: session } = useSession();

    return (
        <div
            className={styles.container + ((isHighlighted(items)) ? ' ' + styles.highlighted : '') + ((shouldHide(items)) ? ' ' + styles.shouldHide : '') + ((isInURL) ? ' ' + styles.isInURL : '')}>
            <div className={styles.header}>
                
                <h6>{container.name}</h6>
                <h6>{container.location}</h6>
                {(session || process.env.NODE_ENV) ? <p onClick={(e) => deleteContainer(container.id)}>
                    <FaTrash className={styles.icon} />
                </p> : null}
            </div>


            <div className={styles.contents}>
                {filteredItems(items).map((item) => (
                    <Item key={item.id} item={item} query={query} />
                ))}
            </div>

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
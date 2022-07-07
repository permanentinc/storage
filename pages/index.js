import Head from 'next/head'
import Grid from '../components/Grid/grid'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { mutate } from 'swr'


export default function Home() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');


  const createContainer = async (e) => {
    e.preventDefault();
    try {
      const body = { name, location };
      await fetch('/api/create', {
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
      <Head>
        <title>Storage | Dreamatorium</title>
        <meta name="description" content="Storage solution for the dreamatorium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Storage
        </h1>

        <Grid />

        <form onSubmit={createContainer}>
          <h1>Create Box</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            value={name}
          />
          <input
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            type="text"
            value={location}
          />
          <input disabled={!name || !location} type="submit" value="Create Box" />
        </form>

      </main>

    </div>
  )
}

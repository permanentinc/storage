import Head from 'next/head'
import Query from '../components/Query/query'
import Grid from '../components/Grid/grid'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { mutate } from 'swr'
import { FaPlus } from "react-icons/fa";

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
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");
        </style>
      </Head>

      <main>

        <Query />

        <Grid />

        <div className={styles.createContainer} >
          <form onSubmit={createContainer}>
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
            <button disabled={!name || !location} type="submit" value="Create Box" >
              <FaPlus />
            </button>
          </form>
        </div>

      </main>

    </div>
  )
}

import Head from 'next/head'
import Login from '../components/Login/login'
import Query from '../components/Query/query'
import Grid from '../components/Grid/grid'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { mutate } from 'swr'
import { FaPlus } from 'react-icons/fa';
import Image from 'next/image';
import { useSession } from "next-auth/react"


export async function getStaticProps() {
  const res = await fetch('https://storage.pinc.nz/api/read')
  const data = await res.json()
  return {
    props: {
      data,
    },
  }
}

export default function Home({ data }) {

  const [name, setName] = useState('');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState('');
  const [location, setLocation] = useState('');

  const createContainer = async (e) => {
    e.preventDefault();
    try {
      setName('');
      setLocation('');
      setLoading(true);
      const body = { name, location };
      await fetch('/api/create', {
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

  const onUpdateFilter = values => {
    setQuery(values);
  }

  const { data: session } = useSession();

  return (
    <div className={styles.container}>

      <Head>
        <title>Storage | Dreamatorium</title>
        <meta name="description" content="Storage solution for the dreamatorium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <div className={styles.logo}>
          <Image className={styles.symbol}
            style="responsive"
            src="/dreamatorium_logo.svg" height={244} width={730} alt="Dreamatorium logo" />
        </div>

        <Login />
        <Query onUpdateFilter={onUpdateFilter} query={query} />

        <Grid query={query} props={data} />
        <div>
          {(session || process.env.NODE_ENV) ? (
            <div>
              <h2 className={styles.heading}>Add a box</h2>

              <div className={styles.createContainer} >
                <form onSubmit={createContainer}>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    placeholder={loading ? 'Adding...' : 'Name'}
                    type="text"
                    className={styles.input}
                    value={name}
                  />
                  <input
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={loading ? 'Adding...' : 'Location'}
                    type="text"
                    className={styles.input}
                    value={location}
                  />
                  <button className={styles.button} disabled={!name || !location} type="submit" value="Create Box" >
                    <FaPlus />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div></div>
          )}</div>
      </main>

    </div>

  )
}


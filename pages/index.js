import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Storage | Dreamatorium</title>
        <meta name="description" content="Storage solution for the dreamatorium" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Storage
        </h1>

        <p className={styles.description}>
          Get started by editing
        </p>

      </main>

    </div>
  )
}

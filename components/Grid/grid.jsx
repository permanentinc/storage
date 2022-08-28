import styles from './grid.module.css';
import useSWR from 'swr';

import Container from '../Container/container'
import Loader from '../Loader/loader'
import { useRouter } from 'next/router'

export async function getStaticProps() {
    const res = await fetch('/api/read')
    const posts = await res.json()
  
    return {
      props: {
        posts,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
  }

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Grid({ query }) {

    const router = useRouter()

    const { data } = useSWR('/api/read', fetcher)

    if (!data) return <div className={styles.grid}>
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
    </div>

    return (
        <div className={styles.grid}>
            {data.map((container) => (
                <Container key={container.id}
                    container={container}
                    items={container.Item}
                    query={query}
                    isInURL={container.name.includes(router.query.box)}
                />
            ))}
        </div>
    )
}


import styles from './grid.module.css';
import useSWR from 'swr';
import Container from '../Container/container'
import Loader from '../Loader/loader'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Grid({ query }) {

    const { data, error } = useSWR('/api/read', fetcher)

    if (error) return <div className={styles.error} ><p>An error occured.</p></div>
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
                />
            ))}
        </div>
    )
}  
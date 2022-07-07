import styles from './grid.module.css';
import useSWR from 'swr';
import Container from '../Container/container'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Grid() {

    const { data, error } = useSWR('/api/read', fetcher)

    if (error) return <div className={styles.error} ><p>An error occured.</p></div>
    if (!data) return <div className={styles.error} ><p>Loading ...</p></div>
    return (
        <div className={styles.grid}>
            {data.map((container) => (
                <Container key={container.name} container={container} items={container.Item} />
            ))}
        </div>
    )
} 
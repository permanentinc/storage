import styles from './loader.module.css';
import { FaPlus } from "react-icons/fa";

export default function Loader() {


    return (
        <div
            className={styles.container}>
            <div className={styles.header}>
                <h6>&nbsp;</h6>
                <h6>&nbsp;</h6>
            </div>

            <div className={styles.loader}>Loading...</div>

            <div className={styles.footer}>

                <form>
                    <input
                        placeholder="Loading..."
                        type="text"
                    />
                    <button disabled >
                        <FaPlus />
                    </button>
                </form>

            </div> 
        </div>
    )
} 
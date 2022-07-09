import styles from './login.module.css';
import { useSession, signIn, signOut } from "next-auth/react"
import { FaGithub } from 'react-icons/fa';

export default function Login() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <button className={styles.loggedin} onClick={() => signOut()}>
                    <FaGithub />
                </button>
            </>
        )
    }
    return (
        <>
            <button className={styles.loggedout} onClick={() => signIn()}>
                <FaGithub />
            </button>
        </>
    )
} 
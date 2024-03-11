'use client'
import styles from "../styles/SignIn.module.css"

import app from '../../../firebase/FirebaseApp'; // Adjust the path as needed
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import {useRouter} from "next/navigation"
import { initNewUser } from "../../../firebase/FirebaseUtils";


function SignIn() {

    const auth = getAuth(app); // Pass the Firebase app instance
    const provider = new GoogleAuthProvider();
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    const signIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result.user);
            // Redirect or additional logic here if needed
        } catch (error) {
            console.error("Sign-in error", error);
            // Handle errors here, such as displaying a message to the user
        }
    }

    if (loading){
        return <div>Currently Loading D:</div>;
    }


    if (user) {
        router.push("/Home")
        initNewUser(auth); //doesnt do anything to existing users
    }

    return (
        <div className={styles.signInContainer}>
            <div className={styles.signInBox}>
                <h2 className={styles.signInTitle}>Get Started</h2>
                <button onClick={signIn} className={styles.signInButton}>
                    Sign In With Google
                </button>
            </div>
        </div>
    );
}

export default SignIn;
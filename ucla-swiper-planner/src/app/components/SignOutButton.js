'use client'
import { useEffect } from 'react';

import app from '../../../firebase/FirebaseApp'; // Adjust the path as needed
import { getAuth, signOut } from "firebase/auth";
import {useRouter} from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth';

import styles from "../styles/SignOut.module.css"

export default function SignOut() {
    const auth = getAuth(app); // Initialize auth with the Firebase app instance
    const router = useRouter();
    const [user, loading] = useAuthState(auth);



    const handleSignOut = async () => {
        await signOut(auth); // Correctly call signOut
        router.push('/'); // Redirect to home or login page after signing out
    };

    if (loading) {
        return <div>Currently Loading...</div>;
    }

    // // This check might be unnecessary here since the component's sole purpose is to sign out users.
    // // Instead, you might want to check if a user is signed in at a higher level and conditionally render this component.
    // if (!user) {
    //     router.push("/");
    //     return <div>Currently Loading...</div>; // Consider a more appropriate message or action.
    // }

    return (
        <div className={styles.signOutContainer}>
            <div className={styles.signOutBox}>
                <button onClick={handleSignOut} className={styles.signOutButton}>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
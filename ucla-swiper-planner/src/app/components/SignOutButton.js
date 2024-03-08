'use client'

import app from '../../../firebase/FirebaseApp'; // Adjust the path as needed
import { getAuth, signOut } from "firebase/auth";
import {useRouter} from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth';

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
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
                <button onClick={handleSignOut}
                    className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
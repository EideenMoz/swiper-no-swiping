'use client'

import { getAuth } from "firebase/auth"
import { initFirebase } from "../../../firebase/FirebaseApp";
import {useRouter} from "next/navigation"
import { useAuthState } from 'react-firebase-hooks/auth';


export default function SignOut() {

    const app = initFirebase()
    const auth= getAuth();
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    
    if (loading){
        return <div>Currently Loading D:</div>;
    }

    if (!user){
        router.push("/SignIn")
        return <div>Currently Loading D:</div>;
    }  

    return ( 
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
            <button onClick={()=> auth.signOut()}
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
            >
                Sign Out
            </button>
        </div>
    </div>
    )
}

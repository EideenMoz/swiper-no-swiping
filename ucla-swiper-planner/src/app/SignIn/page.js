'use client'

import {initFirebase} from "../../../firebase/FirebaseApp"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import {useRouter} from "next/navigation"



function SignIn() {

    const app = initFirebase()
    const provider= new GoogleAuthProvider();
    const auth = getAuth();
    const  [user, loading] = useAuthState(auth);
    const router = useRouter();

    const signIn= async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result.user);

    }  

    if (loading){
        return <div>Currently Loading D:</div>;
    }

    if (user){
        router.push("/")
        return <div>Currently Loading D:</div>;
    }  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2>
          <button onClick={signIn}
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >
            Sign Up With Google
          </button>
      </div>
    </div>
  );
}

export default SignIn;
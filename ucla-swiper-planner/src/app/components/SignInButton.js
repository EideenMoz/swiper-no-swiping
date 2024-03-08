'use client'

import app from '../../../firebase/FirebaseApp'; // Adjust the path as needed
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {useAuthState} from "react-firebase-hooks/auth"
import {useRouter} from "next/navigation"



function SignIn() {

    const auth = getAuth(app); // Pass the Firebase app instance
    const provider = new GoogleAuthProvider();
    const  [user, loading] = useAuthState(auth);
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

    // if (!user){
    //     router.push("/")
    //     return <div>Currently Loading D:</div>;
    // }  

    if (user) {
        router.push("/Home")
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>
          <button onClick={signIn}
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
          >
            Sign In With Google
          </button>
      </div>
    </div>
  );
}

export default SignIn;
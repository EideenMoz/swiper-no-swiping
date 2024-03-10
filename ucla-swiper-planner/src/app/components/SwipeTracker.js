// components/SwipeTracker.js
"use client";
import styles from '../styles/Home.module.css'; // Adjust the import path as needed
// Import useState from 'react' library
import { useState, useEffect } from "react";
import { fetchRemainingBalance } from '../../../firebase/FirebaseUtils';
import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

import {
  collection
} from 'firebase/firestore';

import { db } from '../../../firebase/FirebaseApp';


const auth = getAuth();
const usersRef = collection(db, "Users");
const user = auth.currentUser;

function SwipeTracker({totalSwipesAvailable, weeklySwipesUsed }) {
    
    const [user, setUser] = useState(null);
    const [remainingBalance, setRemainingBalance] = useState(180);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser); // Update user state when auth state changes
        });
      
        if (user) {
          const fetchData = async () => {
            try {
              console.log(user);
              const swipesLeft = await fetchRemainingBalance();
              console.log(swipesLeft[0]["Remaining Balance"]); 
              setRemainingBalance(swipesLeft[0]["Remaining Balance"]);
            } catch (error) {
              console.error('Error fetching remaining balance:', error);
            }
          };
          fetchData();
        }
      
        return () => unsubscribe(); // Cleanup subscription
      }, [user]);

      // Convert remainingBalance to a number
const remainingBalanceNumber = parseInt(remainingBalance);
console.log("Remaining Bal:", remainingBalanceNumber);
// Calculate the total swipes used as a number
console.log("TOTAL VALAIUBLE:", totalSwipesAvailable);
const totalSwipesUsed = totalSwipesAvailable - remainingBalanceNumber;
console.log("TOAL USED:", totalSwipesUsed)

// Ensure the totalSwipesUsed is not NaN, if it is, set it to 0
const totalSwipesUsedDisplay = isNaN(totalSwipesUsed) ? 0 : totalSwipesUsed;

    return (
        <div className={styles.swipeTracker}>
            <h2>Swipe Tracker</h2>
            <p>Total Swipes Used: {totalSwipesUsedDisplay}</p>
            <p>This Week's Swipes: {weeklySwipesUsed}</p>
        </div>
    );
}

export default SwipeTracker;

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
    const [mealPlanType, setMealPlanType] = useState("14p");
    
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
              setMealPlanType(swipesLeft[0]["Meal Plan Type"])
            } catch (error) {
              console.error('Error fetching remaining balance:', error);
            }
          };
          fetchData();
        }
      
        return () => unsubscribe(); // Cleanup subscription
      }, [user]);
      
      if(mealPlanType==="19p"){
        totalSwipesAvailable=205;
      }
      else if (mealPlanType==="14p"){
        totalSwipesAvailable=150;
      }
      else{
        totalSwipesAvailable=120;
      }

    return (
        <div className={styles.swipeTracker}>
            <h2>Swipe Tracker</h2>
            <p>Total Swipes Used: {totalSwipesAvailable-remainingBalance}</p>
            <p>This Week's Swipes: {weeklySwipesUsed}</p>
        </div>
    );
}

export default SwipeTracker;

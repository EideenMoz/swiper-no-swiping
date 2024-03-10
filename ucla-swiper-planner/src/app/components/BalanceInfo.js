"use client";

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
// Styles
import styles from '../styles/Home.module.css'; 

function BalanceInfo({ totalSwipesUsed, totalSwipesAvailable, currentWeek, currentDay, swipesPerWeek, onTrack }) {

    const [user, setUser] = useState(null);
    const [remainingBalance, setRemainingBalance] = useState('140');
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
              console.log("Meal Plan Type", swipesLeft[0]["Meal Plan Type"]); 
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
      console.log(totalSwipesAvailable);
    return (
        <div className={styles.balanceInfo}>
            <h2>Meal Swipe Balance</h2>
            <p>You have {remainingBalance} swipes remaining.</p>
            <p>You should have {totalSwipesAvailable - ((currentWeek * swipesPerWeek) - (currentDay * 3))} swipes remaining.</p>
            <p>You are {onTrack ? "on track" : "not on track"} with your meal swipe balance.</p>
        </div>
    );
}

export default BalanceInfo;

// Filename: src/app/components/Profile.js

// To inform Next.js that this is a client component
"use client";

// Import useState from 'react' library
import { useState, useEffect } from "react";
import styles from '../styles/Profile.module.css'; // Import your CSS file for styling
import {
  updateWeeklySwipeCount,
  fetchWeeklySwipeSchedule,
  updateMealPlanType,
  fetchMealPlanType,
  updateRemainingBalance
  
} from '../../../firebase/FirebaseUtils';

import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

import {
  collection
} from 'firebase/firestore';

import { db } from '../../../firebase/FirebaseApp';
// when we implement firestore
// import firebase from 'firebase/app';
// import 'firebase/firestore';

const auth = getAuth();
const usersRef = collection(db, "Users");
const user = auth.currentUser;

const SwipePlanner = () => {
  
  const [selectedOption, setSelectedOption] = useState("14p"); // Default selection
  const [swipeValues, setSwipeValues] = useState({
    Monday: 2,
    Tuesday: 2,
    Wednesday: 2,
    Thursday: 2,
    Friday: 2,
    Saturday: 2,
    Sunday: 2,
  });
  const [message, setMessage] = useState("You are using a valid amount of swipes"); // Message for swipe limit
  const [user, setUser] = useState(null); // Initialize user state
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth state changes
    });
  
    if (user) {
      const fetchData = async () => {
        try {
          console.log(user);
          console.log('tableData', swipeValues);
          const weekEntries = await fetchWeeklySwipeSchedule();
          const formattedData = weekEntries[0]["Weekly Swipe Count"]; // Assuming fetchWeeklySwipeSchedule needs the user's UID
          const fetchedPlan = await fetchMealPlanType();
          console.log(fetchedPlan);
          // Sort the swipe values by days of the week
          const sortedData = Object.keys(formattedData).sort((a, b) => {
            const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return days.indexOf(a) - days.indexOf(b);
          }).reduce((obj, key) => {
            obj[key] = formattedData[key];
            return obj;
          }, {});
  
          setSwipeValues(sortedData);
  
          setSelectedOption(fetchedPlan || "14p"); // Set selected option to fetchedPlan if it exists, otherwise default to "14p"
        } catch (error) {
          console.error('Error fetching "week Entries":', error);
        }
      };
  
      fetchData();
    }
  
    return () => unsubscribe(); // Cleanup subscription
  }, [user]);
  
  // Function to handle option change
  const handleOptionChange = (option) => {
    setSelectedOption(option);

    // Update swipe values based on the selected option
    if (option === "14p") {
      setSwipeValues({
        Monday: 2,
        Tuesday: 2,
        Wednesday: 2,
        Thursday: 2,
        Friday: 2,
        Saturday: 2,
        Sunday: 2,
      });
    } else if (option === "19p") {
      setSwipeValues({
        Monday: 3,
        Tuesday: 3,
        Wednesday: 3,
        Thursday: 3,
        Friday: 3,
        Saturday: 2,
        Sunday: 2,
      });
    } else {
      // Default option "11p" or any other option
      setSwipeValues({
        Monday: 2,
        Tuesday: 2,
        Wednesday: 2,
        Thursday: 2,
        Friday: 1,
        Saturday: 1,
        Sunday: 1,
      });
    }

    setMessage("You are using a valid amount of Swipes"); // Clear the message when changing the option
    updateMealPlanType(option);
    //updatefirestore(set)
  };

  // Function to handle swipe value change for a day
// Function to handle swipe value change for a day
const handleSwipeChange = (day, direction) => {
  const newSwipeValues = { ...swipeValues };
  newSwipeValues[day] = Math.max(0, newSwipeValues[day] + direction); // Ensure swipe values don't go below 0

  // Order the days of the week
  const orderedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const orderedSwipeValues = {};

  orderedDays.forEach(day => {
    orderedSwipeValues[day] = newSwipeValues[day] || 0; // Set swipe value to 0 if it doesn't exist
  });

  // Check if the total swipes meet the limit
  const totalSwipes = Object.values(orderedSwipeValues).reduce((total, value) => total + value, 0);
  const limit = selectedOption === "11p" ? 11 : selectedOption === "14p" ? 14 : 19;

  if (totalSwipes > limit) {
    setMessage(`You are using ${totalSwipes - limit} swipes over the limit`);
  } else if (totalSwipes < limit) {
    setMessage(`You have ${limit - totalSwipes} swipes less than the limit`);
  } else {
    setMessage("You are using a valid amount of Swipes"); // Clear the message if total swipes meet the limit
  }

  setSwipeValues(orderedSwipeValues);
  updateWeeklySwipeCount(orderedSwipeValues);
};


  const [currentSwipes, setCurrentSwipes] = useState(""); // State to manage the entered number

  const handleCurrentSwipesChange = (e) => {
    // Update the state when the input value changes
    setCurrentSwipes(e.target.value);
    updateRemainingBalance(currentSwipes);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WELCOME TO THE PROFILE PAGE</h1>
      <div className={styles.buttonGroup}>
        <button
          className={`${styles.button} ${selectedOption === "11p" && styles.selected}`}
          onClick={() => handleOptionChange("11p")}
        >
          11p
        </button>
        <button
          className={`${styles.button} ${selectedOption === "14p" && styles.selected}`}
          onClick={() => handleOptionChange("14p")}
        >
          14p
        </button>
        <button
          className={`${styles.button} ${selectedOption === "19p" && styles.selected}`}
          onClick={() => handleOptionChange("19p")}
        >
          19p
        </button>

      </div>

      <div>
        <form className={styles.formContainer}>
          <label className={styles.formLabelCont}>
            Update Current Swipes:
            <input
              type="number"
              value={currentSwipes}
              onChange={handleCurrentSwipesChange}
            />
          </label>
            <a href="https://myhousing.hhs.ucla.edu/shib/swipes" target="_blank" rel="noopener noreferrer">Check Real-Time Swipes</a>
        </form>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(swipeValues).map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(swipeValues).map((day) => (
              <td key={day}>
                {swipeValues[day]}
                <div className={styles.adjustButtons}>
                  <button onClick={() => handleSwipeChange(day, -1)}>-</button>
                  <button onClick={() => handleSwipeChange(day, 1)}>+</button>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      {message && <div className={styles.message}>{message}</div>}

      {/* <button className={`${styles.button} ${styles.saveButton}`} >
        Save
      </button> */}

      <button className={`${styles.button} ${styles.saveButton}`} >
        Save
      </button>

      {/* onClick={handleSaveToFirestore} */}
      <h2 className={styles.podiumMessage}>
        Your Lunch-Wrapped UPDATED 
      </h2>

    </div>
  );
};

export default SwipePlanner;
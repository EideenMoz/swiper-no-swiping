// Filename: src/app/components/Profile.js

// To inform Next.js that this is a client component
"use client";

// Import useState from 'react' library
import { useState } from "react";
import styles from '../styles/Profile.module.css'; // Import your CSS file for styling

// when we implement firestore
// import firebase from 'firebase/app';
// import 'firebase/firestore';


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

  // Function to handle option change
  const handleOptionChange = (option) => {
    setSelectedOption(option);

    // Update swipe values based on the selected option
    if (option === "14p") {
      setSwipeValues({
        Mon: 2,
        Tue: 2,
        Wed: 2,
        Thu: 2,
        Fri: 2,
        Sat: 2,
        Sun: 2,
      });
    } else if (option === "19p") {
      setSwipeValues({
        Mon: 3,
        Tue: 3,
        Wed: 3,
        Thu: 3,
        Fri: 3,
        Sat: 2,
        Sun: 2,
      });
    } else {
      // Default option "11p" or any other option
      setSwipeValues({
        Mon: 2,
        Tue: 2,
        Wed: 2,
        Thu: 2,
        Fri: 1,
        Sat: 1,
        Sun: 1,
      });
    }

    setMessage("You are using a valid amount of Swipes"); // Clear the message when changing the option
    //updatefirestore(set)
  };

  // Function to handle swipe value change for a day
  const handleSwipeChange = (day, direction) => {
    const newSwipeValues = { ...swipeValues };
    newSwipeValues[day] = Math.max(0, newSwipeValues[day] + direction); // Ensure swipe values don't go below 0

    console.log('newSwipeValues:', newSwipeValues);
    // Check if the total swipes meet the limit
    const totalSwipes = Object.values(newSwipeValues).reduce((total, value) => total + value, 0);
    const limit = selectedOption === "11p" ? 11 : selectedOption === "14p" ? 14 : 19;

    if (totalSwipes > limit) {
      setMessage(`You are using ${totalSwipes - limit} swipes over the limit`);
    } else if (totalSwipes < limit) {
      setMessage(`You have ${limit - totalSwipes} swipes less than the limit`);
    } else {
      setMessage("You are using a valid amount of Swipes"); // Clear the message if total swipes meet the limit
    }

    setSwipeValues(newSwipeValues);
    //updateFirestore(newSwipesValues )
  };

  // Firebase initialization
  //  if (!firebase.apps.length) {
  //   const firebaseConfig = {
  //     // Your Firebase config here
  //   };
  //   firebase.initializeApp(firebaseConfig);
  // }

  // const handleSaveToFirestore = () => {
  //   const firestore = firebase.firestore();
  //   const collectionRef = firestore.collection('yourCollectionPath'); // Update with your specific path

  //   const dataToSave = {
  //     mealPlan: selectedOption,
  //     values: Object.values(swipeValues),
  //   };

  //   collectionRef.add(dataToSave)
  //     .then(() => {
  //       console.log('Data successfully saved to Firestore!');
  //     })
  //     .catch((error) => {
  //       console.error('Error saving data to Firestore:', error);
  //     });
  // };

  const [currentSwipes, setCurrentSwipes] = useState(""); // State to manage the entered number

  const handleCurrentSwipesChange = (e) => {
    // Update the state when the input value changes
    setCurrentSwipes(e.target.value);
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
          <p className={styles.updateSwipes}>
            <a href="https://myhousing.hhs.ucla.edu/shib/swipes" target="_blank" rel="noopener noreferrer">Check Real-Time Swipes</a>
          </p>
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
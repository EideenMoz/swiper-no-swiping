import { db } from "./FirebaseApp";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const auth = getAuth();
const usersRef = collection(db, "Users");

export async function InitNewUser(){
user = auth.currentUser;

let dict = {
    deneve: 0,
    bplate: 0,
    epicuria: 0,
    thestudy:0,
    rendewest: 0,
    rendeeast: 0,
    feast: 0,
    bcafe:0,
    campus: 0,
    foodtruck: 0
  };

  updateAllTimeSwipes(dict);
  updateWeeklySwipesForLocations(dict);

  let WeeklySwipeScheudle = {
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
    Sun: 0,
  };
  updateWeeklySwipeCount(WeeklySwipeScheudle);

  await setDoc(usersRef, { "uid": user.uid }, { merge: true });
}

export async function fetchDataFromFirestore() {
    const user = auth.currentUser;
    const q = query(usersRef, where("uid", "==", user.uid)); // Construct query using query() and where()
    try {
        const querySnapshot = await getDocs(q);
        const userData = [];
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                // doc.data() is the document data
                userData.push(doc.data());
            });
            return userData;
        } else {
            // If no documents found, initialize new user
            await InitNewUser();
            // Fetch user data again after initialization
            const newQuerySnapshot = await getDocs(q);
            newQuerySnapshot.forEach((doc) => {
                userData.push(doc.data());
            });
            return userData;
        }
    } catch (error) {
        console.log("Error getting documents: ", error);
        return [];
    }
}
  
  export async function fetchWeeklySwipeSchedule() {
    const userInfo = await fetchDataFromFirestore();
    console.log(userInfo[0]["Weekly Swipe Count"]);
    return userInfo[0]["Weekly Swipe Count"];
  }
  
  export async function fetchAllTimeSwipes() {
    const userInfo = await fetchDataFromFirestore();
    console.log(userInfo[0]["All Time Swipes"]);
    return userInfo[0]["All Time Swipes"];
  }
  
  export async function fetchWeeklySwipesForLocations() {
    const userInfo = await fetchDataFromFirestore();
    console.log(userInfo[0]["Current Week's Location Swipes"]);
    return userInfo[0]["Current Week's Location Swipes"];
  }
  
  export async function updateWeeklySwipeCount(newCount) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    
    try {
      await setDoc(userRef, { "Weekly Swipe Count": newCount }, { merge: true });
      console.log("Weekly Swipe Count updated successfully");
    } catch (error) {
      console.error("Error updating Weekly Swipe Count: ", error);
    }
  }
  

  export async function updateAllTimeSwipes(newCount) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
  
    try {
        // Fetch the current user data
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
  
        // Update the all-time swipes
        const oldAllTimeSwipes = userData["All Time Swipes"] || {};
        const updatedAllTimeSwipes = {};
  
        // Add the oldAllTime entries
        for (const location in oldAllTimeSwipes) {
            updatedAllTimeSwipes[location] = oldAllTimeSwipes[location];
        }
  
        // Add the swipes for the current week
        const currentWeekSwipes = await fetchWeeklySwipesForLocations();
        for (const location in currentWeekSwipes) {
            updatedAllTimeSwipes[location] = (updatedAllTimeSwipes[location] || 0) + currentWeekSwipes[location];
        }
  
        // Update the document in Firestore
        await setDoc(userRef, { "All Time Swipes": updatedAllTimeSwipes }, { merge: true });
        console.log("All Time Swipes updated successfully");
    } catch (error) {
        console.error("Error updating All Time Swipes: ", error);
    }
}

  /*
  export async function updateAllTimeSwipes(newCount) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    
    try {
      await setDoc(userRef, { "All Time Swipes": newCount }, { merge: true });
      console.log("All Time Swipes updated successfully");
    } catch (error) {
      console.error("Error updating All Time Swipes: ", error);
    }
  }
  */
  
  export async function updateWeeklySwipesForLocations(newCount) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    
    try {
      await setDoc(userRef, { "Current Week's Location Swipes": newCount }, { merge: true });
      console.log("Weekly Swipes for Locations updated successfully");
    } catch (error) {
      console.error("Error updating Weekly Swipes for Locations: ", error);
    }
  }

  
  
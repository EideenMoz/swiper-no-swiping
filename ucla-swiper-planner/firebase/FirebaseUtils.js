import { db } from "./FirebaseApp";
import { doc, setDoc, getDoc, collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const usersRef = collection(db, "Users");

// Use onAuthStateChanged to handle authentication state changes

export async function InitNewUser(){
  const user = auth.currentUser;

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

  let WeeklySwipeScheudle = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
  };

  let Entries = {
    Mon: [{name: "", period: ""}],
    Tue: [{name: "", period: ""}],
    Wed: [{name: "", period: ""}],
    Thu: [{name: "", period: ""}],
    Fri: [{name: "", period: ""}],
    Sat: [{name: "", period: ""}],
    Sun: [{name: "", period: ""}],
};

  console.log("Dict:", dict);
  console.log("Weekly Swipe Schedule:", WeeklySwipeScheudle);

  updateAllTimeSwipes(dict);
  updateWeeklySwipesForLocations(dict);
  updateWeeklySwipeCount(WeeklySwipeScheudle);
  updateWeekEntries(Entries);

  const userDocRef = doc(usersRef, user.uid); // specify the document reference
  try {
      await setDoc(userDocRef, { "uid": user.uid });
      console.log("New user initialized successfully");
  } catch (error) {
      console.error("Error initializing new user: ", error);
      throw error;
  }
}

export async function fetchDataFromFirestore() {
  const user = await auth.currentUser;
  setDoc(usersRef, { "uid": user.uid }); 
  const q = query(usersRef, where("uid", "==", user.uid)); // Construct query using query() and where()
  try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          const userData = [];
          querySnapshot.forEach((doc) => {
              // doc.data() is the document data
              userData.push(doc.data());
          });
          console.log("User data retrieved:", userData);
          return userData;
      } else {
          // If user data doesn't exist, initialize new user
          await InitNewUser();
          // Return an empty array as there's no data yet
          return [];
      }
  } catch (error) {
      console.log("Error getting documents: ", error);
      return [];
  }
}

  
  // export async function fetchWeeklySwipeSchedule() {
  //   const userInfo = await fetchDataFromFirestore();
  //   console.log(userInfo[0]["Weekly Swipe Count"]);
  //   return userInfo[0]["Weekly Swipe Count"];
  // }
  
  // export async function fetchAllTimeSwipes() {
  //   const userInfo = await fetchDataFromFirestore();
  //   console.log(userInfo[0]["All Time Swipes"]);
  //   return userInfo[0]["All Time Swipes"];
  // }
  
  // export async function fetchWeeklySwipesForLocations() {
  //   const userInfo = await fetchDataFromFirestore();
  //   console.log(userInfo[0]["Current Week's Location Swipes"]);
  //   return userInfo[0]["Current Week's Location Swipes"];
  // }
  export async function fetchAllTimeSwipes() {
    try {
      const userInfo = await fetchDataFromFirestore();
      if (userInfo && userInfo.length > 0 && userInfo[0]["All Time Swipes"]) {
        console.log(userInfo[0]["All Time Swipes"]);
        return userInfo[0]["All Time Swipes"];
      } else {
        console.error('All-time swipes count not found in user info'); // or any default value you want to return
        return [];
      }
    } catch (error) {
      console.error('Error fetching all-time swipes:', error);
      throw error; // rethrow the error for handling at a higher level
    }
  }
  
  export async function fetchWeeklySwipesForLocations() {
    try {
      const userInfo = await fetchDataFromFirestore();
      if (userInfo && userInfo.length > 0 && userInfo[0]["Current Week's Location Swipes"]) {
        console.log(userInfo[0]["Current Week's Location Swipes"]);
        return userInfo[0]["Current Week's Location Swipes"];
      } else {
        console.error('Weekly swipes for locations not found in user info');
        return []; // or any default value you want to return
      }
    } catch (error) {
      console.error('Error fetching weekly swipes for locations:', error);
      throw error; // rethrow the error for handling at a higher level
    }
  }
  
  export async function fetchWeeklySwipeSchedule() {
    try {
      const userInfo = await fetchDataFromFirestore();
      if (userInfo && userInfo.length > 0 && userInfo[0]["Weekly Swipe Count"]) {
        console.log(userInfo[0]["Weekly Swipe Count"]);
        return userInfo[0]["Weekly Swipe Count"];
      } else {
        console.error('Weekly swipe count not found in user info');
        return []; // or any default value you want to return
      }
    } catch (error) {
      console.error('Error fetching weekly swipe schedule:', error);
      throw error; // rethrow the error for handling at a higher level
    }
  }

// ... (existing imports)

export async function fetchWeekEntries() {
  try {
   const db = getFirestore();
   const user = await auth.currentUser;
   
    const docRef = doc(db, 'Users', user.uid);
    const docSnap = await getDoc(docRef);
    console.log("FROM FETCH", docSnap.data());
    return docSnap['week Entries'];


  } catch (error) {
    console.error('Error fetching week entries:', error);
    throw error;
  }
}

// ... (existing functions)

  
  // Similarly modify other functions fetchAllTimeSwipes and fetchWeeklySwipesForLocations
  
  
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
    console.log("Updating All Time Swipes with data:", newCount);
    await setDoc(userRef, { "All Time Swipes": newCount }, { merge: true });
    console.log("All Time Swipes updated successfully");
  } catch (error) {
    console.error("Error updating All Time Swipes: ", error);
  }
}
  
  export async function updateWeeklySwipesForLocations(newCount) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    
    try {
      await setDoc(userRef, { "Current Week's Location Swipes": newCount }, { merge: true });
      await setDoc(userRef, { "All Time Swipes": newCount }, { merge: true });
      console.log("Weekly Swipes for Locations updated successfully");
    } catch (error) {
      console.error("Error updating Weekly Swipes for Locations: ", error);
    }
  }

  export async function updateWeekEntries(entries) {
    const user = auth.currentUser;
    const userRef = doc(db, "Users", user.uid);
    
    try {
      await setDoc(userRef, { "week Entries": entries }, { merge: true });
      console.log("Week Entriesfor Locations updated successfully");
    } catch (error) {
      console.error("Error updating Week Entries for Locations: ", error);
    }
  }
  
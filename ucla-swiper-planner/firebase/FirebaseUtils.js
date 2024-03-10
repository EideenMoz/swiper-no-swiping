import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import app from "./FirebaseApp"
import { db } from './FirebaseApp';
import { getAuth } from "firebase/auth";


const auth = getAuth(app);
const usersRef = collection(db, "Users");

export async function fetchFireStoreData(){
  const user = auth.currentUser;
  const q = query(usersRef, where("uid", "==", user.uid)); // Construct query using query() and where()
  const userData = [];
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    userData.push(doc.data());
    });
  } catch (error) {
    console.log("Error getting documents: ", error);
  }
  return userData;
}

export async function fetchRemainingBalance(){
  const userInfo = await fetchFireStoreData();
  const swipes=userInfo[0]["Remaning Balance"]
  console.log(swipes);
  return userInfo;
}
export async function fetchAllTimeSwipes() {
  const userInfo = await fetchFireStoreData();
  const swipes=userInfo[0]["All Time Swipes"]
  return userInfo;
}

export async function fetchWeeklySwipesForLocations() {
  const userInfo = await fetchFireStoreData();
  const swipes=userInfo[0]["Current Week's Location Swipes"]
  return userInfo;
}

  
export async function fetchWeeklySwipeSchedule() {
  const userInfo = await fetchFireStoreData();
  const swipes=userInfo[0]["Weekly Swipe Count"]
  console.log(swipes);
  return userInfo;
}

export async function fetchMealPlanType() {
  const userInfo = await fetchFireStoreData();
  const swipes=userInfo[0]["Meal Plan Type"]
  console.log(swipes);
  return userInfo;
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

export async function updateRemainingBalance(newCount) {
  const user = auth.currentUser;
  const userRef = doc(db, "Users", user.uid);
  
  try {
    await setDoc(userRef, { "Remaining Balance": newCount }, { merge: true });
    console.log("Remaining Balance updated successfully");
  } catch (error) {
    console.error("Error updating Remaining Balance: ", error);
  }
}


export async function updateMealPlanType(newCount) {
  const user = auth.currentUser;
  const userRef = doc(db, "Users", user.uid);
  
  try {
    await setDoc(userRef, { "Meal Plan Type": newCount }, { merge: true });
    console.log("Updated Meal Plan Type");
  } catch (error) {
    console.error("Error updating Meal Plan Type: ", error);
  }
}

export async function initNewUser(newLogIn){
  const user = newLogIn.currentUser;
  const userRef = doc(db, "Users", user.uid);

  try{
    await setDoc(userRef, { "uid": user.uid }, { merge: true });
    console.log("Initalized a new user");
  }catch(error){
    console.error("Initalizing a new user: ", error);
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

export async function updateWeeklySwipesForLocations(newCount) {
  const user = auth.currentUser;
  const userRef = doc(db, "Users", user.uid);
  
  try {
    await fetchWeeklySwipeSchedule(); // Wait for fetchWeeklySwipeSchedule() to complete
    await setDoc(userRef, { "Current Week's Location Swipes": newCount }, { merge: true });
    console.log("Weekly Swipes for Locations updated successfully");
  } catch (error) {
    console.error("Error updating Weekly Swipes for Locations: ", error);
  }
}

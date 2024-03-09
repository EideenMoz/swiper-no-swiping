import { db } from "./FirebaseApp";
import app from "./FirebaseApp"
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const auth = getAuth(app);
const usersRef = collection(db, "Users");
const user = auth.currentUser;
export async function fetchFireStoreData(){
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

 
  
export async function updateWeeklySwipeCount(newCount) {
  const user = auth.currentUser;
  const userRef = doc(db, "Users", user.uid);
  
  try {
    await fetchWeeklySwipeSchedule(); // Wait for fetchWeeklySwipeSchedule() to complete
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
    await fetchWeeklySwipeSchedule(); // Wait for fetchWeeklySwipeSchedule() to complete
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
    await fetchWeeklySwipeSchedule(); // Wait for fetchWeeklySwipeSchedule() to complete
    await setDoc(userRef, { "Current Week's Location Swipes": newCount }, { merge: true });
    console.log("Weekly Swipes for Locations updated successfully");
  } catch (error) {
    console.error("Error updating Weekly Swipes for Locations: ", error);
  }
}
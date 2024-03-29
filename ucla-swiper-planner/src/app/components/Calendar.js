"use client";

// To inform Next.js that this is a client component

import React, { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';

import {getWeekString} from './WeekDates';

import {
  updateWeeklySwipesForLocations,
  fetchWeeklySwipesForLocations,
  updateRemainingBalance,
  fetchRemainingBalance,
  fetchLastLoggedEntry,
  updateLastLoggedEntry
  
} from '../../../firebase/FirebaseUtils';


import {
  getAuth,
  onAuthStateChanged
} from 'firebase/auth';

import {
  collection,
  doc,
  getDoc
} from 'firebase/firestore';

import { db } from '../../../firebase/FirebaseApp';


const auth = getAuth();
const usersRef = collection(db, "Users");
const user = auth.currentUser;
const TDYY= getWeekString();
let lastEntry;

const Calendar = () => {

  const [user, setUser] = useState(null); // Initialize user state
  // Other states and variables remain the same

  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const defaultEntry = { name: "", period: ""};

//Data structure for the entries
  const [tableData, setTableData] = useState(Array(7).fill([]).map(() => [{...defaultEntry }])); // Initialize as empty array

  const [lastSentCalendar, setLastSentCalendar] = useState(Array(7).fill([]).map(() => [{...defaultEntry }])); 

// Runs when there is a new user, sets dataTable so that the info on screen is up to date with the database
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state when auth state changes
    });

    if (user) { // Only proceed if the user object exists
      const fetchData = async () => {
        try {
          const week = getWeekString();
          console.log('YOOOOOOOOO'  , week);
          console.log(user);
          console.log('tableData', tableData);
          const weekEntries = await fetchWeeklySwipesForLocations();
          const formattedData = weekEntries[0]["Current Week's Location Swipes"]; // Assuming fetchWeeklySwipeSchedule needs the user's UID
          const updatedTableData = convertEntryMapToTableData(formattedData);
         
          try{
            lastEntry= weekEntries[0]["Last Entry Log"];
          }
          catch (error){
            updateLastLoggedEntry(TDYY);
            lastEntry=TDYY;
          }
          
          console.log('update data', updatedTableData);
          console.log('formatted data', formattedData);
          console.log('week data', weekEntries);
          setTableData(updatedTableData);
          setLastSentCalendar(updatedTableData);
          console.log('settingtabledata', tableData);
          
          checkAndClearCalendar();
  
        } catch (error) {
          console.error('Error fetching "week Entries":', error);
        }
      };
  
      fetchData(); 
      console.log("after tableData", tableData);
      // Call the fetchData function if the user is authenticated
    }

    return () => unsubscribe(); // Cleanup subscription
  }, [user]);
  
  //Clears the calendar and sends to database if it is a different week
  const clearCalendarToBlank = () => {
    // const swipesOnOldCalendar = swipesOnCalander(tableData);
    const blankTableData = Array(7).fill([]).map(() => [{...defaultEntry }]); 
    const firebaseData= createEntryMap(blankTableData);
    setTableData(blankTableData);
    console.log("New Calendar:", tableData);
    updateWeeklySwipesForLocations(firebaseData);
    updateLastLoggedEntry(TDYY);
  };

//checks to see if it is a different week, and clears calendar if it is
  const checkAndClearCalendar = async () => {
      if (!lastEntry) {
        clearCalendarToBlank();
        return;
      }
  
      if (lastEntry!==TDYY) {
        clearCalendarToBlank();
      }
    }

   function swipesOnCalander(Calendar){
    let total = 0;  
    for (let i=0; i<7; i++){
        total += (Calendar[i].length -1);
      } 
      return total;  //for some reason its returned as an object I SPENT SO LONG DISCOVERING THIS SO U PARSE TO INT
   }
    //function to convert map from firebase back into tableData format
    const convertEntryMapToTableData = (entryMap) => {
      
      const days = {
        monday:0,
        tuesday:1,
        wednesday:2,
        thursday:3,
        friday:4,
        saturday:5,
        sunday:6
      };
      const result = [[]];

      for (const [key, value] of Object.entries(days)) {
        result[value] = entryMap[key] || [];
        console.log('key', key);
        console.log('value', entryMap[key]);
      }
      return result;
    };

  
    //Updates the database with the new data based on tableData
    const UpdateWeeklySwipes = async () => {
      const entryMap = createEntryMap(tableData);
    
      const swipesOnOldCalendar = swipesOnCalander(lastSentCalendar);
      const swipesOnNewCalendar = swipesOnCalander(tableData);
    
      console.log('swipesOnOldCalendar:', swipesOnOldCalendar);
      console.log('swipesOnNewCalendar:', swipesOnNewCalendar);
     
      const data = await fetchRemainingBalance();
      const oldSwipeTotal = data[0]["Remaining Balance"]
      const updatedSwipeTotal = oldSwipeTotal - (swipesOnNewCalendar - swipesOnOldCalendar);
      console.log('updatedSwipeTotal:', updatedSwipeTotal);
    
      console.log('sent map', entryMap); // Just to test
      updateWeeklySwipesForLocations(entryMap);
      console.log('sent new bal: ', updatedSwipeTotal);
      updateRemainingBalance(updatedSwipeTotal);
      console.log('DATATABLE', tableData);
      setLastSentCalendar(tableData);
    };
    

//Creates a map to change tableData into a map firebase can take
const createEntryMap = (tableData) => {
  let dict = {

  };
  // Iterate through each day in tableData
  for (let i = 0; i < tableData.length; i++) {
    const dayOfWeek = daysOfWeek[i].toLowerCase(); // Get the corresponding day of the week
    const entries = tableData[i].map((item) => ({ name: item.name, period: item.period }));

    // Add the entries to the dict based on the day of the week
    dict[dayOfWeek] = entries;
  }

  console.log("converted into map", dict)
  console.log("converted into array", convertEntryMapToTableData(dict));
  return dict;
};

//Uses tableData to create a map of all the options
//Need to update with all the options after
    const createOptionMap = (tableData) => {  
      let dict = {
        deneve: 0,
        bplate: 0,
        epicuria: 0,
        thestudy: 0,
        rendewest: 0,
        rendeeast: 0,
        feast: 0,
        bcafe:0,
        campus: 0,
        foodtruck: 0
      };

      //Add the entries to the option map
      for (const day of tableData){
          for (const entry of day){
            if (entry.name == "De Neve "){
              dict.deneve+=1;
            }
            if (entry.name == 'Bplate '){
              dict.bplate+=1;
            }
            if (entry.name == "Epicuria "){
              dict.epicuria+=1;
            }
            if (entry.name == "Take-out "){
              dict.takeout+=1;
            }
            if (entry.name == 'Food Truck '){
              dict.foodtruck+=1;
            }
            if (entry.name == 'The Study '){
              dict.thestudy+=1;
            }
            if (entry.name == 'Rende West '){
              dict.rendewest+=1;
            }
            if (entry.name == 'Rende East '){
              dict.rendeeast+=1;
            }
            if (entry.name == 'Feast '){
              dict.feast+=1;
            }
            if (entry.name == 'BCafe '){
              dict.bcafe+=1;
            }
            if (entry.name == 'Campus '){
              dict.campus+=1;
            }
          }
      }
      return dict;
    };



//log table data
    const logDataStructure = () => {
      console.log('Entry map:', tableData);
      const result = createOptionMap(tableData);
      console.log('Option Map:', result);
      UpdateWeeklySwipes();
      
    };

  //Adds entry to Table
    const handleAddItem = (index) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        const newItem = { ...defaultEntry };
        newData[index] = [...newData[index], newItem];
        return newData;
      });
    };

    //Clears Table data
    const handleClearEntries = (index) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[index] = [{ ...defaultEntry }];
        return newData;
      });
    };
  
    //Sets table data based on selections in drop down menus
    const handleChange = (index, itemIndex, property, value) => {
      console.log('CHangeing', tableData);
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[index][itemIndex] = {
          ...newData[index][itemIndex],
          [property]: value,
        };
        return newData;
      });
    };
  
    //Objects for the buttons
    const periodOptions = [
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
      { value: 'Late-night', label: 'Late-Night' },
    ];

    const nameOptions = [
      { value: 'De Neve ', label: 'De Neve' },
      { value: 'Bplate ', label: 'Bplate' },
      { value: 'Epicuria ', label: 'Epicuria' },
      { value: 'Feast ', label: 'Feast' },
      { value: 'The Study ', label: 'The Study' },
      { value: 'Rende West ', label: 'Rende West' },
      { value: 'Rende East ', label: 'Rende East' },
      { value: 'BCafe ', label: 'BCafe' },
      { value: 'Campus ', label: 'Campus' },
      { value: 'Food Truck ', label: 'Food Truck' },
    ];

    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      if (user) { // Only proceed if the user object exists
        const fetchData = async () => {
          try {
            console.log('tableData', tableData);
            const weekEntries = await fetchWeeklySwipeSchedule();
            const formattedData = weekEntries[0]["Current Week's Location Swipes"]; // Assuming fetchWeeklySwipeSchedule needs the user's UID
            const updatedTableData = convertEntryMapToTableData(formattedData);
            //console logs for testing
            console.log('update data', updatedTableData);
            console.log('formatted data', formattedData);
            console.log('week data', weekEntries);
            setTableData(updatedTableData);
            console.log('settingtabledata', tableData);
          } catch (error) {
            console.error('Error fetching "week Entries":', error);
          }
        };
    
        fetchData(); 
        console.log("after tableData", tableData);
        // Call the fetchData function if the user is authenticated
      }
      return () => {
        console.log('Component unmounted, cleanup code');
      };
    }, []); // Depend on `user` to re-run the effect when the user's sign-in state changes


    // Rest of your component code...

    return (
      <div className={styles.container} >
        {/* <h2>Month1 Day1 - Month2 Day2</h2> */}
        <table className={styles.Calendar}>
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className={styles.Calendar}>
              {tableData.map((items, index) => (
                <td key={index}>
                  <div className={styles.Padding}>

                    {/* Dropdown for names */}
                    <select
                      value={items[items.length - 1]?.name || ''}
                      onChange={(e) => handleChange(index, items.length - 1, 'name', e.target.value)}
                    >
                      <option value="" disabled>Add Meal</option>
                      {nameOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    
                    {/* Dropdown for Period */}
                    <select
                      value={items[items.length - 1]?.period || ''}
                      onChange={(e) => handleChange(index, items.length - 1, 'period', e.target.value)}
                    >
                      <option value="" disabled>Add Period</option>
                      {periodOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Buttons for Add and Clear*/}  
                    <button className={styles.Button} onClick={() => handleAddItem(index)}>Confirm</button>
                    <button className={styles.Button} onClick={() => handleClearEntries(index)}>Clear Entries</button>

                  </div>
                  {items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.name} ${item.period}`}</div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div className={styles.UpdateContainer} > 
          <button className={styles.UpdateButton}  onClick={logDataStructure}>
        Send Update
      </button>
      </div>
       
        </div>
        
    );
  };
  
  export default Calendar;
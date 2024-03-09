"use client";

// To inform Next.js that this is a client component

import React, { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';

import {
  updateWeeklySwipesForLocations,
  fetchWeeklySwipeSchedule,
  
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



const Calendar = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    const defaultEntry = { name: '', period: '' };
  
    const [tableData, setTableData] = useState(Array(7).fill([]).map(() => [{ ...defaultEntry }])); // Initialize as empty array

    //function to convert map from firebase back into tableData format
    const convertEntryMapToTableData = (entryMap) => {
      
      const table = daysOfWeek.map((day) => {
        // Check if entryMap[day] exists before calling map
        const entries = entryMap[day] ? entryMap[day].map((entry) => ({
          name: entry.name + ' ',
          period: entry.period,
        })) : [];
      
        return entries;
      });
    
      return table;
    };

  
const UpdateWeeklySwipes = async (e) =>{
  const result = createOptionMap(tableData);
  const entryMap = createEntryMap(tableData); //Just to test
  updateWeeklySwipesForLocations(entryMap);
  }

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
  
    console.log(dict)
    return dict;
  };

//Uses tableData to create a map of all the options
//Need to update with all the options after
    const createOptionMap = (tableData) => {  
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
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[index][itemIndex] = {
          ...newData[index][itemIndex],
          [property]: value,
        };
        return newData;
      });
    };
  
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const weekEntries = await fetchWeeklySwipeSchedule();
          const updatedTableData = convertEntryMapToTableData(weekEntries);
          setTableData(updatedTableData);
        } catch (error) {
          console.error('Error fetching "week Entries":', error);
        }
      };
  
      fetchData(); // Call the fetchData function on component mount
    }, []); 

    return (
      <div className ={styles.Calendar} >
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
                      <option value="" disabled>Select Name</option>
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
                      <option value="" disabled>Select Period</option>
                      {periodOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Buttons for Add and Clear*/}  
                    <button className={styles.Button} onClick={() => handleAddItem(index)}>Add Item</button>
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
        <div className ={styles.UpdateButton}> 
          <button className={styles.UpdateButton} onClick={logDataStructure}>
        Send Update
      </button>
      </div>
       
        </div>
        
    );
  };
  
  export default Calendar;
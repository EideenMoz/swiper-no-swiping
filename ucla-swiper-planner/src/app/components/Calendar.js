// Filename: src/app/components/Calendar.js

// To inform Next.js that this is a client component
'use client'
import React, { useState } from 'react';
import styles from '../styles/Calendar.module.css'



const Calendar = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    const defaultEntry = { name: '', period: '' };
  
    const [tableData, setTableData] = useState(Array(7).fill([]).map(() => [{ ...defaultEntry }])); // Initialize as empty array

// TEST


//END TEST



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
            if (entry.name == 'Bcafe '){
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
      
    };

  //firebase.update(newData[index])
    const handleAddItem = (index) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        const newItem = { ...defaultEntry };
        newData[index] = [...newData[index], newItem];
        return newData;
      });
    };

    const handleClearEntries = (index) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        newData[index] = [{ ...defaultEntry }];
        return newData;
      });
    };
  
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
                    <select
                      value={items[items.length - 1]?.name || ''}
                      onChange={(e) => handleChange(index, items.length - 1, 'name', e.target.value)}
                    >
                      <option value="" disabled>Select Name</option>
                      <option value="De Neve ">De Neve</option>
                      <option value="Bplate ">Bplate</option>
                      <option value="Epicuria ">Epicuria</option>
                      <option value="Feast ">Feast</option>
                      <option value="The Study ">The Study</option>
                      <option value="Rende West ">Rende West</option>
                      <option value="Rende East ">Rende East</option>
                      <option value="BCafe ">BCafe</option>
                      <option value="Campus ">Campus</option>
                      <option value="Food Truck ">Food Truck</option>
                    </select>
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
        <button className={styles.Button} onClick={logDataStructure}>
        Send Update
      </button>
        </div>
        
    );
  };
  
  export default Calendar;
  
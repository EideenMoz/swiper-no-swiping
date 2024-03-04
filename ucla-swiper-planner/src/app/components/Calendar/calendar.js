// Filename: src/app/components/Calendar.js

// To inform Next.js that this is a client component
'use client'
import React, { useState } from 'react';
import "../../ui/globals.css";



const Calendar = () => {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    const defaultEntry = { name: '', period: '' };
  
    const [tableData, setTableData] = useState(Array(7).fill([]).map(() => [{ ...defaultEntry }])); // Initialize as empty array


  
    const handleAddItem = (index) => {
      setTableData((prevData) => {
        const newData = [...prevData];
        const newItem = { ...defaultEntry };
        newData[index] = [...newData[index], newItem];
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
      <div>
        <h2>Month1 Day1 - Month2 Day2</h2>
        <table border="1">
          <thead>
            <tr>
              {daysOfWeek.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableData.map((items, index) => (
                <td key={index}>
                  <div>
                    <select
                      value={items[items.length - 1]?.name || ''}
                      onChange={(e) => handleChange(index, items.length - 1, 'name', e.target.value)}
                    >
                      <option value="" disabled>Select Name</option>
                      <option value="De Neve: ">De Neve</option>
                      <option value="Bplate: ">Bplate</option>
                      <option value="Epicuria: ">Epicuria</option>
                      <option value="Take-out: ">Take-out</option>
                      <option value="Food Truck: ">Food Truck</option>
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
                    <button onClick={() => handleAddItem(index)}>Add Item</button>
                  </div>
                  {items.map((item, itemIndex) => (
                    <div key={itemIndex}>{`${item.name} ${item.period}`}</div>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        </div>
    );
  };
  
  export default Calendar;
  
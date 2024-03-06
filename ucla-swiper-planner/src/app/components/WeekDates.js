'use client'
import React, { useEffect } from 'react';
import moment from './moment';

const WeekDatesDisplay = () => {
    // Get the current date
    const currentDate = moment();
  
    // Calculate the start and end of the week
    const startOfWeek = currentDate.clone().startOf('week');
    const endOfWeek = currentDate.clone().endOf('week');
  
    // Format the dates in the desired format
    const monday = startOfWeek.add(1, 'days');
    const sunday = endOfWeek.add(1, 'days');
    const formattedStartDate = monday.format('MMMM D Y');
    const formattedEndDate = sunday.format('MMMM D Y');

    return (
      <div>
        <h2>{`${formattedStartDate} - ${formattedEndDate}`}</h2>
      </div>
    );
  };
  
  export default WeekDatesDisplay;

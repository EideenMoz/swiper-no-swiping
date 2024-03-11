'use client'
import React, { useState, useEffect } from 'react';
import styles from '../styles/Calendar.module.css';

const WeekDatesDisplay = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(currentDate));
  const [endOfWeek, setEndOfWeek] = useState(getEndOfWeek(currentDate));

  useEffect(() => {
    const updateDates = () => {
      const now = new Date();
      setStartOfWeek(getStartOfWeek(now));
      setEndOfWeek(getEndOfWeek(now));
    };

    const intervalId = setInterval(updateDates, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  function getStartOfWeek(date) {
    const currentDay = date.getDay();
    const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust for Sunday
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - diff);
    return startOfWeek;
  }

  function getEndOfWeek(date) {
    const currentDay = date.getDay();
    const diff = currentDay === 0 ? 0 : 7 - currentDay; // Adjust for Sunday
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() + diff);
    return endOfWeek;
  }

  //format strings to be displayed
  const startOfWeekFormatted = startOfWeek.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const endOfWeekFormatted = endOfWeek.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.CenterText}>
      <h2>{startOfWeekFormatted} - {endOfWeekFormatted}</h2>
    </div>
  );
};

export default WeekDatesDisplay;
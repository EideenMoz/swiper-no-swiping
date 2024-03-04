// Filename: src/app/components/Calendar.js

// To inform Next.js that this is a client component
'use client'
import React, { useState } from 'react';
import Wheel from "./wheel.js";
import Calendar from "./calendar.js";
import "./wheel.css";
import "../../ui/globals.css";

const CalendarPage = () => {
 
  return (
   <div>
    <h1>Welcome To The Calendar Page!</h1>
    <Calendar></Calendar>
    <Wheel></Wheel>
   </div>
  );
};

export default CalendarPage;

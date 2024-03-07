// Calendar/page.js

// Filename: src/app/components/Calendar.js

// To inform Next.js that this is a client component
'use client'
import React, { useState } from 'react';

// Components
import Wheel from "../components/Wheel.js";
import Calendar from "../components/Calendar.js";


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
// Calendar/page.js

// Filename: src/app/components/Calendar.js

// To inform Next.js that this is a client component

import styles from '../styles/Calendar.module.css'

// Components
import Wheel from "../components/Wheel.js";
import Calendar from "../components/Calendar.js";
//import WeekDatesDisplay from '../components/weekDates.js';
import WeekDatesDisplay from '../components/WeekDates.js';



const CalendarPage = () => {
 
  return (
   <>
    <h1>Welcome To The Calendar Page!</h1>
    <WeekDatesDisplay></WeekDatesDisplay>
    <Calendar />
    <Wheel />
   </>
  );
};

export default CalendarPage;
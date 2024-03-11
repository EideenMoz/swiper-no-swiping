// Calendar/page.js

// Filename: src/app/components/Calendar.js

// Components
import Wheel from "../components/Wheel.js";
import Calendar from "../components/Calendar.js";
import styles from '../styles/Calendar.module.css';
import Navbar from "../components/navbar.js";
import SignOut from "../components/SignOutButton.js";

//import WeekDatesDisplay from '../components/weekDates.js';
import WeekDatesDisplay from '../components/WeekDates.js';



const CalendarPage = () => {
 
  return (
   <>
    <Navbar />
    <SignOut />
    <h1 className={styles.CenterText}>Welcome To The Calendar Page!</h1>
    <WeekDatesDisplay></WeekDatesDisplay>
    <Calendar />
    <Wheel />
   </>
  );
};

export default CalendarPage;
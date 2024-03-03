'use client';

// pages/index.js

import { useEffect, useState } from 'react';
import styles from './ui/Home.module.css'; // Make sure to have this CSS file for styling
import Navbar from './ui/Navbar';
import Menu from './ui/Menu';


// Mock data, assuming you would replace this with real data fetched from the backend
const mockTotalSwipesUsed = 120;
const mockWeeklySwipesUsed = 15;
const totalWeeks = 10;
const swipesPerWeek = 19;
const totalSwipesAvailable = totalWeeks * swipesPerWeek;

export default function Home() {
    const [totalSwipesUsed, setTotalSwipesUsed] = useState(mockTotalSwipesUsed);
    const [weeklySwipesUsed, setWeeklySwipesUsed] = useState(mockWeeklySwipesUsed);

    useEffect(() => {
        // Here, you would fetch the actual swipe data from your backend
        // For demonstration, we're using mock data
        // Example:
        // fetch('/api/swipe-data').then(res => res.json()).then(data => {
        //     setTotalSwipesUsed(data.total);
        //     setWeeklySwipesUsed(data.weekly);
        // });
    }, []);

    const onTrack = (totalSwipesUsed / totalSwipesAvailable) <= (1 / totalWeeks);

    return (

        <div className={styles.container}>
            <main className={styles.main}>
              {/* <Navbar /> */}
                <h1 className={styles.title}>Welcome to UCLA Swipe Planner!</h1>
                <div className={styles.swipeTracker}>
                    <h2>Swipe Tracker</h2>
                    <p>Total Swipes Used: {totalSwipesUsed}</p>
                    <p>This Week's Swipes: {weeklySwipesUsed}</p>
                </div>

                <div className={styles.balanceInfo}>
                    <h2>Meal Swipe Balance</h2>
                    <p>You are {onTrack ? "on track" : "not on track"} with your meal swipe balance.</p>
                </div>
                <Menu />
            </main>
        </div>
    );
}

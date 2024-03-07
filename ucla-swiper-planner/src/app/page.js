// app/page/index.page.

// Components 
import React from 'react';
import Menu from './components/Menu'; // Adjust the import path as needed
import SwipeTracker from './components/SwipeTracker'; // Adjust the import path as needed
import BalanceInfo from './components/BalanceInfo'; // Adjust the import path as needed

// Styles
import styles from './styles/Home.module.css'; // Adjust the import path as needed

// Mock data for demonstration
// Replace Database fetching logic here 
const mockData = {
    totalSwipesUsed: 120,
    weeklySwipesUsed: 15,
    totalWeeks: 10,
    swipesPerWeek: 19,
    currentWeek: 9,
    currentDay: 1,
};

// Calculate additional data based on mockData
const totalSwipesAvailable = mockData.totalWeeks * mockData.swipesPerWeek;
const onTrack = (mockData.totalSwipesUsed / totalSwipesAvailable) <= (1 / mockData.totalWeeks); 

export default function Home() {
    // Here, you'd replace mockData with actual data fetched from your database

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to UCLA Swipe Planner!</h1>
                <SwipeTracker totalSwipesUsed={mockData.totalSwipesUsed} weeklySwipesUsed={mockData.weeklySwipesUsed} />        
                <BalanceInfo 
                    totalSwipesUsed={mockData.totalSwipesUsed} 
                    totalSwipesAvailable={totalSwipesAvailable} 
                    currentWeek={mockData.currentWeek} 
                    currentDay={mockData.currentDay} 
                    swipesPerWeek={mockData.swipesPerWeek}  
                    onTrack={onTrack} 
                />
                <Menu />
            </main>
        </div>
    );
}

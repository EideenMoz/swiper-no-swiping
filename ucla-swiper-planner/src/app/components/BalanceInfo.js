// components/BalanceInfo.js

// Styles
import styles from '../styles/Home.module.css'; 

function BalanceInfo({ totalSwipesUsed, totalSwipesAvailable, currentWeek, currentDay, swipesPerWeek, onTrack }) {
    return (
        <div className={styles.balanceInfo}>
            <h2>Meal Swipe Balance</h2>
            <p>You have {totalSwipesAvailable - totalSwipesUsed} swipes remaining.</p>
            <p>You should have {totalSwipesAvailable - ((currentWeek * swipesPerWeek) - (currentDay * 3))} swipes remaining.</p>
            <p>You are {onTrack ? "on track" : "not on track"} with your meal swipe balance.</p>
        </div>
    );
}

export default BalanceInfo;

// components/SwipeTracker.js
import styles from '../styles/Home.module.css'; // Adjust the import path as needed

function SwipeTracker({ totalSwipesUsed, weeklySwipesUsed }) {
    return (
        <div className={styles.swipeTracker}>
            <h2>Swipe Tracker</h2>
            <p>Total Swipes Used: {totalSwipesUsed}</p>
            <p>This Week's Swipes: {weeklySwipesUsed}</p>
        </div>
    );
}

export default SwipeTracker;

// Filename: src/app/components/Profile.js


import styles from '../styles/Profile.module.css'; // Import your CSS file for styling
import SwipePlanner from "../components/UserPreferences.js";

const podiumData = [
  { name: "B-Plate", visits: 70 },
  { name: "Epicuria", visits: 60 },
  { name: "De Neve", visits: 30 },
  // Add more restaurant entries as needed
];

const Profile = () => {
  const sortedPodiumData = [...podiumData].sort((a, b) => b.visits - a.visits);

  return (
    <>
      <SwipePlanner />
      <div className={styles.container}>  
        <div className={styles.podium}>
          {/* Display the top 3 most visited restaurants */}
          {sortedPodiumData.slice(0, 3).map((restaurant, index) => (
            <div key={index} className={`${styles.podiumBlock} ${styles[`podiumBlock${index + 1}`]}`}>
              <p>{restaurant.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;  

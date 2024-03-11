// components/Menu.js
import styles from './Menu.module.css'; // Assuming you will create a CSS module for styling

const Menu = () => {
  return (
    <div className={styles.menu}>
      <h2 className={styles.menuTitle}>Menu of the Day</h2>
      <div className={styles.mealSection}>
        <h3>Breakfast</h3>
        <ul>
          {/* Placeholder items - replace with actual meal data */}
          <li>Scrambled Eggs</li>
          <li>Toast with Jam</li>
          <li>Fresh Fruit</li>
        </ul>
      </div>
      <div className={styles.mealSection}>
        <h3>Lunch</h3>
        <ul>
          {/* Placeholder items - replace with actual meal data */}
          <li>Grilled Chicken Sandwich</li>
          <li>Caesar Salad</li>
          <li>Chocolate Chip Cookie</li>
        </ul>
      </div>
      <div className={styles.mealSection}>
        <h3>Dinner</h3>
        <ul>
          {/* Placeholder items - replace with actual meal data */}
          <li>Spaghetti Carbonara</li>
          <li>Garlic Bread</li>
          <li>Tiramisu</li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;

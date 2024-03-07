// components/Menu.js

// Components 
// import DailyMenu from './FetchDailyMenu';

// For now, Important the meals statically before rendering 
import meals from '../DailyMenu/menu_2024-03-05'
// import { promises as fs } from 'fs';
// import path from 'path'; // Import the path module

// async function FetchMenu() {
//     try {
//         // Construct the full path in a platform-independent way
//         const filePath = path.join(process.cwd(), '../Future-Menus/menu_2024-03-05.json');
        
//         // Read the file
//         const fileContents = await fs.readFile(filePath, 'utf8');
        
//         // Parse the JSON content
//         const menu = JSON.parse(fileContents);
        
//         // Log the menu object to the console
//         console.log(menu);
        
//         // Optionally, return the menu object if you need to use it elsewhere
//         return menu;
//     } catch (error) {
//         // If there's an error, log it to the console
//         console.error('Error fetching the menu:', error);
//         return null; // Return null or handle the error as appropriate
//     }
// }

// // Call FetchMenu to test it
// FetchMenu().then(menu => {
//     if (menu) {
//         // If you need to do something with the menu data after logging, you can do it here.
//         // For example, this logs the fact that the menu has been successfully fetched.
//         console.log('Menu fetched successfully.');
//     }
// });
// Styles
import styles from '../styles/Menu.module.css'; 

// const meals = {
//     Breakfast: {
//         "Bruin Plate": ["Pancakes", "Bacon", "Coffee"],
//         "De Neve": ["Oatmeal", "Fruit Salad", "Tea"],
//         "The Study at Hedrick": ["Eggs Benedict", "Sausages", "Orange Juice"],
//         "Residential Restaurant 1": ["French Toast", "Mixed Berries", "Espresso"],
//         "Residential Restaurant 2": ["Bagels with Cream Cheese", "Smoothies", "Cappuccino"]
//     },
//     Lunch: {
//       "Bruin Plate": ["Pancakes", "Bacon", "Coffee"],
//       "De Neve": ["Oatmeal", "Fruit Salad", "Tea"],
//       "Food Trucks": ["Eggs Benedict", "Sausages", "Orange Juice"],
//       "Rendevous East": ["French Toast", "Mixed Berries", "Espresso"],
//       "Rendevous West": ["Bagels with Cream Cheese", "Smoothies", "Cappuccino"]
//     },
//     Dinner: {
//       "Bruin Plate": ["Pancakes", "Bacon", "Coffee"],
//       "De Neve": ["Oatmeal", "Fruit Salad", "Tea"],
//       "Epicuria": ["Eggs Benedict", "Sausages", "Orange Juice"],
//       "Food Trucks": ["French Toast", "Mixed Berries", "Espresso"],
//       "Feast at Reiber": ["Bagels with Cream Cheese", "Smoothies", "Cappuccino"]
//     }
// };

// const meals = FetchMenu();
// console.log(meals)

export default function Menu(){
    return (
        <div className={styles.menu}>
            <h2 className={styles.menuTitle}>Menu of the Day</h2>
            {Object.entries(meals).map(([mealType, diningOptions]) => (
                <div key={mealType} className={styles.mealSection}>
                    <h3>{mealType}</h3>
                    {Object.entries(diningOptions).map(([diningName, menuItems]) => (
                        <div key={diningName}>
                            <h4>{diningName}</h4>
                            <ul>
                                {menuItems.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};



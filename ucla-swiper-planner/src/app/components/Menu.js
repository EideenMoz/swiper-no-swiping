// components/Menu.js
'use client'

import React, { useState, useEffect } from 'react';
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




export default function Menu(){
    const [meals, setMeals] = useState(null);
    
    useEffect(() => {
        // Function to format the date to match the file naming convention
        const formatDate = (date) => {
            let month = '' + (date.getMonth() + 1),
                day = '' + date.getDate(),
                year = date.getFullYear();
            
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
            
            return [year, month, day].join('-');
        };

        // Dynamically import the menu based on today's date
        const fetchMenu = async () => {
            const today = new Date();
            const formattedDate = formatDate(today);
            try {
                const menu = await import(`../DailyMenu/menu_${formattedDate}.json`);
                setMeals(menu.default);
            } catch (error) {
                console.error('Error fetching the menu:', error);
                // Handle the case where the file does not exist for today's date
                // e.g., setMeals to a default value or manage the error state
            }
        };

        fetchMenu();
    }, []);

    // Early return if meals is null or loading
    if (!meals) return <div>Loading...</div>;

    return (
        <div className={styles.menu}>
            <h2 className={styles.menuTitle}>Checkout Today's Dining Hall Options</h2>
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



// app/page/index.page.

// Components 
import React from 'react';
import Menu from './components/Menu'; // Adjust the import path as needed
import SignIn from './components/SignInButton';

// Styles
import styles from './styles/Home.module.css'; // Adjust the import path as needed



export default function Home() {
    // Here, you'd replace mockData with actual data fetched from your database

    return (
        <>
            <SignIn />
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to UCLA Swipe Planner!</h1>
                    <Menu />
                </main>
            </div>
        </>
    );
}
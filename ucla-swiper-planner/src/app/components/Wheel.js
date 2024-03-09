//Credit to Shekhar Ramola 2022, react-wheel-of-prizes
//Link: https://www.npmjs.com/package/react-wheel-of-prizes


'use client'
import React, { useState } from 'react';

// components
import WheelComponent from "./react-wheel-of-prizes";

//styling
import styles from "../styles/Wheel.module.css";

const Wheel= () => {
  
    const segments = [
      'De Neve',
      'Bplate',
      'Epicuria',
      'Feast',
      'The Study',
      'Rende West',
      'Rende East',
      'BCafe',
      'Campus',
      'Food Truck',
    ];
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F",
    "#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    const onFinished = (winner) => {
      console.log(winner);
    };
  
  
    const periodOptions = [
      { value: 'Breakfast', label: 'Breakfast' },
      { value: 'Lunch', label: 'Lunch' },
      { value: 'Dinner', label: 'Dinner' },
      { value: 'Late-night', label: 'Late-Night' },
    ];
  
    return (
      <div>

        <div>
          <h1>What Should I Eat?</h1>
            <WheelComponent className={styles.Wheel}
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              buttonText="Spin"
              isOnlyOnce={false}
              size={250}
              upDuration={75}
              downDuration={400}
              fontFamily="Arial"
            />
  
        </div>
      </div>
    );
  };
  
  export default Wheel;
  
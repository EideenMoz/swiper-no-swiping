'use client'
import React, { useState } from 'react';

// components
import WheelComponent from "./react-wheel-of-prizes";

//styling
import "../styles/Wheel.module.css";

const Wheel= () => {
  
    const segments = [
      "Bplate",
      "De Neve",
      "Epicuria",
      "Food Truck",
      "Take-out",
    ];
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
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

        <div className = "Wheel">
          <h1>What Should I Eat?</h1>
            <WheelComponent
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
  
//Credit to Shekhar Ramola 2022, react-wheel-of-prizes
//Link: https://www.npmjs.com/package/react-wheel-of-prizes
//Component for wheel in components/react-wheel-of-prizes

'use client'
import React, { useState } from 'react';

// components
import WheelComponent from "./react-wheel-of-prizes";

//styling
import styles from "../styles/Wheel.module.css";

const Wheel= () => {
  //Set the options on the wheel
    const segments = [
      "Bplate",
      "De Neve",
      "Epicuria",
      "Food Truck",
      "Take-out",
      "Rende West",
      "Rende East",
      "BCafe",
      "Campus",
      "Feast"
    ];
    const segColors = ["#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F","#EE4040", "#F0CF50", "#815CD1", "#3DA5E0", "#34A24F"];
    const onFinished = (winner) => {
      console.log(winner);
    };
  

  
    return (
      <div>

        <div>
          <h1 className={styles.PaddedText}>Don't know what to eat? Spin the wheel!</h1>
            <div className={styles.Wheel}>
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
      </div>  
    );
  };
  
  export default Wheel;
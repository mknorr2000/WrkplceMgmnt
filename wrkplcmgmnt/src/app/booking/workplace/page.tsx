'use client';

import React, { useState } from 'react';
import styles from './BookWorkplacePage.module.css'; // Import the CSS module

const WorkplaceBookingPage = () => {
  // State to track the currently selected workplace
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(null);

  // State to track the booked workplace
  const [booked, setBooked] = useState<string | null>(null);

  // Function to handle workplace selection
  const handleClick = (workplace: string) => {
    // Allow selection only if no workplace is booked
    if (!booked) {
      setSelectedWorkplace(workplace);
    }
  };

  // Function to handle booking action
  const handleBookClick = () => {
    if (selectedWorkplace) {
      // Mark the selected workplace as booked
      setBooked(selectedWorkplace);
      alert(`${selectedWorkplace} has been booked!`);
    } else {
      alert('Please select a workplace first!');
    }
  };

  return (
    <div>
      <h1>Book a Workplace</h1>
      <p>Select and book your workplace below:</p>

      <div className={styles['workplace-container']}>
        {/* Workplace A1 */}
        <div
          className={`${styles.workplace} ${styles.available} ${
            selectedWorkplace === 'A1' && !booked ? styles.clicked : ''
          } ${booked === 'A1' ? styles.booked : ''}`}
          onClick={() => handleClick('A1')}
        >
          Workplace A1
        </div>

        {/* Workplace B1 */}
        <div
          className={`${styles.workplace} ${styles.available} ${
            selectedWorkplace === 'B1' && !booked ? styles.clicked : ''
          } ${booked === 'B1' ? styles.booked : ''}`}
          onClick={() => handleClick('B1')}
        >
          Workplace B1
        </div>

        {/* Workplace C1 */}
        <div
          className={`${styles.workplace} ${styles.available} ${
            selectedWorkplace === 'C1' && !booked ? styles.clicked : ''
          } ${booked === 'C1' ? styles.booked : ''}`}
          onClick={() => handleClick('C1')}
        >
          Workplace C1
        </div>
      </div>

      {/* Book Button */}
      <button className={styles['book-button']} onClick={handleBookClick}>
        Book
      </button>
    </div>
  );
};

export default WorkplaceBookingPage;

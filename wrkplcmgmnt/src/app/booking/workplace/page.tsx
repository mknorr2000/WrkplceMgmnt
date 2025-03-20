'use client';

import React, { useState } from 'react';
import './styles.css';

const WorkplaceBookingPage = () => {
  // State to keep track of the currently selected workplace
  const [selectedWorkplace, setSelectedWorkplace] = useState<string | null>(null); 
  
  // State to track the booked workplace
  const [booked, setBooked] = useState<string | null>(null); 

  // Function to handle click on a workplace (when the user selects a workplace)
  const handleClick = (workplace: string) => {
    // Only allow selecting a workplace if nothing is booked yet
    if (!booked) {
      setSelectedWorkplace(workplace); // Set the selected workplace
    }
  };

  // Function to handle the "Book" button click
  const handleBookClick = () => {
    if (selectedWorkplace) {
      // If a workplace is selected, mark it as booked
      setBooked(selectedWorkplace);
      alert(`${selectedWorkplace} has been booked!`); // Alert that the workplace is booked
    } else {
      alert('Please select a workplace first!'); // Alert if no workplace is selected
    }
  };

  return (
    <div>
      <h1>Book a workplace</h1>
      <p>Here you can book your workplace</p>

      <div className="workplace-container">
        <div
          className={`workplace available ${selectedWorkplace === 'A1' && !booked ? 'clicked' : ''} ${booked === 'A1' ? 'booked' : ''}`}
          onClick={() => handleClick('A1')}
        >
          Workplace A1
        </div>
        <div
          className={`workplace available ${selectedWorkplace === 'B1' && !booked ? 'clicked' : ''} ${booked === 'B1' ? 'booked' : ''}`}
          onClick={() => handleClick('B1')}
        >
          Workplace B1
        </div>
        <div
          className={`workplace available ${selectedWorkplace === 'C1' && !booked ? 'clicked' : ''} ${booked === 'C1' ? 'booked' : ''}`}
          onClick={() => handleClick('C1')}
        >
          Workplace C1
        </div>
      </div>

      <button className="book-button" onClick={handleBookClick}>
        Book
      </button>
    </div>
  );
};

export default WorkplaceBookingPage;

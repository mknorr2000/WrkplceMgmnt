'use client';

import React, { useState } from 'react';
import styles from './BookParkplacePage.module.css'; // Import the CSS module
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ParkplaceBookingPage = () => {
  // State variables to manage selected parking spot, date, and time
  const [selectedParkplace, setSelectedParkplace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Handle parking spot selection
  const handleClick = (parkplace: string) => {
    setSelectedParkplace((prev) => (prev === parkplace ? null : parkplace));
  };

  // Determine CSS class for a parking spot based on its selection status
  const getParkplaceClass = (parkplace: string) =>
    selectedParkplace === parkplace ? `${styles.clicked}` : '';

  return (
    <div className={styles['plan-container']}>
      <h1>Book a Parking Spot</h1>

      {/* Date and time pickers */}
      <div className={styles['date-picker-container']}>
        <label htmlFor="date-picker">Select a Date:</label>
        <ReactDatePicker
          id="date-picker"
          selected={selectedDate}
          onChange={setSelectedDate}
          className={styles['date-picker']}
          dateFormat="yyyy-MM-dd"
        />

        <label htmlFor="start-time">Start Time:</label>
        <ReactDatePicker
          id="start-time"
          selected={startTime}
          onChange={setStartTime}
          className={styles['date-picker']}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
        />

        <label htmlFor="end-time">End Time:</label>
        <ReactDatePicker
          id="end-time"
          selected={endTime}
          onChange={setEndTime}
          className={styles['date-picker']}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
        />
      </div>

      {/* Office building and parking spots */}
      <div className={styles['office-building']}>
        <div className={styles['parkplaces-column']}>
          {/* Parking spots to the right of the office */}
          {Array.from({ length: 6 }, (_, index) => {
            const parkplaceId = `right${index + 1}`;
            return (
              <div
                key={parkplaceId}
                className={`${styles['rightParking']} ${getParkplaceClass(parkplaceId)}`}
                onClick={() => handleClick(parkplaceId)}
              >
                P{index + 11}
              </div>
            );
          })}
        </div>
        <h1>Office Building</h1>
      </div>

      <div className={styles['parkplaces-container']}>
        {/* Parking spots in front of the office */}
        <div className={styles['center-parkplace']}>
          {[...Array(2)].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className={styles['parkplaces-row']}>
              {Array.from({ length: 5 }, (_, colIndex) => {
                const parkplaceId = `front${rowIndex * 5 + colIndex + 1}`;
                return (
                  <div
                    key={parkplaceId}
                    className={`${styles['frontParking']} ${getParkplaceClass(parkplaceId)}`}
                    onClick={() => handleClick(parkplaceId)}
                  >
                    P{rowIndex * 5 + colIndex + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Booking button */}
      <button
        className={styles['book-button']}
        disabled={!selectedParkplace || !selectedDate || !startTime || !endTime}
      >
        Book Parking Spot
      </button>

      {/* Legend for parking spot status */}
      <div className={styles['legend']}>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: 'red' }}></span>
          - Booked
        </div>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: 'green' }}></span>
          - Available
        </div>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: '#009999' }}></span>
          - Selected Place
        </div>
      </div>
    </div>
  );
};

export default ParkplaceBookingPage;
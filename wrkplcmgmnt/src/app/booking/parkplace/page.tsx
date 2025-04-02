"use client"
import React, { useState, useEffect } from 'react';
import styles from './BookParkplacePage.module.css';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ParkplaceBookingPage = () => {
  const [selectedParkplace, setSelectedParkplace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [bookedParkplaces, setBookedParkplaces] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/parkplaces/booked')
      .then((res) => res.json())
      .then((data) => setBookedParkplaces(data));
  }, []);

  const handleClick = (parkplace: string) => {
    if (Array.isArray(bookedParkplaces) && !bookedParkplaces.includes(parkplace)) {
      setSelectedParkplace((prev) => (prev === parkplace ? null : parkplace));
    }
  };

  const handleBooking = async () => {
    if (!selectedParkplace || !selectedDate || !startTime || !endTime) return;

    const response = await fetch(`/api/parkplaces/${selectedParkplace}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
      }),
    });

    if (response.ok) {
      setBookedParkplaces((prev) => [...prev, selectedParkplace]);
      setSelectedParkplace(null);
      setStartTime(null);
      setEndTime(null);
    }
  };

  const getParkplaceClass = (parkplace: string) => {
    if (Array.isArray(bookedParkplaces) && bookedParkplaces.includes(parkplace)) {
      return styles.booked;
    }
    return selectedParkplace === parkplace ? styles.clicked : '';
  };

  return (
    <div className={styles['plan-container']}>
      <h1>Book a Parking Spot</h1>
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
      <div className={styles['office-building']}>
        <div className={styles['parkplaces-column']}>
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
      <button
        className={styles['book-button']}
        onClick={handleBooking}
        disabled={!selectedParkplace || !selectedDate || !startTime || !endTime}
      >
        Book Parking Spot
      </button>
      <div className={styles['legend']}>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: 'red' }}></span> - Booked
        </div>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: 'green' }}></span> - Available
        </div>
        <div className={styles['legend-text']}>
          <span className={styles['legend-box']} style={{ backgroundColor: '#009999' }}></span> - Selected Place
        </div>
      </div>
    </div>
  );
};

export default ParkplaceBookingPage;
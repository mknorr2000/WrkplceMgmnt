"use client";
import React, { useEffect, useState } from 'react';
import styles from './OverviewPage.module.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/reservations?user_id=1'); // Hardcoded user_id as 1
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched bookings:', data); // Debugging: Log fetched data

        // Extract bookings from the nested array structure
        const extractedBookings = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];

        // Sort bookings by reservation_date in descending order and take the last 5
        const sortedBookings = extractedBookings
          .sort((a, b) => new Date(b.reservation_date) - new Date(a.reservation_date))
          .slice(0, 5);

        setBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <ul className={styles.bookingList}>
          {bookings.map((booking, index) => (
            <li key={index} className={styles.bookingItem}>
              <h3>
                {booking.seat_id !== null
                  ? `Workplace ${booking.seat_id}`
                  : `Parkplace ${booking.parkplace_id}`}
              </h3>
              <p>Date: {new Date(booking.reservation_date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;

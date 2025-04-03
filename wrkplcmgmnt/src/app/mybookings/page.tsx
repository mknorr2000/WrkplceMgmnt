// src/app/mybookings/page.tsx
import React from 'react';
import styles from './OverviewPage.module.css';

const MyBookingsPage = () => {
  const bookings = [
    { id: 1, title: 'Meeting Room A', date: '2023-10-01', time: '10:00 AM - 11:00 AM' },
    { id: 2, title: 'Conference Hall', date: '2023-10-02', time: '2:00 PM - 4:00 PM' },
    { id: 3, title: 'Workspace 12', date: '2023-10-03', time: '9:00 AM - 5:00 PM' },
  ];

  return (
    <div>
      <h1>My Bookings</h1>
      <p>Overview of bookings already made</p>
      <ul className={styles.bookingList}>
        {bookings.map((booking) => (
          <li key={booking.id} className={styles.bookingItem}>
            <h2>{booking.title}</h2>
            <p>Date: {booking.date}</p>
            <p>Time: {booking.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookingsPage;

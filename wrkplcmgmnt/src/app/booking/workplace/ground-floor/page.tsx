'use client';

import React from 'react';
import styles from './GroundFloorPage.module.css';

const GroundFloorPage = () => {
  const workplaces = [
    { id: 1, name: 'Workplace 1', status: 'available' },
    { id: 2, name: 'Workplace 2', status: 'booked' },
    { id: 3, name: 'Workplace 3', status: 'available' },
    { id: 4, name: 'Workplace 4', status: 'booked' },
  ];

  const handleBooking = (id: number) => {
    alert(`Workplace ${id} booked!`);
  };

  return (
    <div className={styles['ground-floor']}>
      <h1>Ground Floor Workplace Booking</h1>
      <div className={styles['workplace-grid']}>
        {workplaces.map((workplace) => (
          <div
            key={workplace.id}
            className={`${styles['workplace']} ${
              workplace.status === 'booked' ? styles['booked'] : styles['available']
            }`}
            onClick={() => workplace.status === 'available' && handleBooking(workplace.id)}
          >
            {workplace.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroundFloorPage;

'use client';

import React from 'react';
import Link from 'next/link';
import styles from './BookWorkplacePage.module.css'; // Import the CSS module

const WorkplaceBookingPage = () => {
  return (
    <div>
      <h1>Select a Floor</h1>
      <p>Choose a floor to view its workplaces:</p>

      <div className={styles['floor-selector']}>
        <Link href="/booking/workplace/ground-floor">
          <button>Ground Floor</button>
        </Link>
        <Link href="/booking/workplace/first-floor">
          <button>First Floor</button>
        </Link>
      </div>
    </div>
  );
};

export default WorkplaceBookingPage;

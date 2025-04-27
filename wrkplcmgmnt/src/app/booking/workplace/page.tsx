"use client";

import React from "react";
import Link from "next/link";
import styles from "./FloorSelectPage.module.css"; // Import the CSS module

const WorkplaceBookingPage = () => {
  return (
    <main className={styles["floors-container"]}>
      <h1>Select a Floor</h1>
      <p>Choose a floor to view its workplaces:</p>
      <div className={styles.symbols}>
        <img
          src="/images/FirstFloor.png"
          alt="Workplace"
          className={styles.symbol}
        />
        <img
          src="/images/GroundFloor.png"
          alt="Parkplace"
          className={styles.symbol}
        />
      </div>
      <div className={styles.splitContainer}>
        <a href="/booking/workplace/first-floor" className={styles.link}>
          <div className={styles.bookingSection}>
            <h2>FirstFloor</h2>
          </div>
        </a>
        <a href="/booking/workplace/ground-floor" className={styles.link}>
          <div className={styles.bookingSection}>
            <h2>GroundFloor</h2>
          </div>
        </a>
      </div>
    </main>
  );
};

export default WorkplaceBookingPage;

/* <div className={styles.floorsSection}>
          <Link href="/booking/workplace/ground-floor">
            <button>Ground Floor</button>
          </Link>
        </div>
        <div className={styles.floorsSection}>
          <Link href="/booking/workplace/first-floor">
            <button>First Floor</button>
          </Link>
        </div>
*/
